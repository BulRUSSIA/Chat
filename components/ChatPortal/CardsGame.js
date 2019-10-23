import {
    Body,
    CardItem,
    Container,

    Text,

} from "native-base";
import {ImageBackground} from "react-native";
import React from "react";

export default class CardsGame extends React.Component {




    render() {


        return (

            <CardItem cardBody
            >

                <ImageBackground source={require('../Image/last_back.webp')}
                                 style={{height: 250, width: null, flex: 1}}>

                    <Body style={{alignItems: 'center', backgroundColor: 'rgba(48,111,167,0.69)'}}>
                        <Text style={{color: '#010101', fontWeight: 'bold'}}>Игрули</Text>


                    </Body>

                    <Container style={{backgroundColor: 'rgba(131,197,160,0.69)', flex: 7}}>


                    </Container>
                </ImageBackground>

            </CardItem>


        );
    }
}