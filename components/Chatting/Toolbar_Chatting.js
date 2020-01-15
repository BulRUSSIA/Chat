// import {StatusBar, Text, ToolbarAndr oid, Vi ew} from "react-native";
// import styles from "../../styles";
import React from "react";
import {Body, Button, Header, Left, Right, Title} from "native-base";
import Icon from "react-native-vector-icons/AntDesign";
import PopupMenu from "../Rooms/PopupMenu";
import FastImage from "react-native-fast-image";
import {
    Dimensions
} from "react-native";
const {height,width} = Dimensions.get('window');
export class Toolbar_Chatting extends React.Component {


    render() {


        return <Header style={{backgroundColor: '#3c3e5a', flexDirection: 'row',

            width: "100%",}}
                       androidStatusBarColor="#3c3e5a"


        >

            <Left style={{flex: 1}}>
                <Button transparent

                        onPress={() => this.props.select(1)}>
                    <Icon style={{color: 'white'}}
                          size={width*0.070}

                          name="arrowleft"/>
                </Button>
            </Left>
            <Body style={{flex: 1, justifyContent: 'center', alignItems: 'center',}}>
                <Title
                    style={{fontSize: width*0.05}}>{this.props.room}</Title>
            </Body>
            <Right style={{flex: 1, justifyContent: 'center', alignItems: 'center',}}>
                <Button transparent

                        onPress={() => this.props.select(7)}

                >

                <FastImage source={{uri: 'ic_attach_file_white_24dp'}} style={{
                    width: width*0.06,
                    height: height*0.06,


                }}
                           resizeMode={FastImage.resizeMode.contain}/>
                </Button>
                <Button transparent

                        onPress={() => this.props.select(6)}

                >

                    <FastImage source={{uri: 'ic_message_white_18dp'}} style={{
                        width: width*0.06,
                        height: height*0.06,
                        marginRight:'10%',


                    }}
                               resizeMode={FastImage.resizeMode.contain}/>
                </Button>

                <PopupMenu


                    actions={this.props.item_menu}
                    onPress={(e, i) => this.props.select(i)}
                />
            </Right>

        </Header>
    }
}