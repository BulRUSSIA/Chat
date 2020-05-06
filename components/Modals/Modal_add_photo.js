import Modal from "react-native-modal";
import {Dimensions, Text, TextInput, View} from "react-native";
import React from "react";
import FastImage from "react-native-fast-image";
import {

    Button,


} from 'native-base';
const {height, width} = Dimensions.get('window');


export default class Modal_add_photo extends React.Component {


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
                        height: height / 2,
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
                        }}>Добавить фото</Text>
                        <View style={{flexDirection: 'row'}}>
                            <FastImage source={{uri: this.props.photo}}

                                       style={{height: height / 7, width: width / 3,borderRadius:10,borderWidth:1,borderColor:'#000000'}}

                            />
                            <Button transparent
                            onPress={()=>this.props.handleChoosePhoto()}

                            >
                            <Text style={{
                                marginLeft: width / 27,
                                marginTop: height / 30,
                                color: 'black',
                                backgroundColor:'#ffffff',
                                borderRadius: 3,
                                borderColor: '#868686',
                                borderWidth: 1,
                                width: width / 2.5,
                                textAlign: 'center',
                                height: height / 25
                            }}
                            >Выбрать фото</Text>
                            </Button>
                        </View>
                        <Text style={{color: '#3862c0', paddingTop: 20,}}>Описание</Text>
                        <TextInput

                            underlineColorAndroid="#3862c0"
                            onChangeText={(text) => this.props.change_description(text)}
                            keyboardType='default'

                            blurOnSubmit={false}


                            maxLength={16}

                        />
                        <View style={{flexDirection:'row',justifyContent:'center',margin:10,padding:10}}>
                            <Button transparent
                                    onPress={()=>this.props.close_modal_add_photo()}
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
                                    onPress={()=>this.props.send_responsible_photo()}
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

                            marginLeft:5,
                            height: height / 25
                        }}
                        >Загрузить</Text>
                            </Button>
                        </View>
                    </View>


            </Modal>

        );
    }
}
