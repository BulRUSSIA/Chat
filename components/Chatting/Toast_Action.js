import { View} from "react-native";
import React from "react";
import Toast from 'react-native-whc-toast'



export class Toast_Action extends React.Component {


    render() {
        return (
            <View style={styles.container}>

                <Toast ref="toast"/>
            </View>
        );
    }
}