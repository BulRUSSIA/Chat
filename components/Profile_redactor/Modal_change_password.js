import Modal from "react-native-modal";
import {Dimensions, Text, TextInput, TouchableNativeFeedback, View} from "react-native";
import React from "react";
const {height, width} = Dimensions.get('window');

export default class Modal_change_password extends React.Component {


    render() {


        return (


            <Modal
                useNativeDriver={true}
                animationIn='slideInUp'
                animationOut='slideOutDown'
                isVisible={this.props.isVisible}
            >


                <View style={{
                    width: width / 1.1,
                    height: height / 1.4,
                    backgroundColor: '#ffffff',
                    paddingLeft: '5%',
                    paddingRight: '5%',
                    borderRadius: 6,
                    justifyContent:'center',
                    borderColor:'#ffffff',
                    borderWidth:3,

                }}>

                    <Text style={{
                        color: '#010101',
                        fontSize: 18,
                         textAlign:'center',
                        fontWeight: 'bold'
                    }}>Cмена пароля</Text>
                    <View style={{flexDirection: 'row'}}>



                    </View>
                    <Text style={{color: '#3862c0', paddingTop: 20,}}>Старый пароль</Text>
                    <TextInput

                        underlineColorAndroid="#3862c0"
                        onChangeText={(text) => this.props.change_password_old(text)}
                        keyboardType='default'
                        value={this.props.password_old}
                        secureTextEntry={true}
                        blurOnSubmit={false}



                        maxLength={16}

                    />
                    <Text style={{color: '#3862c0', paddingTop: 5,}}>Новый пароль</Text>
                    <TextInput

                        underlineColorAndroid="#3862c0"
                        onChangeText={(text) => this.props.change_password_new(text)}
                        value={this.props.password_new}
                        blurOnSubmit={false}
                        secureTextEntry={true}
                        maxLength={16}

                    />

                    <Text style={{color: '#3862c0', paddingTop: 5,}}>Повторите новый пароль</Text>
                    <TextInput

                        underlineColorAndroid="#3862c0"
                        onChangeText={(text) => this.props.repeat_password_new(text)}
                        value={this.props.password_repeat}
                        blurOnSubmit={false}
                        secureTextEntry={true}
                        maxLength={16}



                    />

                    <View style={{flexDirection:'row',justifyContent:'center',margin:10,padding:10}}>
                        <TouchableNativeFeedback
                            background={TouchableNativeFeedback.Ripple('rgba(72,119,108,0.77)',true)}
                            onPress={() => this.props.change_visible_password()}>

                            <Text style={{

                                marginTop: height / 30,
                                color: 'black',
                                backgroundColor:'#ffffff',
                                width: width / 4,
                                textAlign: 'center',
                                height: height / 25
                            }}

                            >ОТМЕНА</Text>
                        </TouchableNativeFeedback>

                        <TouchableNativeFeedback
                            background={TouchableNativeFeedback.Ripple('rgba(55,121,169,0.77)',true)}
                            onPress={() => this.props.fetch_and_validate_password()}>

                            <Text style={{

                                marginTop: height / 30,
                                color: 'black',
                                backgroundColor:'#ffffff',



                                width: width / 4,
                                textAlign: 'center',

                                marginLeft:5,
                                height: height / 25
                            }}
                            >ОК</Text>
                        </TouchableNativeFeedback>
                    </View>
                </View>


            </Modal>

        );
    }
}
