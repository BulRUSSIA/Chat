
import React from "react";
import {Body, Button, Header, Left, Picker, Right,  Title} from "native-base";
import Icon from "react-native-vector-icons/AntDesign";


export class Header_private_list extends React.Component {


    render() {


        return      <Header style={{backgroundColor: '#3c3e5a',}}
                            androidStatusBarColor="#3c3e5a"
                            onActionSelected={this.props.onActionSelected.bind(this)}
                            actions={this.props.item_menu}
                           >

            <Left style={{flex: 1}}>
                <Button transparent

                        onPress={this.props.back}>
                    <Icon
                        style={{color: 'white'}}
                        size={25}
                        name="arrowleft"/>
                </Button>

            </Left>
            <Body>
                <Title>Приват</Title>
            </Body>

            <Right>


                <Picker
                    mode="dropdown"
                    iosIcon={<Icon name="Stop"/>}


                    placeholderStyle={{color: "#bfc6ea"}}
                    placeholderIconColor="#ffffff"
                    style={{color: 'white'}}
                    selectedValue={this.props.selected}
                    onValueChange={this.props.onValueChange.bind(this)}
                >

                    <Picker.Item label="Платные опции" value="key0"/>
                    <Picker.Item label="Удалить диалоги" value="key1"/>
                </Picker>
            </Right>


        </Header>
    }
}