import {
    Image,
    Text, TouchableOpacity,
    View
} from "react-native";

import React from "react";
import styles from "../../styles";
import { Emoji,getEmojiDataFromNative } from 'emoji-mart-native'
import data from 'emoji-mart-native/data/apple.json'


export class Pattern_message6 extends React.Component {

    ParsedText = () => {

       let  text = this.props.message;
        return text.split(/([\u00a9|\u00ae|][\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/g).map( elem => {
            if (!elem) return null;

            if (elem.match((/(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/g))) {
                const emojiData =  getEmojiDataFromNative(`${elem}`, 'apple', data);
                console.log(data);

                console.log('i am emoji' + (elem));


                return (
                    <View style={{bottom:'1%'}}>
                    <Emoji style={styles.emoji} emoji={ new emojiData} size={18} />
                    </View> )}

            else {
                console.log('i am text'+ elem);
                return (
                    <View style={{flex: 3, flexDirection: 'row',top:'1%'}}>
                        <Text style={[styles.symbols, {color: this.props._class}]}>{elem}</Text>
                    </View>
                )

            }
        });
    }




    render() {


        return      <TouchableOpacity onPress={() => this.props.Action_Nick(this.props.user)}>


            <View style={{flex: 1, flexDirection: 'row'}}>


                <Image source={{uri: this.props.avatars}} style={styles.imageView}/>

                <Text style={[styles.prices, {color: this.props._class}]}

                >
                    {this.props.user}:
                </Text>

                {this.ParsedText()}

            </View>

        </TouchableOpacity>


    }
}