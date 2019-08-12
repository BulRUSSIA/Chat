import {
    AsyncStorage,
    Image,

    StyleSheet,
    Text, TextInput, TouchableOpacity,
    View,
    Alert, ImageBackground
    , ActivityIndicator,
} from "react-native";
import React from "react";
import request_READ_PHONE_STATE from '../actions/request_phone_state'
import Rooms_list from './const/Room_List'
import Rooms_banned from './const/Room_list_banned'
import request_IMEI from '../actions/request_IMEI'
import request_login from '../actions/fetch_login'
import request_banned from '../actions/fetch_banned'
import request_GET_ROOMS from '../actions/fetch_get_rooms'
import request_all_users from "../actions/fetch_all_users";

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            username: this.props.passwd,
            password: this.props.name,
            nick: '',
            validator: '',
            ban: '',
            Imei: '',
            rooms_Unbanned: Rooms_list,
            rooms_Banned: Rooms_banned,
            isLoading:false,


        };

        this._retrieveData()

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
                    password: passwd,
                    isLoading:false,
                })
            }

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


            const login = await request_login(this.state.username, this.state.password, this.state.Imei);



            this.setState({validator: login['auth'],isLoading:true});

            if (this.state.validator === 'NO OK') {

                Alert.alert('Данные введены неверно!');
                this.setState({isLoading:false});



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
                    const count_all_users = await request_all_users();
                    const rooms = await request_GET_ROOMS('-1');
                    const all = count_all_users['all'];
                    console.log(all);

                    router.push.Rooms({name: nic, router, roomlist: rooms,count:all}); //this.state.rooms_Unbanned

                }


            }


        } else {


            Alert.alert('Airchat', 'Логин или Пароль,должен содержать более 3 символов')
        }
    };


    reg =() => {
const {router} = this.props;
       router.push.Registration({router});





    };




    render() {






        return <View style={styles.container}>



            <ImageBackground source={require('./Image/reg_background.jpg')} style={{width: '100%', height: '100%'}}>
            <View style={styles.logoContainer}>


                <View style={styles.logoContainer}>



                    <Image
                        style={{width: 200, height: 200,borderRadius:400/2,bottom:8,borderWidth: 1}}
                        source={require('./Image/logo.jpg')}
                    />
                    <ActivityIndicator size="large" color="#6aaabb"
                                       animating={this.state.isLoading}/>
                    <Text style={styles.labelText}>AirChat</Text>



                </View>

                <View style={styles.logoContainer1}>

                    <View style={styles.inputView}>

                    <TextInput style={styles.input}
                               placeholder="Логин"
                               placeholderTextColor='rgba(255,255,255,0.8)'
                               onChangeText={(username) => this.setState({username})}
                               value={this.state.username}
                               maxLength={16}
                    />

                        <View>


                        </View>

                    </View>

                    <View style={styles.inputView}>
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
                    </View>


                    <TouchableOpacity onPress={this.login}>

                        <Text

                            style={styles.buttonTextlogin}>Войти</Text>


                    </TouchableOpacity>
                    <View>
                        <TouchableOpacity onPress={this.reg} style={styles.buttonText1}>
                            <Text style={styles.buttonText}>

                                Регистрация</Text>

                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            </ImageBackground>
        </View>

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
        flex: 1,
        elevation: 2

    },
    logoContainer1: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        color:'#5375bf',
        borderRadius: 14,
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
        width: 270,
        backgroundColor: '#6aaabb',
        color: '#3b3771',
        marginBottom: 10,
        paddingHorizontal: 10,


        borderRadius: 400/2,
    },
    inputView: {

        bottom:30,
        borderRadius:20,


    },
    buttonContainer: {
        backgroundColor: '#15a4f7',
        paddingVertical: 0,

        paddingHorizontal: 10
    },
    buttonText: {
        textAlign: 'center',
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 20,
        paddingHorizontal: 10,
        backgroundColor:'#3e9496',
        paddingLeft:30,
        paddingRight:30,
        paddingTop:10,
        paddingBottom:10,
        borderRadius:14,
    },
    buttonTextlogin: {
        textAlign: 'center',
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 0,
        paddingHorizontal: 10,
        backgroundColor:'#548695',
        paddingLeft:60,
        paddingRight:60,
        paddingTop:10,
        paddingBottom:10,
        borderRadius:14,
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
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 20,

     //   backgroundColor:'#67a8be',
        paddingLeft:71,
        paddingRight:71,
        paddingBottom:15,

    },


    container1: {

        backgroundColor: '#80b4bb',

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
