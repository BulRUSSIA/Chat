import {
    Body,
    CardItem,
    Text,
} from "native-base";
import {Dimensions} from "react-native";
import React from "react";
const {height} = Dimensions.get('window');
export default class CardsBalance extends React.Component {

    render() {
        return (
            <CardItem
                cardBody
                style={{backgroundColor: 'rgba(255,255,255,0)', height: height / 4,marginBottom:height/12}}>
                <Body>
                    <Text style={{color: '#010101', alignSelf: 'center', fontSize: 20}}>Баланс чатлов</Text>
                    <Text
                        style={{fontSize: 50, color: 'black', alignSelf: 'center',textAlign:'center'}}>{this.props.balance_card}rur.</Text>
                    <Text style={{color: '#c00c17', paddingTop: 20,textAlign:'center'}}>Для пополнения баланса переведите нужную сумму на Qiwi кошелек +79226075845(в комментарии укажите ваш логин в чате), зачисление происходит от 1м до 2ч</Text>

                </Body>
            </CardItem>
        );
    }
}
