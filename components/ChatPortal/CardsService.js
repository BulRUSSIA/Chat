import {
    Body,
    CardItem,
    Container,

    Text,

} from "native-base";
import {ImageBackground, View, Image, TouchableOpacity} from "react-native";
import React from "react";

export default class CardsService extends React.Component {




    render() {


        return (

            <CardItem cardBody
                      style={{marginTop: '1%', backgroundColor: 'rgb(49,110,93)'}}>

                <ImageBackground source={require('../Image/last_back.webp')}
                                 style={{height: 250, width: null, flex: 1}}>

                    <Body style={{alignItems: 'center', backgroundColor: 'rgba(48,111,167,0.69)'}}>
                        <Text style={{color: '#010101', fontWeight: 'bold'}}>Сервисы</Text>


                    </Body>

                    <Container style={{backgroundColor: 'rgba(131,197,160,0.69)', flex: 7}}>

<View style={{flex:1,flexDirection:'row'}}>
    <Image source={require('../Image/avatarProfile.png')}
                     style={{height: 40, width: 40}}/>
    <TouchableOpacity onPress={this.props.GetAvatarList}>
                    <Text style={{fontWeight:'bold',fontSize:22,color:'#285d8c'}}>
                        Купить аватар
                    </Text>
    </TouchableOpacity>
</View>

                        <View style={{flex:1,flexDirection:'row'}}>
                            <Image source={require('../Image/avtoritetProfile.png')}

                                   style={{height: 40, width: 40}}/>
                        <Text style={{fontWeight:'bold',fontSize:22,color:'#285d8c'}}>
                            Купить авторитет
                        </Text >
                        </View>
                        <View style={{flex:1,flexDirection:'row'}}>
                            <Image source={require('../Image/news.png')}
                                   style={{height: 40, width: 40}}/>
                        <Text style={{fontWeight:'bold',fontSize:22,color:'#285d8c'}}>
                            Заказать бегущую строку
                        </Text>
                        </View>
                    </Container>
                </ImageBackground>

            </CardItem>


        );
    }
}