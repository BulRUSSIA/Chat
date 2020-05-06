
import React from "react";
import {Body, Button, Left,Title,Header} from "native-base";
import Icon from "react-native-vector-icons/AntDesign";
import {View} from "react-native";
import FastImage from "react-native-fast-image";
import styles from "../../styles";

export default class HeaderBar extends React.Component {



    render() {

        return(
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

                <Body style={{flex:3}}>
                    {this.props.user_info.map(function(item){

                        return (<View style={{ flexDirection: 'row'}}>
                            <FastImage source={({uri: item.photo})} style={styles.imageAvatarProfile}

                            />

                        <Title style={{color:item.color,  fontWeight: '200',
                            fontFamily: 'sans-serif-light',}}> {item.nic} </Title>
                        </View>)
                    })}
                </Body>
            </Header>
        )
    }

}
