import {

    TextInput,
    Dimensions,
    TouchableOpacity,
    View,
} from "react-native";

import React from "react";
import smile_image from '../Image/ic_insert_emoticon_light_blue_500_24dp.png'
import keyboard_image from '../Image/ic_keyboard_light_blue_500_24dp.png'
import FastImage from "react-native-fast-image";

const {width, height} = Dimensions.get('window');

export class TextInput_Chatting extends React.Component {


    render() {


        return <View style={{
            //
            flexDirection: 'row',

            marginBottom:25,
            marginTop:5,

            //
             borderColor:'#868686',
            borderWidth:2,
            // height: height * 0.12,
            // paddingHorizontal: width * 0.05,
            backgroundColor: this.props.key_color,
        }}>



            <TextInput


                style={{


                    fontSize: 16,
                    height: height/15,
                    color: "#000000",
                    width: width/1.2,
                    maxWidth:width,

                }}

                placeholderTextColor="#6D6D6D"
                placeholder='Сообщение'
                autoCorrect={true}
                multiline={false}
                ref={(input) => this.secondTextInput = input}
                onChangeText={(text) => this.props.add_text(text)}
                value={this.props.text}
                maxLength={90}

                onSubmitEditing={this.props.send_msg}

            />
            <TouchableOpacity
                onPress={() => {
                    {

                        if (this.props.active) {
                            this.secondTextInput.focus()
                        }
                        this.props.show()
                    }
                }}

                style={{

                   justifyContent:'center',
                    backgroundColor:'#ffffff',

                }}>

                <FastImage
                    style={{

                        width: width * 0.06,
                        height: height * 0.06,


                        backgroundColor: "#ffffff"
                    }}
                    source={smile_image}
                    resizeMode={FastImage.resizeMode.contain}/>
            </TouchableOpacity>
            {/*<TouchableOpacity*/}
            {/*    // onLongPress={this.props.send_audio_screen}*/}
            {/*    // onPress={this.props.send_msg}*/}


            {/*    style={{*/}


            {/*        marginLeft: 1,*/}
            {/*        marginRight: width * 0.04,*/}
            {/*        backgroundColor: this.props.key_color,*/}


            {/*    }}*/}

            {/*>*/}

            {/*    <FastImage*/}
            {/*        style={{height: height * 0.06, width: width * 0.06, marginTop: height * 0.02}}*/}
            {/*        source={require('../Image/send_button.webp')}*/}
            {/*        resizeMode={FastImage.resizeMode.contain}/>*/}
            {/*</TouchableOpacity>*/}

        </View>
    }
}
