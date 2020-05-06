
import React from "react";
import {Badge, Body, Button, Header,  Left, Title,Right} from "native-base";



import Icon from "react-native-vector-icons/AntDesign";
import PopupMenu from "./PopupMenu";
import {TYPE_ADMIN} from "../const/const type_user_chats";
export default class Header_rooms extends React.Component {

    check_permission_admin = ()=> {

        console.log('typeeeeeeeeeeeeee',this.props.type_user);

        if (this.props.type_user===TYPE_ADMIN)
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

            <Header style={{backgroundColor: 'rgba(212,212,212,0.96)'}}
                    androidStatusBarColor="#A9A9A9"

            >
                <Left style={{flex: 1}}>
                    <Button transparent

                            onPress={this.props.back_room}>
                        <Icon style={{color:'black'}}
                              size={25}

                            name="arrowleft"/>
                    </Button>
                </Left>
                <Body style={{flex: 4, justifyContent: 'center', alignItems: 'center',}}>
                    <Title
                        style={{fontSize: 24,color:'#010101'}}>{this.props.category_name_toolbar}</Title>
                </Body>
                <Body style={{flex: 3, justifyContent: 'center', alignItems: 'center'}}>
                    <Title style={{color:'#010101'}}> онлайн:{this.props.count}</Title>

                </Body>
                <Badge primary style={{backgroundColor: '#50d36e', width: 8,height:10, marginTop: 10,}}>

                </Badge>
                {this.check_permission_admin()}
            </Header>


        );
    }
}
