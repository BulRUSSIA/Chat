import {

    SafeAreaView,
    StyleSheet,ScrollView,
    Text, TextInput, TouchableOpacity,
    View,
    Alert, Animated, FlatList, ImageBackground, AsyncStorage
} from "react-native";
import React from "react";
import colors from "../const/colors";
import {address} from "../../config_connect";
import {Button, Header, Left, Body, Title, Right} from "native-base";
import Icon from "react-native-vector-icons/AntDesign";

export default class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            username: '',
            password: '',
            nick: '',
            validator: '',
            color: '-16777216',
            item_smiles: colors,
            sm: colors,
            clr: '#010101'


        };


    }


    Registration = async () => {

        try {


            let LoginLength = this.state.username.length;
            let PasswordLength = this.state.password.length;
            let Nick = this.state.nick.length;

            if (LoginLength < 3 || PasswordLength < 3 || Nick < 3) {

                Alert.alert('Airchat', 'Логин,Пароль и Ник,должен содержать более 3 символов')


            } else {
                let str = this.state.nick;
                let nick = str.replace(" ", "");
                return await fetch(address + `/registration/${this.state.username}/${this.state.password}/${nick}/${this.state.color}`)

                    .then((response) => response.json())
                    .then(async (responseJson) => {


                        console.log(responseJson['reg']);
                        this.setState({validator: responseJson['reg']});

                        if (this.state.validator === false) {

                            Alert.alert('Данный ник или логин уже существует!')
                        } else {

                            const {navigator} = this.props;
                            await AsyncStorage.setItem('log', this.state.username);
                            await AsyncStorage.setItem('pass', this.state.password);

                            navigator.reset('Login');
                            Alert.alert('Вы успешно зарегистрировались!');
                        }
                    })

                    .catch((e) => {
                        (Alert.alert('Предупреждение', 'Cлишком много регистраций,попробуйте позже'))
                    });

            }

        } catch (e) {

            (Alert.alert('Предупреждение', 'Cлишком много регистраций,попробуйте позже'))
        }
    };


    close_color = (color) => {

        this.setState({color: color});
        Alert.alert('Цвет успешно выбран!')


    };

    get_login = () => {

        const {navigator} = this.props;
        navigator.pop()

    };

    render() {


        return <View>
            <ImageBackground source={{uri: 'background_airwaychat'}} style={{width: '100%', height: '100%'}}>
            <Header style={{backgroundColor: '#FFFFFF',}}
                    androidStatusBarColor="#A9A9A9"

            >
                <Left style={{flex: 1}}>
                    <Button transparent

                            onPress={this.get_login}>
                        <Icon style={{color: 'black'}}
                              size={25}

                              name="arrowleft"/>
                    </Button>
                </Left>
                <Body>
                    <Title style={{color: 'black'}}>
                        Регистрация

                    </Title>
                </Body>
                <Right/>
            </Header>

<ScrollView>



                <View style={styles.logoContainer}>
                    <Text style={{fontSize: 14, textAlign: 'center', marginBottom: 10, color: 'red'}}

                    >Для регистрации необходимо заполнить все поля.{'\n'}
                        Минимальная длина логина и ника - 3 cимвола{'\n'}
                        Максимальная длина логина и ника - 16 cимволов{'\n'}

                    </Text>


                    <View style={styles.logoContainer}>
                        <Text style={{fontSize: 18}}

                        >Логин:</Text>
                        <TextInput style={styles.input}

                                   placeholderTextColor='#010101'
                                   onChangeText={(username) => this.setState({username})}
                                   value={this.state.username}
                                   maxLength={16}
                        />
                        <Text style={{fontSize: 18}}

                        >Пароль:</Text>
                        <TextInput style={styles.input}

                                   placeholderTextColor='#010101'
                                   returnKeyType='go'
                                   secureTextEntry
                                   autoCorrect={false}
                                   onChangeText={(password) => this.setState({password})}
                                   value={this.state.password}
                                   maxLength={16}

                        />
                        <Text style={{fontSize: 18}}

                        >Ник:</Text>
                        <TextInput style={styles.input}

                                   placeholderTextColor='#010101'
                                   returnKeyType='go'

                                   autoCorrect={false}
                                   onChangeText={(nick) => this.setState({nick})}
                                   value={this.state.nick}
                                   maxLength={16}

                        />

                    </View>
                        <Text style={{color: 'black', marginLeft: '6%',}}>Выберите цвет</Text>
                        <FlatList horizontal
                                  style={{
                                      marginRight: '6%', marginLeft: '6%'
                                  }}
                                  data={colors}
                                  renderItem={(({item}) =>
                                          <TouchableOpacity onPress={() => this.close_color(item)}>
                                              <View style={{
                                                  backgroundColor: "#" + ((item) >>> 0).toString(16).slice(-6),
                                                  width: 35,
                                                  height: 22,
                                                  margin: 5,
                                              }}>
                                              </View>
                                          </TouchableOpacity>
                                  )
                                  }
                                  numColumns={1}
                                  keyExtractor={(item, index) => index.toString()}
                        />
                    <View
                        style={{flex:0,backgroundColor: "#" + ((this.state.color) >>> 0).toString(16).slice(-6),width:50,height:50}}
                    />


                        <TouchableOpacity style={styles.buttonText1} onPress={this.Registration}>
                            <Text style={styles.buttonContainer}>
                                ЗАРЕГИСТРИРОВАТЬСЯ</Text>
                        </TouchableOpacity>



                </View>

</ScrollView>
            </ImageBackground>
        </View>

    }
}
const styles = StyleSheet.create({
    container: {



    },
    logoContainer: {
        alignItems: 'center',

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
        backgroundColor: '#ffffff',
        color: '#000000',
        marginBottom: 2,
        paddingHorizontal: 10,
        borderColor: '#707070',
        borderWidth: 1,
    },


    buttonContainer: {
        textAlign: 'center',
        color: '#000000',
        fontSize: 15,
        marginLeft: '4%',
        marginRight: '4%',
        borderWidth: 0.1,
        paddingHorizontal: 10,
        backgroundColor: '#ffffff',
        marginTop: 0.1,
        borderRadius: 0.5,
        borderColor: '#010101',
        paddingTop: 10,
        paddingBottom: 10,
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
        marginTop:20,
        paddingHorizontal: 10,

    },
    buttonText2: {
        textAlign: 'center',
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 0,
        paddingHorizontal: 10,
        bottom: 20,

    },
    buttonContainer1: {
        fontSize: 18,
        color: '#010101',
        borderRadius: 400 / 2,
    },
    labelText: {
        textAlign: 'center',
        color: '#010101',
        fontWeight: 'bold',
        fontSize: 20,


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
