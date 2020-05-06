
import React from "react";
import {Body, Button, Left, Right, Title,Header} from "native-base";
import Icon from "react-native-vector-icons/AntDesign";

export default class HeaderBar extends React.Component {



    render() {

        return(
            <Header
                style={{backgroundColor: 'rgba(212,212,212,0.96)',}}
                androidStatusBarColor="#A9A9A9">


                <Left style={{flex: 1}}>
                    <Button transparent

                            onPress={this.props.pushing}>
                        <Icon
                            size={25}
                            style={{color: 'black'}}
                            name="arrowleft"/>
                    </Button>

                </Left>
                <Body>
                    <Title style={{color:'black'}}>Подарок</Title>
                </Body>
                <Right/>




            </Header>
        )
    }

}
