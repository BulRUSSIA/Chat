import {
Image,

    Text, TouchableOpacity,
    View
} from "react-native";

import React from "react";
import styles from "../../styles";
import emoticons from '../const/EmojiObject'

export class Pattern_message6 extends React.Component {

    ParsedText = () => {

        let text = this.props.message;
        return text.split(/([\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff]])/g).map(elem => {
            if (!elem) return null;
                if ((emoticons[elem]))
                    return (

                        <Image style={{width:20,height:20,resizeMode: 'cover',marginTop:'2%',paddingBottom:'1%'}} source={emoticons[elem]}/>


                    );
             else {


                return (

                    <Text style={{

                        fontSize: 18,
                        flex:1,



                        color: this.props._class}}>{elem}</Text>


                )


            }


        });
    };


    render() {


        return      <TouchableOpacity style={{flex:1,width:'85%',height:'100%'}} onPress={() => this.props.Action_Nick(this.props.user,this.props.user_id)}>


            <View style={{flex: 1, flexDirection: 'row',}}>


                <Image source={{uri: this.props.avatars}} style={styles.imageView}/>

                <Text style={[styles.prices, {color: this.props._class}]}

                >
                    {this.props.user}:

                    {this.ParsedText()}

                </Text>


            </View>

        </TouchableOpacity>


    }
}