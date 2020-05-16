import Modal from "react-native-modal";
import {Dimensions, Text, TextInput, TouchableNativeFeedback, View} from "react-native";
import React from "react";
const {height, width} = Dimensions.get('window');

export default class Modal_change_nickname extends React.Component {


    render() {


        return (


            <Modal
                useNativeDriver={true}
                animationIn='slideInUp'
                animationOut='slideOutDown'
                isVisible={this.props.isVisible_nic}
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
                    }}>Cмена ника</Text>
                    <View style={{flexDirection: 'row'}}>



                    </View>
                    <Text style={{color: '#3862c0', paddingTop: 20,}}>Введите ник</Text>
                    <TextInput

                        underlineColorAndroid="#3862c0"
                        onChangeText={(text) => this.props.change_nickname_new(text)}
                        keyboardType='default'
                        value={this.props.new_nic}
                        blurOnSubmit={false}
                        maxLength={16}

                    />

                    <View style={{flexDirection:'row',justifyContent:'center',margin:10,padding:10}}>
                        <TouchableNativeFeedback
                            background={TouchableNativeFeedback.Ripple('rgba(72,119,108,0.77)',true)}
                            onPress={() => this.props.change_visible_nickname()}>

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
                            onPress={() => this.props.fetch_and_validate_nickname()}>

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
