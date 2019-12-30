
import React from "react";
import {Badge, Body, Button, Header,  Left, Title,Right} from "native-base";



import Icon from 'react-native-vector-icons/Ionicons';
import PopupMenu from "./PopupMenu";
export default class Header_rooms extends React.Component {

    check_permission_admin = ()=> {

        console.log('typeeeeeeeeeeeeee',this.props.type_user);

        if (this.props.type_user===2)
            return(
                <Right>
                    <PopupMenu
                        actions={['Изменить категорию','Добавить Категорию', 'Добавить комнату','Удалить категорию']}
                        onPress={(e,i) =>  this.props.Rooms_menu_selected(i,e)}
                    />
                </Right>

            )

    };


    render() {


        return (

            <Header style={{backgroundColor: '#3c3e5a',}}
                    androidStatusBarColor="#3c3e5a"

            >
                <Left style={{flex: 1}}>
                    <Button transparent

                            onPress={this.props.back_room}>
                        <Icon style={{color:'white'}}
                              size={25}

                            name="ios-arrow-back"/>
                    </Button>
                </Left>
                <Body style={{flex: 4, justifyContent: 'center', alignItems: 'center',}}>
                    <Title
                        style={{fontSize: 24}}>{this.props.category_name_toolbar}</Title>
                </Body>
                <Body style={{flex: 3, justifyContent: 'center', alignItems: 'center'}}>
                    <Title> онлайн:{this.props.count}</Title>

                </Body>
                <Badge primary style={{backgroundColor: '#50d36e', width: 15,height:15, marginTop: 10,}}>

                </Badge>
                <Right>
                    <PopupMenu
                        actions={['Изменить категорию','Добавить Категорию', 'Добавить комнату','Удалить категорию']}
                        onPress={(e,i) => this.props.Rooms_menu_selected(i,e)}
                    />
                </Right>
            </Header>


        );
    }
}