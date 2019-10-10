import {
    Text, TouchableOpacity,
    View
} from "react-native";

import React from "react";
import styles from "../../styles";
import {Emoji} from "emoji-mart-native";
import { getEmojiDataFromNative } from 'emoji-mart-native'
import data from 'emoji-mart-native/data/apple.json'
const emojiData = getEmojiDataFromNative('💰', 'apple', data)
export class Pattern_message5 extends React.Component {


    render() {


        return      <TouchableOpacity onPress={() => this.props.Action_Nick(this.props.user)}>


            <View style={{flex: 1, flexDirection: 'row'}}>


                <Text style={[styles.prices, {color: this.props._class}]}

                >
                    {this.props.user}:

                    <Text style={[styles.symbols, {color: this.props._class}]}
                    >
                        {this.props.message}


                    </Text>

                </Text>



            </View>

        </TouchableOpacity>


    }
}