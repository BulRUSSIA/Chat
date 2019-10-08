import {
    Text,
    TouchableOpacity,
    View
} from "react-native";

import React from "react";
import styles from "../../styles";


export class Pattern_message2 extends React.Component {


    render() {


        return  <TouchableOpacity onPress={() => this.props.Action_Nick(this.props.user)}>


            <View style={{flex: 1, flexDirection: 'row', backgroundColor: 'rgba(192,226,226,0.6)'}}>


                <Text style={[styles.prices, {color: '#010101'}]}

                >
                    {this.props.user}

                    <Text style={[styles.symbols, {color: '#010101'}]}
                    >
                        {this.props.message}


                    </Text>

                </Text>


            </View>

        </TouchableOpacity>

    }
}