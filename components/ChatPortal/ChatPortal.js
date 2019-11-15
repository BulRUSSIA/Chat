import React from 'react';

import {
    Container,
    Header,
    Content,
    Card,

    Body,

    Title,
    Button,
    Icon,
    Left,

} from 'native-base';
import CardsBalance from "./CardsBalance";
import CardsWedding from "./CardsWedding";
import CardsService from "./CardsService";
import CardsGame from "./CardsGame";
import CardsAvtoritet from "./CardsAvtoritet";
import request_GET_AvatarList from "../../actions/fetch_Avatar_List";

export default class ChatPortal extends React.Component {


    GetAvatarList  = async ()=> {

        const avatars_list = await request_GET_AvatarList();
        const {router} = this.props;
        router.push.ScreenAvatarList({

            avatars_list:avatars_list,
            user_id:this.props.nic

        })






    };


    render() {

        const {router} = this.props;
        return (
            <Container>
                <Header  style={{backgroundColor: '#3c3e5a',}}
                         androidStatusBarColor="#3c3e5a"

>
                    <Left style={{flex: 1}}>
                        <Button transparent
                                onPress={() => router.pop({
                                    room: this.props.room,
                                    nic: this.props.nic,
                                    chat_name: this.props.chat_name,
                                })}>


                            <Icon
                                style={{color: 'white'}}
                                name="ios-arrow-back"/>
                        </Button>

                    </Left>
                    <Body style={{flex: 2}}>
                        <Title>Чат портал</Title>
                    </Body>
                </Header>
                <Content style={{backgroundColor: 'rgb(49,110,93)', flex: 7}}>

                    <Card>
                        <CardsBalance
                        balance_card={this.props.balance_card}
                        />
                        <CardsWedding/>
                        <CardsService
                            GetAvatarList={this.GetAvatarList}

                        />
                        <CardsAvtoritet/>
                        <CardsGame/>


                    </Card>


                </Content>
            </Container>
        );
    }
}