import {
    Image, Text, TouchableOpacity,
    View
} from "react-native";

import React from "react";
import styles from "../../styles";
import {Dimensions} from "react-native";
import FastImage from "react-native-fast-image";
const screenWidth = Math.round(Dimensions.get('window').width);

export class Pattern_message3 extends React.Component {


    render() {



        return(

            <View style={{flex: 1, flexDirection: 'row'}}>
                <Image source={{uri: this.props.avatars}}


                           style={styles.imageView}/>
                <Text style={[styles.prices2, {color: this.props._class}]}

                >
                    {this.props.user}:

                    <Text style={[styles.prices2, {color: this.props._class}]}
                    >
                        {this.props.message}


                    </Text>

                </Text>



                <TouchableOpacity
                    style={{ resizeMode:'scretch',  justifyContent:'center',
                        alignContent:'center', borderColor: '#25566e',
                        borderWidth: 16,

                        backgroundColor: '#25566e',
                        borderRadius: 25,
                        marginTop: '20%',
                        marginBottom:'19%',

                        right:screenWidth/2}}
                    onPress={() => this.props.view_attach(this.props.attachments)}>



                    <FastImage source={{uri: this.props.attachments}} style={styles.imageAttachRoom}/>





                </TouchableOpacity>

            </View>

        )
    }
}