import {

    SafeAreaView,
    StyleSheet,
    Text, TextInput, TouchableOpacity,
    View,
    Alert, Animated, FlatList, TouchableWithoutFeedback, ImageBackground
} from "react-native";
import React from "react";
import colors from "./colors";
import menusmiles from './testcolor'

export default class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            username: '',
            password: '',
            nick: '',
            validator: '',
            color:'',
            item_smiles: colors,
            sm:menusmiles,


        };

        this.animatedVal = new Animated.Value(-350);
    }


    Registration = () => {

        let LoginLength = this.state.username.length;
        let PasswordLength = this.state.password.length;
        let Nick = this.state.nick.length;

        if (LoginLength < 3 || PasswordLength < 3 || Nick < 3) {

            Alert.alert('Airchat', 'Логин,Пароль и Ник,должен содержать более 3 символов')



        } else {

            return fetch(`http://185.231.154.198:5000/registration/${this.state.username}/${this.state.password}/${this.state.nick}/${this.state.color}`)
                .then((response) => response.json())
                .then((responseJson) => {


                    console.log(responseJson['reg']);
                    this.setState({validator: responseJson['reg']});

                    if (this.state.validator === 'No') {

                        alert('Данный ник уже существует!')
                    } else {

                        const {router} = this.props;
                        router.push.Login({name: this.state.username, passwd:this.state.password, router});
                        Alert.alert('Вы успешно зарегистрировались!');
                    }
                })
                .catch((error) => {
                    console.error(error);
                });

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

    close_color = (evt) => {

        Animated.timing(                  // Animate over time
            this.animatedVal,            // The animated value to drive
            {
                toValue: -350,                   // Animate to opacity: 1 (opaque)
                duration: 350,

            }
        ).start();

        this.setState({color:evt})
        Alert.alert('Цвет успешно выбран!')

    };


    render() {


        return <SafeAreaView style={styles.container}>


            <View style={styles.logoContainer}>
                <Text style={styles.labelText}>РЕГИСТРАЦИЯ АККАУНТА</Text>


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

                    <TextInput style={styles.input}
                               placeholder="Ник"
                               placeholderTextColor='rgba(255,255,255,0.8)'
                               returnKeyType='go'

                               autoCorrect={false}
                               onChangeText={(nick) => this.setState({nick})}
                               value={this.state.nick}
                               maxLength={16}

                    />
                    <TouchableOpacity style={styles.color} onPress={this.Change_color}


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


                                          <TouchableOpacity onPress={(event)=>this.close_color(item.clr)}>

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

    color: {
        height: 40,
        width: 50,
        backgroundColor: 'rgba(255,255,255,0.2)',
        color: '#FFF',
        marginBottom: 20,
        paddingHorizontal: 10
    },
    buttonContainer: {
        backgroundColor: '#00BCD4',
        paddingVertical: 8,
        height: 40,
        width: 200,
        color: '#FFF',
        textAlign: 'center',
        fontSize: 18,
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
        color: '#FFF',
    },
    labelText: {
        textAlign: 'center',
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 20,
        top: 50,
        bottom:15,
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
