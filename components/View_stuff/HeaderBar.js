
import React from "react";
import {Body, Button, Icon, Left, Right, Title,Header} from "native-base";
import {View} from "react-native";
export default class HeaderBar extends React.Component {



    render() {

        return(
            <Header    style={{backgroundColor:'#2e3044'}}
                    androidStatusBarColor="#2e3044">


                <Left style={{flex: 1}}>
                    <Button transparent

                            onPress={this.props.pushing}>
                        <Icon
                            style={{color: 'white'}}
                            name="ios-arrow-back"/>
                    </Button>

                </Left>
                <Body>
                    <Title>Подарок</Title>
                </Body>
                <Right/>




            </Header>
        )
    }

}