import {
    Image,
    Text, TouchableOpacity,
    View
} from "react-native";

import React from "react";
import styles from "../../styles";
import emoticons from "../const/EmojiObject";

export class Pattern_message5 extends React.Component {

    ParsedText = () => {

        let text = this.props.message;
        return text.split(/([\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff]])/g).map(elem => {
            if (!elem) return null;
            //   if (elem.match((/(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/g))) {
            //      const emojiData = getEmojiDataFromNative(`${elem}`, 'apple', data);
            if ((emoticons[elem]))
                return (

                    <Image style={{width:22,height:22,resizeMode: 'contain',marginTop:'1%'}} source={emoticons[elem]}/>


                );
            else {


                return (
                    <View>
                        <Text style={[styles.symbols, {color: this.props._class}]}>{elem}</Text>
                    </View>

                )


            }


        });
    };


    render() {


        return <TouchableOpacity style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap'}}
                                 onPress={() => this.props.Action_Nick(this.props.user,this.props.user_id)}>


            <View style={{
                flex: 1,
                flexDirection: 'row',
                flexWrap: 'wrap',

            }}>


                <View>
                    <Text style={[styles.prices, {color: this.props._class}]}

                    >

                        {this.props.user}:
                    </Text>
                </View>

                {this.ParsedText()}


            </View>

        </TouchableOpacity>


    }
}