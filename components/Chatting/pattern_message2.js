import {
    Image,
    Text,
    View
} from "react-native";
import React from "react";
import emoticons from "../const/EmojiObject";
export class Pattern_message2 extends React.Component {
    ParsedText = () => {

        let text = this.props.message;
        return text.split(/([\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff]])/g).map((elem,index) => {
            if (!elem) return null;
            if ((emoticons[elem]))
                return (

                    <Image style={{width:this.props.size_msg,height:this.props.size_msg,marginTop:'2%',paddingBottom:'1%'}} source={emoticons[elem]}
                           key={index*2}


                    />


                );
            else {


                return (

                    <Text

                        key={index*7}
                        style={{

                            fontSize: this.props.size_msg,
                            flex:1,



                            color: this.props._class}}>{elem}


                    </Text>

                )
            }


        });
    };

    render() {
        console.log('pattern - 2');


        return  (

            <View style={{flex: 1, flexDirection: 'row', backgroundColor: 'rgba(191,191,191,0.49)'}}>


                <Text style={{color: '#010101', fontSize: this.props.size_msg,  paddingBottom:'3%',
                    marginTop:'2%'}}

                >

                    {this.props.user}

                    {this.ParsedText()}
                </Text>
            </View>

    )

    }
}