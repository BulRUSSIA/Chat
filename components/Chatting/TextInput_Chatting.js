import {
    Image,

    TextInput,

    TouchableOpacity,
    View
} from "react-native";

import React from "react";


export class TextInput_Chatting extends React.Component {









    render() {


        return <View style={{ flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 5,
            paddingVertical: 3,
        backgroundColor:'#ffffff'}}>

            <TouchableOpacity style={{justifyContent: 'center',
                alignItems: 'center',
                marginLeft: 1,
                paddingLeft:21,
                paddingRight: 15,

                backgroundColor: '#ffffff'}} >
                <Image
                    style={{width: 30, height: 30, marginTop: 5,}}
                    source={require('../Image/smile-256x256.png')}/>
            </TouchableOpacity>

            <TextInput style={{
                backgroundColor: '#ffffff',
                fontSize: 16,
                padding:8,
                height:50,
            width:'65%'}}
                       underlineColorAndroid="#00bfff"
                       placeholder='Сообщение             '
                       keyboardType='default'


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

                backgroundColor: '#ffffff'}}

            >

                <Image
                    style={{width: 25, height: 25, marginTop: 5,}}
                    source={require('../Image/send_button.webp')}/>
            </TouchableOpacity>

        </View>

    }
}