import {
    Image, Text, TouchableOpacity,
    View
} from "react-native";

import React from "react";
import styles from "../../styles";


export class Pattern_message3 extends React.Component {


    render() {



        return(

        <View style={{flex: 1, flexDirection: 'row'}}>
            <Image source={{uri: this.props.avatars}} style={styles.imageView}/>
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

                   right:'25%'}}
                onPress={() => this.props.view_attach(this.props.attachments)}>



                    <Image source={{uri: this.props.attachments}} style={styles.imageAttachRoom}/>




            </TouchableOpacity>

        </View>

    )
    }
}