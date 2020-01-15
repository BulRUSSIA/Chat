import {
    Text, TouchableOpacity,
    View, Image
} from "react-native";

import React from "react";
import emoticons from '../const/EmojiObject'
import FastImage from "react-native-fast-image";

export class Pattern_message6 extends React.Component {

    ParsedText = () => {

        let text = this.props.message;
        return text.split(/([\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff]])/g).map((elem, index) => {
            if (!elem) return null;
            if ((emoticons[elem]))
                return (

                    <Image style={{width: this.props.size_msg, height: this.props.size_msg}} source={emoticons[elem]}
                           key={index * 2}/>


                );
            else {


                return (

                    <Text

                        key={index * 7}
                        style={{

                            fontSize: this.props.size_msg,
                            flex: 1,


                            color: this.props._class
                        }}>{elem}


                    </Text>

                )
            }


        });
    };


    get_avatar=()=>{

        if(this.props.avatars.length>1) {

            return (


                <FastImage source={{uri: this.props.avatars}} style={{
                    width: this.props.size_av,
                    height: this.props.size_av,

                }}
                           resizeMode={FastImage.resizeMode.contain}
                />

            )
        }
    };


    render() {


        return (


            <View style={{flex: 1, flexDirection: 'row',}}>

                {this.get_avatar()}

                <TouchableOpacity style={{flex: 1, width: '85%', height: '100%'}}
                                  onPress={() => this.props.Action_Nick(this.props.user, this.props.user_id)}>
                    <Text style={{color: this.props._class, fontSize: this.props.size_msg,marginTop:'2%'}}>
                        {this.props.user}:
                        {this.ParsedText()}
                    </Text>
                </TouchableOpacity>

            </View>


        )
    }
}