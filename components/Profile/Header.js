
import React from "react";
import {Body, Button, Left, Right, Title,Header} from "native-base";
import Icon from "react-native-vector-icons/AntDesign";

export default class HeaderBar extends React.Component {



    render() {

        return(
            <Header
                style={{backgroundColor: '#3c3e5a',}}
                androidStatusBarColor="#3c3e5a">


                <Left style={{flex: 1}}>
                    <Button transparent

                            onPress={this.props.backs}>
                        <Icon
                            size={25}
                            style={{color: 'white'}}
                            name="arrowleft"/>
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