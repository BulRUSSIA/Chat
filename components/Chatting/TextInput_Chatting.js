import {


    TextInput,

    TouchableOpacity,
    View
} from "react-native";

import React from "react";
import smile_image from '../Image/ic_insert_emoticon_light_blue_500_24dp.png'
import keyboard_image from '../Image/ic_keyboard_light_blue_500_24dp.png'
import FastImage from "react-native-fast-image";


export class TextInput_Chatting extends React.Component {



    render() {


        return <View style={{ flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 5,
            paddingVertical: 3,
            backgroundColor:this.props.key_color,
       }}>

            <TouchableOpacity
                onPress={()=> {{

                    if(this.props.active) {
                        this.secondTextInput.focus()
                    } this.props.show()}}}

                style={{justifyContent: 'center',
                alignItems: 'center',
                marginLeft: 1,
                paddingLeft:21,
                paddingRight: 15,


                    backgroundColor:this.props.key_color,}} >
                <FastImage
                    style={{width: 20, height: 20, marginTop: 5, backgroundColor:this.props.key_color,resizeMode: 'contain'}}
                    source={this.props.active ===  false ? smile_image : keyboard_image}/>
            </TouchableOpacity>

            <TextInput style={{
                backgroundColor:this.props.key_color,
                fontSize: 16,
                padding:8,
                height:50,
                color : "#169dd2",
            width:'65%'}}
                       underlineColorAndroid="#00bfff"
                       placeholderTextColor = "#5C6A6E"
                       placeholder='Сообщение.....             '
                       keyboardType='default'
                       multiline={true}


                       ref={(input)=> this.secondTextInput = input}


                       onChangeText={(text) => this.props.add_text(text)}
                value={this.props.text}

                maxLength={180}

            />


            <TouchableOpacity
                onPress={this.props.send_msg}


                style={{justifyContent: 'center',
                alignItems: 'center',
                marginLeft: 1,
                paddingLeft:21,
                paddingRight: 15,
                    backgroundColor:this.props.key_color,




               }}

            >

                <FastImage
                    style={{ height: 20, marginTop: 5,width:22,}}
                    source={require('../Image/send_button.webp')}/>
            </TouchableOpacity>

        </View>

    }
}