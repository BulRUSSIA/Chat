
import React from "react";
import {Body, Button, Icon, Left, Right, Title,Header} from "native-base";
export default class Toolbar_redactor extends React.Component {


    render() {

        return (
            <Header
                style={{backgroundColor: '#0D5E96',}}
                androidStatusBarColor="#0D5E96">


                <Left style={{flex: 1}}>
                    <Button transparent

                            onPress={this.props.backs}>
                        <Icon
                            style={{color: 'white'}}
                            name="ios-arrow-back"/>
                    </Button>

                </Left>
                <Body>
                    <Title>Профиль</Title>
                </Body>
                <Right/>


            </Header>
        )
    }
}

