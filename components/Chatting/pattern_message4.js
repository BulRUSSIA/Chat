import {
    Text,
    View
} from "react-native";

import React from "react";
import styles from "../../styles";


export class Pattern_message4 extends React.Component {


    render() {


        return    (

            <View style={{flex: 1, flexDirection: 'row'}}>
                <Text style={[styles.prices, {color: this.props._class}]}>
                    {this.props.user}

                    <Text style={[{fontSize:20,fontWeight: 'bold'}, {color: this.props._class}]}>

                        {this.props.message}
                    </Text>



                </Text>



            </View>
        )


    }
}