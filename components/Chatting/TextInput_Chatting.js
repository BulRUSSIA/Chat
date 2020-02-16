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

            flexDirection: 'row',


            height: height * 0.135,

            justifyContent: 'space-between',
            paddingHorizontal: width * 0.05,
            backgroundColor: this.props.key_color,
        }}>

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


                    backgroundColor: this.props.key_color,
                }}>

                <FastImage
                    style={{
                        marginTop: height * 0.02,
                        width: width * 0.06,
                        height: height * 0.06,

                        backgroundColor: this.props.key_color
                    }}
                    source={this.props.active === false ? smile_image : keyboard_image}
                    resizeMode={FastImage.resizeMode.contain}/>
            </TouchableOpacity>

            <TextInput


                style={{

                    backgroundColor: this.props.key_color,
                    fontSize: 16,
                    height: height * 0.1,
                    color: "#000000",
                    width: width * 0.62,


                }}

                underlineColorAndroid="#169dd2"
                placeholderTextColor="#6D6D6D"
                placeholder='Сообщение'
                autoCorrect={true}
                multiline={true}
                ref={(input) => this.secondTextInput = input}
                onChangeText={(text) => this.props.add_text(text)}
                value={this.props.text}
                maxLength={120}
                selectionColor='#169dd2'
                editable={this.props.editable_key}

            />

            <TouchableOpacity
                onLongPress={this.props.send_audio_screen}
                onPress={this.props.send_msg}


                style={{


                    marginLeft: 1,
                    marginRight: width * 0.04,
                    backgroundColor: this.props.key_color,


                }}

            >

                <FastImage
                    style={{height: height * 0.06, width: width * 0.06, marginTop: height * 0.02}}
                    source={require('../Image/send_button.webp')}
                    resizeMode={FastImage.resizeMode.contain}/>
            </TouchableOpacity>

        </View>
    }
}
