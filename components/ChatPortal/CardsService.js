import {
    Body,
    CardItem,
    Container,

    Text,

} from "native-base";
import { View,  TouchableOpacity} from "react-native";
import React from "react";
import FastImage from "react-native-fast-image";

export default class CardsService extends React.Component {




    render() {


        return (

            <CardItem cardBody
                      style={{marginTop: '0.1%',backgroundColor: 'rgba(46,48,68,0)'}}>

                <View
                                 style={{height: 250, width: null, flex: 1}}>

                    <Body style={{alignItems: 'center', backgroundColor: 'rgba(46,93,133,0.37)'}}>
                        <Text style={{color: '#ff0112', fontWeight: 'bold'}}>Сервисы</Text>


                    </Body>

                    <Container style={{backgroundColor: 'rgba(46,48,68,0)', flex: 7}}>

<View style={{flex:1,flexDirection:'row'}}>
    <FastImage source={{uri:'avatar'}}
                     style={{height: 40, width: 40}}/>
    <TouchableOpacity onPress={this.props.GetAvatarList}>
                    <Text style={{fontWeight:'bold',fontSize:22,color:'#010101'}}>
                        {'\t'}   Купить аватар
                    </Text>
    </TouchableOpacity>
</View>

                        <View style={{flex:1,flexDirection:'row'}}>
                            <FastImage source={{uri:'avtoritet'}}

                                   style={{height: 38, width: 38}}/>
                        <Text style={{fontWeight:'bold',fontSize:22,color:'#010101'}}>
                            {'\t\t\t'} Купить авторитет
                        </Text >
                        </View>
                        <View style={{flex:1,flexDirection:'row'}}>
                            <FastImage source={{uri:'linerun'}}
                                   style={{height: 40, width: 40}}/>
                        <Text style={{fontWeight:'bold',fontSize:22,color:'#010101'}}>
                            {'\t'}    Заказать бегущую строку
                        </Text>
                        </View>
                    </Container>
                </View>

            </CardItem>


        );
    }
}