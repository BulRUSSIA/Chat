import React from 'react';
import {ImageBackground, Text, View} from "react-native";
export default class NewsList extends React.Component {


    render() {


        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>

                <ImageBackground source={require('../Image/whatsap.png')}
                                 style={{width: '100%', height: '100%'}}>
                    <Text>CАЛАМ АЛЕЙКУМ БРАТЬЯ ЧЕЧЕНЦЫ!</Text>
                </ImageBackground>
            </View>
        );
    }
}
