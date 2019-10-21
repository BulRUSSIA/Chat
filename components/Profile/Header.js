
import React from "react";
import {Body, Button, Icon, Left, Right, Title,Header} from "native-base";
export default class HeaderBar extends React.Component {



    render() {

        return(
            <Header style={{backgroundColor: '#25566e'}}
                    androidStatusBarColor="#25566e">


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