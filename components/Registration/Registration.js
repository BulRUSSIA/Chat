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
import {Button, Header, Left,Body,Title,Right} from "native-base";
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
            <Header        style={{backgroundColor: '#FFFFFF',}}
                     androidStatusBarColor="#A9A9A9"

            >
                <Left style={{flex: 1}}>
                    <Button transparent

                            onPress={this.get_login}>
                        <Icon style={{color:'black'}}
                              size={25}

                              name="arrowleft"/>
                    </Button>
                </Left>
                <Body>
                    <Title style={{color:'black'}}>
                        Регистрация

                    </Title>
                </Body>
                <Right/>
            </Header>


            <ImageBackground source={{uri: 'background_airwaychat'}} style={{width: '100%', height: '100%'}}>


            <View style={styles.logoContainer}>
                <Text style={{fontSize:14,textAlign:'center',marginBottom:10,color:'red'}}

                >Для регистрации необходимо заполнить все поля.{'\n'}
                Минимальная длина логина и ника - 3 cимвола{'\n'}
                Максимальная длина логина и ника - 16 cимволов{'\n'}

                </Text>


                <View style={styles.logoContainer}>
                    <Text style={{fontSize:18}}

                    >Логин:</Text>
                    <TextInput style={styles.input}

                               placeholderTextColor='#010101'
                               onChangeText={(username) => this.setState({username})}
                               value={this.state.username}
                               maxLength={16}
                    />
                    <Text style={{fontSize:18}}

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
                    <Text style={{fontSize:18}}

                    >Ник:</Text>
                    <TextInput style={styles.input}

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

                                ЗАРЕГИСТРИРОВАТЬСЯ</Text>

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

                              maxRows={4}
                              maxColumns={4}
                              data={this.state.sm}
                              extraData={this.state}


                              renderItem={(({item,index}) =>


                                      //       <TouchableOpacity onPress={() => this.check_nick(item.user)}>

                                      <View style={{   flex: 1,
                                          flexDirection: 'column',
                                          margin: 1,
                                          bottom: 0,
                                          top: 0,
                                          right: 0,
                                          left: 0}}>


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
        width: 270,
        backgroundColor: '#ffffff',
        color: '#000000',
        marginBottom: 6,
        paddingHorizontal: 10,

        borderColor: '#707070',
        borderWidth: 1,
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
        textAlign: 'center',
        color: '#000000',
        fontSize: 15,
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
