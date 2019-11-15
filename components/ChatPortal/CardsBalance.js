import {
    Body,
    CardItem,
    Container,
    Left,
    Text,


} from "native-base";
import {Image,View,Dimensions } from "react-native";
import React from "react";
const {height} = Dimensions.get('window')
export default class CardsBalance extends React.Component {




    render() {


        return (


                        <CardItem

                            cardBody

                            style={{marginTop: '1%', backgroundColor: 'rgb(49,110,93)',height:height/2}}>


                                <View style={{flex:1}}>
                                <Body style={{alignItems: 'center', backgroundColor: 'rgba(48,111,167,0.69)'}}>
                                    <Text style={{color: '#010101', fontWeight: 'bold'}}>Баланс чатлов</Text>


                                </Body>


                                <Body style={{alignItems: 'center', backgroundColor: 'rgb(113,166,200)'}}>
                                    <Text style={{color: '#c0f9fb', fontWeight: 'bold', marginTop: '1%'}}>{this.props.balance_card}
                                        rur</Text>
                                </Body>


                                <Container style={{backgroundColor: 'rgba(131,197,160,0.69)', flex: 7}}>
                                    <Body style={{alignItems: 'center', marginTop: 20}}>
                                        <Image
                                            style={{width: 100, height: 100, resizeMode: 'contain'}}
                                            source={require('../Image/dollar.png')}/>

                                    </Body>

                                    <Left style={{alignItems: 'center', marginTop: '10%'}}>

                                        <Text style={{color: '#30578d', fontWeight: 'bold',fontSize:25}}>Пополнить баланс</Text>
                                    </Left>

                                </Container>

                                </View>
                        </CardItem>


        );
    }
}