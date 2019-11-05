 import {
    Body,
    CardItem,
    Container,
    Left, Right,
    Text, Thumbnail,

} from "native-base";
import {Image, ImageBackground, TouchableOpacity,} from "react-native";
import React from "react";

export default class CardsWedding extends React.Component {




    render() {


        return (


            <CardItem cardBody
                      style={{marginTop: '1%', backgroundColor: 'rgb(49,110,93)'}}>

                <ImageBackground source={require('../Image/last_back.webp')}
                                 style={{height: 250, width: null, flex: 1}}>

                    <Body style={{alignItems: 'center', backgroundColor: 'rgba(48,111,167,0.69)'}}>
                        <Text style={{color: '#010101', fontWeight: 'bold'}}>Виртуальный ЗАГС
                        </Text>


                    </Body>
                    <Body style={{alignItems: 'center', backgroundColor: 'rgba(46,93,133,0.53)'}}>
                        <Text style={{color: '#0d0b3f', fontWeight: 'bold'}}>Последнее бракосочетание</Text>
                    </Body>

                    <Container style={{backgroundColor: 'rgba(131,197,160,0.69)', flex: 7}}>

                        <Left style={{flex: 3, marginRight: '18%'}}>
                            <Text
                                style={{
                                    paddingTop: 39,
                                    marginLeft: '3%',
                                    fontWeight: 'bold',
                                    paddingRight: '3%'
                                }}>Кошка</Text>

                            <Thumbnail

                                style={{marginRight: '50%', marginTop: '5%', width: 80, height: 80}}
                                source={{uri: 'http://185.231.154.198:5000/attachments/photosollt5d3b56ad0a975a5836a1d5ed'}}/>
                        </Left>


                        <Right style={{flex: 4, marginLeft: '20%'}}>

                            <Text style={{

                                paddingBottom: '6%',

                                paddingLeft: '10%',

                                color: '#285d8c',

                                fontWeight: 'bold'
                            }}>New Generation</Text>

                            <Thumbnail
                                style={{marginLeft: '50%', marginBottom: '68%', width: 80, height: 80}}
                                source={{uri: 'http://185.231.154.198:5000/attachments/photosollt5c9fd2810a975a0b4c4622c9'}}/>
                        </Right>
                        <Body style={{marginBottom: 90}}>

                            <Text
                                style={{marginBottom: 10,}}
                            >01.09.19</Text>
                            <TouchableOpacity>
                                <Text style={{color: '#30578d', fontWeight: 'bold'}}> Разбить пару</Text>
                            </TouchableOpacity>
                        </Body>
                    </Container>

                </ImageBackground>

            </CardItem>


        );
    }
}

 //  style={{width: 40, height: 40,}}
 //   source={require('../Image/weddingProfile.png')}