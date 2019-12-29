import {
    Text,
    View
} from "react-native";

import React from "react";


export class Pattern_message4 extends React.Component {


    render() {


        return    (

            <View style={{flex: 1, flexDirection: 'row'}}>
                <Text style={{color: this.props._class,fontSize: this.props.size_msg,}}>
                    {this.props.user}

                    <Text style={[{fontSize:this.props.size_msg,fontWeight: 'bold'}, {color: this.props._class}]}>

                        {this.props.message}
                    </Text>



                </Text>



            </View>
        )


    }
}