
import React from "react";
import {Body, Button, Header, Icon, Left, Picker, Right,  Title} from "native-base";


export class Header_private_list extends React.Component {


    render() {


        return      <Header style={{backgroundColor: '#25566e'}}
                            onActionSelected={this.props.onActionSelected.bind(this)}
                            actions={this.props.item_menu}>

            <Left style={{flex: 1}}>
                <Button transparent

                        onPress={this.props.back}>
                    <Icon
                        style={{color: 'white'}}
                        name="ios-arrow-back"/>
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