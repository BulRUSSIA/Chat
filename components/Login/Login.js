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
import request_READ_PHONE_STATE from '../../actions/request_phone_state'
import Rooms_list from '../const/Room_List'
import Rooms_banned from '../const/Room_list_banned'
import request_login from '../../actions/fetch_login'
import request_banned from '../../actions/fetch_banned'
import request_GET_ROOMS from '../../actions/fetch_get_rooms'
import request_all_users from "../../actions/fetch_all_users";
import request_LAST_ROOM from "../../actions/fetch_last_room";
import request_MY_NICKNAME from "../../actions/fetch_my_nickname";
import request_ENTRY_USER_ROOM from "../../actions/fetch_entry_user";
const DEFAULT_SIZE_MESSAGE = 14;
const DEFAULT_AVATAR_SIZE = 35;

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            username: this.props.passwd,
            password: this.props.name,
            nick: '',
            validator: '',
            ban: '',
            Imei: '11111111111',
            rooms_Unbanned: Rooms_list,
            rooms_Banned: Rooms_banned,
            isLoading: false,
            recieve: ''


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

            // const imei = await request_IMEI();
            //  this.setState({Imei: '11111111111111111'});


            const value = await AsyncStorage.getItem('log');
            const passwd = await AsyncStorage.getItem('pass');

            if (value !== null) {
                // We have data!!
                this.setState({
                    username: value,
                    password: passwd,
                    isLoading: false,
                })
            }

        } catch (error) {
            // Error retrieving data
        }



        try {

            // const imei = await request_IMEI();
            //  this.setState({Imei: '111111111111111111'});


            const backgr = await AsyncStorage.getItem('background_fon');
            const size_msg = await AsyncStorage.getItem('size_message');
             const size_av =  await AsyncStorage.getItem('size_avatar');
            if (backgr&&size_av&&size_msg == null) {
                await AsyncStorage.setItem('background_fon', 'default_background');
                await AsyncStorage.setItem('size_message', DEFAULT_SIZE_MESSAGE.toString());
                await AsyncStorage.setItem('size_avatar', DEFAULT_AVATAR_SIZE.toString());
                console.log(error,'set key async succsessful')
            }

        } catch (error) {
           console.log(error,'errror get key async')
        }
    };




    login = async () => {


        // const uniqueId = DeviceInfo.getSerialNumber()1;
        // console.log(uniqueId);
        let LoginLength = this.state.username.length;
        let PasswordLength = this.state.password.length;

        if (LoginLength > 3 || PasswordLength > 3) {


            this._storeData();
            request_READ_PHONE_STATE();

            this.setState({isLoading: true});

            const login = await request_login(this.state.username.trim(), this.state.password.trim(), this.state.Imei);


            this.setState({isLoading: !this.state.isLoading});
            this.setState({validator: login['auth'], isLoading: true});

            if (this.state.validator === 'NO OK') {

                Alert.alert('Данные введены неверно!');


            } else {


                let nicks = login['nic'];
                let nic = (nicks['$oid']);
                let banned = await request_banned(nic);


                this.setState({ban: banned['user']});

                if (this.state.ban === 'banned') {


                    const {navigator} = this.props;
                    navigator.push('Rooms',{name: nic, roomlist: this.state.rooms_Banned});


                } else {


                    const {navigator} = this.props;


                    const last_rooms = await request_LAST_ROOM(nic);


                    const Nick_chats = await request_MY_NICKNAME(nic);

                     navigator.reset('Rooms',{name: nic,category_update:'-1'}, {animation: 'right'});
                    try {
                        navigator.push('Chatting',{

                            nic: nic,
                            room: last_rooms['last_room'],
                            chat_name: Nick_chats[0],
                            type_user: Nick_chats[1],


                        });

                        await request_ENTRY_USER_ROOM(last_rooms['last_room'], nic);

                    } catch  {

                        console.log('catch')
                    }
                }
            }


        } else {


            Alert.alert('Airchat', 'Логин или Пароль,должен содержать более 3 символов')
        }
    };


    reg = () => {
        const {navigator} = this.props;
        navigator.push('Registration', {animation: 'fade'})


    };


    Login_indicator = () => {

        if (this.state.isLoading) {

            return (


                <View
                    style={{backgroundColor: '#97e8f5', width: 200, height: 100, borderRadius: 14, paddingLeft: '2%'}}>
                    <Text style={{
                        fontSize: 18,
                        fontWeight: 'bold',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>Подождите..............{'\n'}Выполняется вход в Airchat =)</Text>
                    <ActivityIndicator size="large" color="#6aaabb"
                                       animating={this.state.isLoading}/>
                </View>

            )
        }
    };


    render() {
        const {navigator} = this.props;



        return <View style={styles.container}>


            <ImageBackground source={require('../Image/reg_background.jpg')} style={{width: '100%', height: '100%'}}>
                <View style={styles.logoContainer}>


                    <View style={styles.logoContainer}>


                        <Image
                            style={{width: 200, height: 200, borderRadius: 400 / 2, bottom: 8, borderWidth: 1}}
                            source={require('../Image/logo.jpg')}
                        />
                        {this.Login_indicator()}
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

                            <TouchableOpacity onPress={()=> navigator.push('Settings', {animation: 'right'})}
                                style={styles.buttonText1}>
                                <Text style={styles.buttonText}>

                                    Настройки</Text>

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
        color: '#5375bf',
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


        borderRadius: 400 / 2,
    },
    inputView: {

        bottom: 30,
        borderRadius: 20,


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
        backgroundColor: '#3e9496',
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 14,
    },
    buttonTextlogin: {
        textAlign: 'center',
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 0,
        paddingHorizontal: 10,
        backgroundColor: '#548695',
        paddingLeft: 60,
        paddingRight: 60,
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 14,
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
        paddingLeft: 71,
        paddingRight: 71,
        paddingBottom: 15,

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
