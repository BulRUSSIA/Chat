
import React from "react";
import {Badge, Body, Button, Header, Icon, Left, Title} from "native-base";

export default class Header_rooms extends React.Component {




    render() {


        return (

            <Header style={{backgroundColor: '#25566e',}}
                    androidStatusBarColor="#25566e"
            >
                <Left style={{flex: 1}}>
                    <Button transparent

                            onPress={this.props.back_room}>
                        <Icon

                            name="ios-arrow-back"/>
                    </Button>
                </Left>
                <Body style={{flex: 4, justifyContent: 'center', alignItems: 'center',}}>
                    <Title
                        style={{fontSize: 25}}>Комнаты</Title>
                </Body>
                <Body style={{flex: 3, justifyContent: 'center', alignItems: 'center'}}>
                    <Title> онлайн:{this.props.count}</Title>

                </Body>
                <Badge primary style={{backgroundColor: '#50d36e', width: 24, marginTop: 10,}}>

                </Badge>
            </Header>


        );
    }
}