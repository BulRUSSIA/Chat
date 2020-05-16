// import {StatusBar, Text, ToolbarAndr oid, Vi ew} from "react-native";
// import styles from "../../styles";
import React from "react";
import {TouchableNativeFeedback} from 'react-native'
import {Header, Left, Right, Title} from "native-base";
import Icon from "react-native-vector-icons/AntDesign";
import PopupMenu from "../Rooms/PopupMenu";
import FastImage from "react-native-fast-image";
import {
    Dimensions
} from "react-native";
const {height,width} = Dimensions.get('window');
export class Toolbar_Chatting extends React.Component {


    render() {


        return <Header style={{backgroundColor: 'rgba(212,212,212,0.96)', flexDirection: 'row',

            width: "100%",}}
                       androidStatusBarColor="#A9A9A9"


        >
            <TouchableNativeFeedback
                background={TouchableNativeFeedback.Ripple('rgba(72,119,108,0.77)',true)}
                onPress={() => this.props.select(0)}>
            <Left style={{flex: 1,}}>

                    <Icon style={{color: 'black'}}
                          size={width*0.070}

                          name="arrowleft"/>

            </Left>
            </TouchableNativeFeedback>
            <Left style={{flex: 2, }}>
                <Title
                    style={{fontSize: width*0.04,color:'rgba(58,68,156,0.93)',fontWeight:'600'}}>{this.props.room_name.toUpperCase()}</Title>
            </Left>

            <Right style={{flex: 1, justifyContent: 'center', alignItems: 'center',marginLeft:width*0.1}}>

                {/*<TouchableNativeFeedback*/}
                {/*    background={TouchableNativeFeedback.Ripple('rgba(72,119,108,0.77)',true)}*/}
                {/*    onPress={() => this.props.select(7)}*/}

                {/*>*/}
                {/*<FastImage source={{uri: 'attach'}} style={{*/}
                {/*    width: width*0.09,*/}
                {/*    height: height*0.09,*/}
                {/*    right:width/10*/}


                {/*}}*/}
                {/*           resizeMode={FastImage.resizeMode.contain}/>*/}
                {/*</TouchableNativeFeedback>*/}
                <TouchableNativeFeedback
                    background={TouchableNativeFeedback.Ripple('rgba(72,119,108,0.77)',true)}
                        onPress={() => this.props.select(5)}

                >

                    <FastImage source={{uri: 'ic_chat_black_18dp'}} style={{
                        width: width*0.09,
                        height: height*0.09,
                        right:width/15


                    }}
                               resizeMode={FastImage.resizeMode.contain}/>
                </TouchableNativeFeedback>
                <TouchableNativeFeedback
                    background={TouchableNativeFeedback.Ripple('rgba(72,119,108,0.77)',true)}
                        onPress={() => this.props.select(6)}

                >

                    <FastImage source={{uri: 'people_private'}} style={{
                        width: width*0.09,
                        height: height*0.09,

                    }}
                               resizeMode={FastImage.resizeMode.contain}/>
                </TouchableNativeFeedback>

            </Right>
            <Right>
                <PopupMenu


                    actions={this.props.item_menu}
                    onPress={(e, i) => this.props.select(i)}
                />
            </Right>

        </Header>
    }
}
