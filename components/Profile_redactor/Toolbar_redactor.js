import Icon from "react-native-vector-icons/AntDesign";
import {TouchableOpacity} from "react-native";
import React from "react";
import {Body, Button,  Left, Right, Title,Header} from "native-base";
import FastImage from "react-native-fast-image";
export default class Toolbar_redactor extends React.Component {


    render() {

        return (
            <Header
                style={{backgroundColor: 'rgba(212,212,212,0.96)',}}
                androidStatusBarColor="#A9A9A9">


                <Left style={{flex: 1}}>
                    <Button transparent

                            onPress={this.props.backs}>
                        <Icon
                            size={25}
                            style={{color: 'black'}}
                            name="arrowleft"/>
                    </Button>

                </Left>
                <Body>
                    <Title style={{color:'black',fontWeight: '200',fontSize:16,width:150}}>Мой профиль</Title>
                </Body>
                <Right/>

                <Body>
                    <TouchableOpacity onPress={()=>this.props.save_change()}>
                    <FastImage
                        style={{width:20,height:20,alignSelf:'center'}}
                        source={{uri:'save'}}/>
                    </TouchableOpacity>
                </Body>
                <Right/>

            </Header>
        )
    }
}

