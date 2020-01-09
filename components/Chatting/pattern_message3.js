import {
     Text, TouchableOpacity,
    View
} from "react-native";

import React from "react";
import styles from "../../styles";
import {Dimensions} from "react-native";
import FastImage from "react-native-fast-image";
export class Pattern_message3 extends React.Component {
    view_attach = ()=>{

        return(

        <TouchableOpacity
            style={{
                // borderColor: '#221e3c',
                // borderWidth: 10,
                // backgroundColor: '#221e3c',
                // borderRadius:10,
                //
                 flex:1,
                //
                //
                //
                 alignItems: 'center',
                // width:width,
                // height:height/4,










            }}
            onPress={() => this.props.view_attach(this.props.attachments)}>



            <FastImage source={{uri: this.props.attachments}} style={styles.imageAttachRoom}/>

        </TouchableOpacity>
        )

    };

    render() {






        return(

            <View style={{flex: 1, flexDirection: 'column',maxWidth:'100%'}}>
                {/*1/!*<FastImage source={{uri: this.props.avatars}} style={{*!/*/}
                {/*/!*    width: this.props.size_av,*!/*/}
                {/*/!*    height: this.props.size_av,*!/*/}
                {/*/!*    paddingBottom: 12,*!/*/}
                {/*/!*    marginBottom: 5,*!/*/}
                {/*/!*    borderRadius: 7,*!/*/}
                {/*/!*    marginLeft: 0,*!/*/}

                {/*/!*}}*!/*/}
                {/*           resizeMode={FastImage.resizeMode.contain}/>*/}
                <Text style={{color: '#010101',fontSize: this.props.size_msg,fontWeight:'bold'}}

                >
                    {this.props.user}:

                    <Text style={{color: '#010101',fontSize: this.props.size_msg,fontWeight:'bold',


                        marginLeft: 0,
                        padding: 1,
                        paddingBottom: 20,}}
                    >
                        {this.props.message}


                    </Text>

                </Text>

                {this.view_attach()}



            </View>

        )
    }
}