import {

    SafeAreaView,
    StyleSheet,
    Text, TextInput, TouchableOpacity,
    View,
    Alert, Animated, FlatList, ImageBackground, AsyncStorage
} from "react-native";
import React from "react";
import colors from "../const/colors";
import menusmiles from '../const/colors_id'
import {address} from "../../config_connect";
import {Button, Header, Left} from "native-base";
import Icon from "react-native-vector-icons/AntDesign";

export default class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            username: '',
            password: '',
            nick: '',
            validator: '',
            color:'-16777216',
            item_smiles: colors,
            sm:menusmiles,
            clr:'#010101'


        };

        this.animatedVal = new Animated.Value(-350);
    }


    Registration = async () => {

       try {


           let LoginLength = this.state.username.length;
           let PasswordLength = this.state.password.length;
           let Nick = this.state.nick.length;

           if (LoginLength < 3 || PasswordLength < 3 || Nick < 3) {

               Alert.alert('Airchat', 'Логин,Пароль и Ник,должен содержать более 3 символов')


           } else {
               let str = this.state.nick.trim();
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

       }
       catch(e)
        {

            (Alert.alert('Предупреждение', 'Cлишком много регистраций,попробуйте позже'))
        }
    };


    Change_color = () => {

        Animated.timing(                  // Animate over time
            this.animatedVal,            // The animated value to drive
            {
                toValue: 50,                   // Animate to opacity: 1 (opaque)
                duration: 350,

            }
        ).start();

    };

    close_color = (evt,clr) => {



        Animated.timing(                  // Animate over t ime
            this.animatedVal,            // The animated value to drive
            {
                toValue: -350,                   // Animate to opacity: 1 (opaque)
                duration: 350,

            }
        ).start();

        this.setState({color:evt,clr:clr});
        Alert.alert('Цвет успешно выбран!')


    };

    get_login = ()=> {

      const {navigator} = this.props;
      navigator.pop()

    };


    render() {


        return <SafeAreaView style={styles.container}>
            <Header style={{backgroundColor: '#3c3e5a',}}
                    androidStatusBarColor="#3c3e5a"

            >
                <Left style={{flex: 1}}>
                    <Button transparent

                            onPress={this.get_login}>
                        <Icon style={{color:'white'}}
                              size={25}

                              name="arrowleft"/>
                    </Button>
                </Left>
            </Header>


            <ImageBackground source={{uri: 'default_background'}} style={{width: '100%', height: '100%'}}>


            <View style={styles.logoContainer}>
                <Text style={styles.labelText}>Регистрация</Text>


                <View style={styles.logoContainer}>
                    <TextInput style={styles.input}
                               placeholder="Логин"
                               placeholderTextColor='#010101'
                               onChangeText={(username) => this.setState({username})}
                               value={this.state.username}
                               maxLength={16}
                    />
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

                    <TextInput style={styles.input}
                               placeholder="Ник"
                               placeholderTextColor='#010101'
                               returnKeyType='go'

                               autoCorrect={false}
                               onChangeText={(nick) => this.setState({nick})}
                               value={this.state.nick}
                               maxLength={16}

                    />
                    <TouchableOpacity style={{backgroundColor:this.state.clr,

                        height: 40,
                        width: 40,


                        marginBottom: 20,
                        paddingHorizontal: 10,
                        borderRadius :14,

                    }}

                     onPress={this.Change_color}


                    />

                        <Text style={styles.buttonContainer1}>

                            Цвет ника</Text>


                    <View>
                        <TouchableOpacity style={styles.buttonText1} onPress={this.Registration} >
                            <Text style={styles.buttonContainer}>

                                Зарегистрироваться</Text>

                        </TouchableOpacity>


                    </View>
                </View>


                <Animated.View style={{
                    transform: [{translateY: this.animatedVal}],
                    height: 220,
                    width: 100,
                    backgroundColor: '#e8f6ff',
                    position: 'absolute',
                    left: 140,
                    top: 0,
                    bottom: 30,
                    right: 0,
                    justifyContent: 'center'
                }}>


                    <FlatList inverted


                              data={this.state.sm}
                              extraData={this.state}


                              renderItem={(({item,index}) =>


                                      //       <TouchableOpacity onPress={() => this.check_nick(item.user)}>

                                      <View style={{flex: 1, flexDirection: 'column', margin: 1}}>


                                          <TouchableOpacity onPress={(event)=>this.close_color(item.clr,item.rclr)}>

                                                  <Text style={[styles.prices1 ,{backgroundColor:colors[index % colors.length]}]}
                                                        onChangeText={(color) => this.setState({color})}
                                                        value={item.clr}

                                                  >



                                                  </Text>


                                          </TouchableOpacity>

                                      </View>
                                  //
                              )
                              }

                              numColumns={1}
                              keyExtractor={(item, index) => index.toString()}


                    />


                </Animated.View>
            </View>
            </ImageBackground>

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
        backgroundColor: 'rgba(17,149,233,0.2)',
        color: '#1195e9',
        marginBottom: 20,
        paddingHorizontal: 10,
        borderRadius :12,
        borderWidth: 2,
        borderColor: '#010101'
    },

    color: {
        height: 40,
        width: 70,
        backgroundColor: '#010101',
        color: '#FFF',
        marginBottom: 20,
        paddingHorizontal: 10,
        borderRadius:20,

    },
    buttonContainer: {
        backgroundColor: '#177d7e',
        paddingVertical: 8,
        height: 40,
        width: 200,
        color: '#FFF',
        textAlign: 'center',
        fontSize: 18,
        paddingHorizontal: 10,
        borderRadius:14
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
        top: 60,
    },
    buttonText2: {
        textAlign: 'center',
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 0,
        paddingHorizontal: 10,
        bottom:20,

    },
    buttonContainer1: {
        fontSize: 18,
        color: '#010101',
        borderRadius:400/2,
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
