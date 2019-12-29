import {

    Image,
    Text, TouchableOpacity,
    View,
} from "react-native";

import React from "react";
import emoticons from '../const/EmojiObject'

export class Pattern_message5 extends React.Component {

    ParsedText = () => {

        let text = this.props.message;
        return text.split(/([\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff]])/g).map((elem,index) => {
            if (!elem) return null;
            if ((emoticons[elem]))
                return (

                    <Image style={{width:this.props.size_msg,height:this.props.size_msg,resizeMode: 'contain',marginTop:'1%'}} source={emoticons[elem]}
                    key={index*5}
                    />


                );
            else {


                return (

                    <Text

                        key={index*8}
                        style={{

                        fontSize: this.props.size_msg,
                        flex:1,





                        color: this.props._class}}>{elem}</Text>


                )


            }


        });
    };


    render() {


        return     (


            <View style={{flex: 1, flexDirection: 'row',}}>


                <TouchableOpacity style={{flex:1,width:'94%',height:'100%'}} onPress={() => this.props.Action_Nick(this.props.user,this.props.user_id)}>

                <Text style={{color: this.props._class,fontSize: this.props.size_msg,}}

                >
                    {this.props.user}:

                    {this.ParsedText()}

                </Text>
                </TouchableOpacity>

            </View>

        )


    }
}