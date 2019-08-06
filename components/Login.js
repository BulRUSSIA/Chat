import {
    AsyncStorage,
    Image,
    SafeAreaView,
    StyleSheet,
    Text, TextInput, TouchableOpacity,
    View,
    Alert
} from "react-native";
import React from "react";
import request_READ_PHONE_STATE from '../actions/request_phone_state'
import Rooms_list from '../Room_List'
import Rooms_banned from '../Room_list_banned'
import request_IMEI from '../actions/request_IMEI'
import request_login from '../actions/fetch_login'
import request_banned from '../actions/fetch_banned'

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            username: '',
            password: '',
            nick: '',
            validator: '',
            ban: '',
            Imei: '',
            rooms_Unbanned: Rooms_list,
            rooms_Banned: Rooms_banned,


        };

        this._retrieveData();

    }

    _storeData = async () => {
        try {
            await AsyncStorage.setItem('log', this.state.username);
            await AsyncStorage.setItem('pass', this.state.password);
        } catch (error) {
            // Error saving data
        }
    };

    _retrieveData = async () => {
        try {

            const imei = await request_IMEI();
            this.setState({Imei: imei});


            const value = await AsyncStorage.getItem('log');
            const passwd = await AsyncStorage.getItem('pass');
            if (value !== null) {
                // We have data!!
                this.setState({
                    username: value,
                    password: passwd
                })
            }
            ;
        } catch (error) {
            // Error retrieving data
        }
    };

    login = async () => {


        // const uniqueId = DeviceInfo.getSerialNumber();
        // console.log(uniqueId);
        let LoginLength = this.state.username.length;
        let PasswordLength = this.state.password.length;

        if (LoginLength > 3 || PasswordLength > 3) {


            this._storeData();
            request_READ_PHONE_STATE();
            const {router} = this.props;
            router.push.Login();
            const login = await request_login(this.state.username, this.state.password, this.state.Imei);
            console.log(login['nic']['$oid']);


            this.setState({validator: login['auth']});

            if (this.state.validator === 'NO OK') {

                Alert.alert('Данные введены неверно!')


            } else {


                let nicks = login['nic'];
                let nic = (nicks['$oid']);
                let banned = await request_banned(nic);


                this.setState({ban: banned['user']});

                if (this.state.ban === 'banned') {


                    const {router} = this.props;
                    router.push.Rooms({name: nic, router, roomlist: this.state.rooms_Banned});


                } else {


                    const {router} = this.props;


                    router.push.Rooms({name: nic, router, roomlist: this.state.rooms_Unbanned});

                }


            }


        } else {


            Alert.alert('Airchat', 'Логин или Пароль,должен содержать более 3 символов')
        }
    };


    render() {

        const {router} = this.props;


        return <SafeAreaView style={styles.container}>


            <View style={styles.logoContainer}>
                <Text style={styles.labelText}>ДОБРО ПОЖАЛОВАТЬ!</Text>


                <View style={styles.logoContainer}>


                    <Image
                        style={{width: 200, height: 200}}
                        source={require('./logo.png')}
                    />
                </View>

                <View style={styles.logoContainer}>
                    <TextInput style={styles.input}
                               placeholder="Логин"
                               placeholderTextColor='rgba(255,255,255,0.8)'
                               onChangeText={(username) => this.setState({username})}
                               value={this.state.username}
                               maxLength={16}
                    />
                    <TextInput style={styles.input}
                               placeholder="Пароль"
                               placeholderTextColor='rgba(255,255,255,0.8)'
                               returnKeyType='go'
                               secureTextEntry
                               autoCorrect={false}
                               onChangeText={(password) => this.setState({password})}
                               value={this.state.password}
                               maxLength={16}

                    />
                    <TouchableOpacity onPress={this.login}>

                        <Text

                            style={styles.buttonText}>Войти</Text>


                    </TouchableOpacity>
                    <View>
                        <TouchableOpacity onPress={() => router.push.Registration({router})} style={styles.buttonText1}>
                            <Text style={styles.buttonContainer1}>

                                Регистрация</Text>

                        </TouchableOpacity>
                    </View>
                </View>
            </View>

        </SafeAreaView>

    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(32, 53, 70)',

    },
    logoContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    logo: {
        width: 200,
        height: 200,
        top: 30
    },
    title: {
        color: '#15a4f7',
        fontSize: 18,
        textAlign: 'center',
        marginTop: 5,
        opacity: 0.9
    },
    infoContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: 200,
        padding: 20,
        // backgroundColor: 'red'
    },
    input: {
        height: 40,
        width: 200,
        backgroundColor: 'rgba(255,255,255,0.2)',
        color: '#FFF',
        marginBottom: 20,
        paddingHorizontal: 10
    },
    buttonContainer: {
        backgroundColor: '#15a4f7',
        paddingVertical: 0,

        paddingHorizontal: 10
    },
    buttonText: {
        textAlign: 'center',
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 0,
        paddingHorizontal: 10
    },

    buttonText1: {
        textAlign: 'center',
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 0,
        paddingHorizontal: 10,
        top: 30,
    },
    buttonContainer1: {
        fontSize: 18,
        color: '#FFF',
    },
    labelText: {
        textAlign: 'center',
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 20,
        top: 10
    },


    container1: {

        backgroundColor: '#b4f5ff',

    },
    touchableButton: {
        color: '#fff',
        fontSize: 20
    },
    newInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        fontSize: 16,
        padding: 10,
        height: 50,
    },


});
