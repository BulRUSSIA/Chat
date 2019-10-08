import {
    Image,

    TextInput,

    TouchableOpacity,
    View
} from "react-native";

import React from "react";
import {EmojiButton} from "emoji-mart-native";
const emojiImage = require('../Image/smile-256x256.png');


export class Private_TextInput extends React.Component {

    render() {


        return <View style={{ flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 5,
            paddingVertical: 3,
            backgroundColor:'#ffffff'}}>
          <View style={{justifyContent: 'center',
              alignItems: 'center',
              marginLeft: 1,
              paddingLeft:26,

          }}>


            <EmojiButton
                buttonImage={emojiImage}
                style={{

                }}
                onButtonPress={() => {this.props.selected(true)}}
            />
          </View>

            <TextInput style={{
                backgroundColor: '#ffffff',
                fontSize: 16,
                paddingRight:25,
                padding:8,
                height:52,
                width:'65%',
            marginLeft:10}}
                       underlineColorAndroid="#00bfff"
                       placeholder='Сообщение             '
                       keyboardType='default'
                       multiline={true}


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