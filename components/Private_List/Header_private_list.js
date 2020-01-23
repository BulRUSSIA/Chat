import action_private_list from '../const/private_list_actions'
import React from "react";
import {Body, Button, Header, Left, Picker, Right,  Title} from "native-base";
import Icon from "react-native-vector-icons/AntDesign";
import PopupMenu from "../Rooms/PopupMenu";


export class Header_private_list extends React.Component {


    render() {


        return      <Header style={{backgroundColor: '#0D5E96',}}
                            androidStatusBarColor="#0D5E96"

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
                <PopupMenu


                    actions={action_private_list}
                    onPress={(e, i) => this.props.onActionSelected(i)}
                />
            </Right>

        </Header>
    }
}