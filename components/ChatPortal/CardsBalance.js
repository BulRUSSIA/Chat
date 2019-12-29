import {
    Body,
    CardItem,
      Text,


} from "native-base";
import {Dimensions } from "react-native";
import React from "react";
import FastImage from "react-native-fast-image";
const {height} = Dimensions.get('window');
export default class CardsBalance extends React.Component {




    render() {


        return (


                        <CardItem

                            cardBody

                            style={{ backgroundColor: 'rgb(46,48,68)',height:height/4}}>



<Body>
                                    <Text style={{color: '#FFFFF1',alignSelf:'center',fontSize:20}}>Баланс чатлов</Text>

    <Text style={{fontSize:50,color:'white',alignSelf: 'center'}}>{this.props.balance_card}rur.</Text>
    <FastImage
        style={{width:40,height:40,alignSelf:'center'}}
        source={{uri:'wallet'}}/>
</Body>





                        </CardItem>


        );
    }
}