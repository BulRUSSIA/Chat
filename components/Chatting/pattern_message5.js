import {
    Text, TouchableOpacity,
    View
} from "react-native";

import React from "react";
import styles from "../../styles";


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