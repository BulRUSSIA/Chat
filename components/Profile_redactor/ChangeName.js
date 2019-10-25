
import React from "react";
import {Image, Text, TouchableOpacity, View} from "react-native";
import styles from "../../styles";

export default class ChangeName extends React.Component {




    render() {


        return (

            <TouchableOpacity onPress={this.props.hideModalNick}>
                <View style={{
                    backgroundColor: 'rgba(194,191,215,0.78)',
                }}>
                    <Image source={require('../Image/pen_edit.png')}
                           style={styles.imageAvatar_redactor}/>
                    <Text style={{

                        marginTop: 5,
                        color: 'white',
                        fontWeight: 'bold',
                        marginLeft: 20,
                        fontSize: 20,
                        borderRadius: 8,

                    }}>
                        Cменить ник
                    </Text>

                </View>
            </TouchableOpacity>

        );
    }
}