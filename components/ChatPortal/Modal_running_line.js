import Modal from "react-native-modal";
import {Dimensions, Text, TextInput, TouchableNativeFeedback, View} from "react-native";
import React from "react";
import {

    Button,


} from 'native-base';
const {height, width} = Dimensions.get('window');


export default class Modal_running_line extends React.Component {


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
                    height: height / 1.7,
                    backgroundColor: '#ffffff',
                    paddingLeft: '5%',
                    paddingRight: '5%',
                    borderRadius: 6,
                    justifyContent:'center',
                    borderColor:'#ffffff',
                    borderWidth:3,
                    paddingTop: '2%',
                }}>

                    <Text style={{
                        color: '#010101',
                        fontSize: 18,
                        marginBottom: 10,
                        fontWeight: 'bold'
                    }}>Бегущая строка</Text>

                    <Text style={{color: '#c00c17', paddingTop: 20,}}>Cтоимость услуги составляет 50р</Text>
                    <Text style={{color: '#3862c0', paddingTop: 20,}}>Введите текст</Text>
                    <TextInput

                        underlineColorAndroid="#3862c0"
                        onChangeText={(text) => this.props.add_run_line_text(text)}
                        keyboardType='default'
                        blurOnSubmit={false}


                        maxLength={200}

                    />

                    <View style={{flexDirection:'row',justifyContent:'center',margin:10,padding:10}}>
                        <TouchableNativeFeedback
                            background={TouchableNativeFeedback.Ripple('rgba(72,119,108,0.77)',false)}
                            onPress={() => this.props.select_modal_run_line()}>

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
                            background={TouchableNativeFeedback.Ripple('rgba(72,119,108,0.77)',true)}
                            onPress={() => this.props.start_line()}>

                            <Text style={{

                                marginTop: height / 30,
                                color: 'black',
                                backgroundColor:'#ffffff',
                                width: width / 4,
                                textAlign: 'center',
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