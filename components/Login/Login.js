import {
    AsyncStorage,
    CheckBox,
    StyleSheet,
    Text, TextInput, TouchableOpacity,
    View,
    Alert, ImageBackground
    , ActivityIndicator,Dimensions
} from "react-native";
import React from "react";
import request_READ_PHONE_STATE from '../../actions/request_phone_state'
import Rooms_list from '../const/Room_List'
import Rooms_banned from '../const/Room_list_banned'
import request_login from '../../actions/fetch_login'
import request_IMEI from "../../actions/request_IMEI";
const {width, height} = Dimensions.get('window');
const DEFAULT_SIZE_MESSAGE = 14;
const DEFAULT_AVATAR_SIZE = 30;
const DEFAULT_ROOMS_SIZE = 18;
export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            username: this.props.passwd,
            password: this.props.name,
            nick: '',
            validator: '',
            ban: '',
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

        } catch (e) {
            console.log(e)
        }

        try {
            await this.setting_getter()
        } catch (e) {
            console.log(e)
        }
    };

    setting_getter = async () => {
        const backgr = await AsyncStorage.getItem('background_fon');
        const size_msg = await AsyncStorage.getItem('size_message');
        const size_av = await AsyncStorage.getItem('size_avatar');
        const size_rooms = await AsyncStorage.getItem('size_rooms');
        if (backgr == null && size_msg == null && size_av == null && size_rooms == null) {
            await this.setting_setter()
        }
    };

    setting_setter = async () => {
        await AsyncStorage.setItem('background_fon', 'default_background');
        await AsyncStorage.setItem('size_message', DEFAULT_SIZE_MESSAGE.toString());
        await AsyncStorage.setItem('size_avatar', DEFAULT_AVATAR_SIZE.toString());
        await AsyncStorage.setItem('size_rooms', DEFAULT_ROOMS_SIZE.toString());
    };
    login = async () => {
        let LoginLength = this.state.username.length;
        let PasswordLength = this.state.password.length;
        if (LoginLength >= 3 || PasswordLength >= 3) {
            request_READ_PHONE_STATE();
            const imei = await request_IMEI();
            if (!imei) {
                return Alert.alert('Необходимо разрешить доступ к телефону')

            }
            await this._storeData();
            this.setState({isLoading: !this.state.isLoading});
            const login = await request_login(this.state.username.trim(),this.state.password.trim(), imei);
            console.log('login',login);
            this.setState({isLoading: !this.state.isLoading, validator: login['auth']});

            if (this.state.validator === false) {
                Alert.alert('Ошибка', 'Данные   введены неверно');
            } else {
                const {navigator} = this.props;
                let nic = login['nic'];
                try {
                    navigator.reset('Rooms', {name: nic, category_update: '-1'}, {animation: 'right'});
                } catch {
                    navigator.reset('Rooms', {name: nic, category_update: '-1'}, {animation: 'right'});
               }
            }

        }
        else {
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
                    style={{
                        backgroundColor: 'rgb(255,255,255)', position: 'absolute',
                        width: '100%',
                        height: 60,
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom: 0,
                    }}>
                    <Text style={{
                        fontSize: 18,
                        textAlign: 'center',
                        color:'red'
                    }}>Выполняется вход в чат...</Text>
                    <ActivityIndicator
                        size="large" color="#FFFFFF"
                        animating={this.state.isLoading}
                    />
                </View>
            )
        }
    };
    render() {
        const {navigator} = this.props;
        return   <View style={styles.container}>
            <ImageBackground source={{uri: 'background_airwaychat'}} style={{width: '100%', height: '100%'}}>
                <View style={{marginBottom: '20%'}}>
                    <Text style={{fontSize: 40, textAlign: 'center'}}>Airwaychat</Text>
                </View>
                <View style={styles.inputView}>
                    <Text style={{fontSize:18}}
                       >Логин:</Text>
                    <TextInput style={styles.input}
                               placeholder="Логин"
                               placeholderTextColor='#010101'
                               onChangeText={(username) => this.setState({username})}
                               value={this.state.username}
                               maxLength={16}
                    />
                    <View>
                    </View>
                </View>
                <View style={styles.inputView}>
                    <Text style={{fontSize:18}}
                    >Пароль:</Text>
                    <TextInput style={styles.input}
                               placeholder="Пароль"
                               placeholderTextColor='#010101'
                               returnKeyType='go'
                               secureTextEntry
                               autoCorrect={false}
                               onChangeText={(password) => this.setState({password})}
                               value={this.state.password}
                               maxLength={16}
                    />
                </View>

                {this.Login_indicator()}

                <View style={{flexDirection: 'row',marginLeft:'12%'}}>
                    <CheckBox style={{backgroundColor:'black'}}
                              value={false}
                              disabled={false}
                    />
                    <Text style={{marginTop: 5,marginLeft:'1%'}}>Запомнить пароль</Text>
                </View>
                <TouchableOpacity style={{marginTop: height/5.5,}} onPress={this.login}>
                            <Text
                            style={styles.buttonTextlogin}
                            >
                                Войти
                            </Text>
                </TouchableOpacity>
                <View>
                    <TouchableOpacity onPress={() => navigator.push('Settings', {animation: 'right'})}
                    >
                        <Text style={styles.buttonTextlogin}>
                            Настройки</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.reg}>
                        <Text style={styles.buttonTextlogin}>
                            Регистрация</Text>
                    </TouchableOpacity>
                    <Text style={{fontSize:18,color:'#3862c0',textAlign:'center',paddingTop:10}}
                    >YALDAC(c)</Text>
                </View>
            </ImageBackground>
        </View>
    }
}
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        flex:1
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
    },
    input: {
        height: 40,
        width: 270,
        backgroundColor: '#ffffff',
        color: '#000000',
        marginBottom: 6,
        paddingHorizontal: 10,
        borderColor: '#707070',
        borderWidth: 1,
    },
    inputView: {
        alignSelf: 'center',
    },
    buttonContainer: {
        backgroundColor: '#15a4f7',
        paddingVertical: 0,
    },
    buttonText: {
        textAlign: 'center',
        color: '#000000',
        borderRadius:0.5,
        borderColor:'#010101',
        fontSize: 18,
        marginBottom: 20,
        paddingHorizontal: 10,
        backgroundColor: 'rgba(76,189,255,0)',
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop: 10,
        paddingBottom: 10,
    },
    buttonTextlogin: {
        textAlign: 'center',
        color: '#000000',
        fontSize: 18,
        marginLeft: '4%',
        marginRight: '4%',
        borderWidth:0.1,
        paddingHorizontal: 10,
        backgroundColor: '#ffffff',
        marginTop:0.1,
        borderRadius:0.5,
        borderColor:'#010101',
        paddingTop: 10,
        paddingBottom: 10,
    },

    buttonText1: {
        textAlign: 'center',
        color: '#000000',
        fontSize: 18,
        marginLeft: '4%',
        marginRight: '4%',
        borderWidth:0.1,
        paddingHorizontal: 10,
        backgroundColor: '#ffffff',
        marginTop:0.1,
        borderRadius:0.5,
        borderColor:'#010101',
        paddingTop: 10,
        paddingBottom: 10,
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
