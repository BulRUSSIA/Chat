import Modal from "react-native-modal";
import {Dimensions, Text, TextInput, View} from "react-native";
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
                    backgroundColor: '#a9a9a9',
                    paddingLeft: '5%',
                    paddingRight: '5%',
                    borderRadius: 6,
                    justifyContent:'center',
                    borderColor:'#000000',
                    borderWidth:3,
                    paddingTop: '5%',
                }}>

                    <Text style={{
                        color: '#010101',
                        fontSize: 18,
                        marginBottom: 10,
                        fontWeight: 'bold'
                    }}>Бегущая строка</Text>

                    <Text style={{color: '#3862c0', paddingTop: 20,}}>Введите текст</Text>
                    <TextInput

                        underlineColorAndroid="#3862c0"
                        onChangeText={(text) => this.props.add_run_line_text(text)}
                        keyboardType='default'
                        blurOnSubmit={false}


                        maxLength={200}

                    />

                    <View style={{flexDirection:'row',justifyContent:'center',margin:10,padding:10}}>
                        <Button transparent
                                onPress={()=>this.props.select_modal_run_line()}
                        >
                            <Text style={{

                                marginTop: height / 30,
                                color: 'black',
                                backgroundColor:'#ffffff',
                                borderRadius: 3,
                                borderColor: '#868686',
                                borderWidth: 1,
                                width: width / 4,
                                textAlign: 'center',
                                height: height / 25
                            }}

                            >Отмена</Text>
                        </Button>
                        <Button transparent
                                onPress={()=>this.props.start_line()}
                        >
                            <Text style={{

                                marginTop: height / 30,
                                color: 'black',
                                backgroundColor:'#ffffff',
                                borderRadius: 3,
                                borderColor: '#868686',
                                borderWidth: 1,
                                width: width / 4,
                                textAlign: 'center',
                                height: height / 25
                            }}

                            >Поехали</Text>
                        </Button>
                    </View>
                </View>


            </Modal>

        );
    }
}
