import {
    Text,
    View
} from "react-native";
import React from "react";
import styles from "../../styles";
export class Pattern_message2 extends React.Component {


    render() {


        return  (

            <View style={{flex: 1, flexDirection: 'row', backgroundColor: 'rgba(191,191,191,0.49)'}}>
                <Text style={[styles.prices, {color: '#010101'}]}>

                    {this.props.user}

                    <Text style={[styles.symbols, {color: '#010101'}]}>
                        {this.props.message}

                    </Text>
                </Text>
            </View>

    )

    }
}