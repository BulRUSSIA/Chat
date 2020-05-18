import React from 'react';

import {
    Container,
    Header,
    Content,
    Card,
    Body,
    Title,
    Left,

} from 'native-base';
import Icon from "react-native-vector-icons/AntDesign";

import {ImageBackground, View, ActivityIndicator, TouchableNativeFeedback} from 'react-native'
import CardsBalance from "./CardsBalance";
import CardsWedding from "./CardsWedding";
import CardsService from "./CardsService";
import request_ACCEPT_ZAGS_REQUEST from "../../actions/fetch_accept_zags_request";
import {Alert} from "react-native";
import request_DECLINE_ZAGS_REQUEST from "../../actions/fetch_decline_zags_request";
import request_DELETE_ZAGS_REQUEST from "../../actions/fetch_zags_delete";
import SingleTonUpdatePortal from "./utils/SingleTonUpdatePortal";
import request_GET_WeddingList from "../../actions/fetch_wedding_list";
import ScreenWeddings from "./ScreenWeddings";
import Modal_running_line from "./Modal_running_line";
import request_START_LINE from "./fetch_run_line_start";
import check_avatar from "./network/check_send_avatar";
import ParseResponseAvatar from "./utils/ParseResponseAvatar";
import consent_avatar from "./network/consent_avatar";
import CardsFriends from "./CardsFriends";
import friend_req_list from "./network/friend_req_list";
import {ModalFriendsRequest} from "./ModalFriendsRequest";
import consent_friend from "./network/consent_friend";
import {ModalFriendsList} from "./ModalFriendsList";
import delete_friend from "./network/friend_delete";
import get_friends_list from "./network/friends_list";


export default class ChatPortal extends React.Component {


    constructor(props) {
        super(props);


        this.state = {

            zags: '1',
            zagsName: 'Server',
            zagsRequest: '1',
            zagsRequestName: 'Server',
            balace: '0',
            wedding_list: [],
            isVisible: false,
            run_line_text: '',
            loaded: true,
            avatar_request:[],
            consent_avatar:false,
            consent_friend:false,
            friends_req_list:[],
            friends_list:[],
            isVisibleList:false,
            isVisibleFriend:false,

        };


    }

    componentDidMount = async () => {

        await this.Update_Portal()


    };

    visible_friends_req_list = ()=> {

        this.setState({isVisibleList:!this.state.isVisibleList})

    };
    visible_friends_list = ()=> {

        this.setState({isVisibleFriend:!this.state.isVisibleFriend})

    };
    avatar_choice = async (avatar,sender) => {


        Alert.alert(
            'Аватар',
            'Вы уверены,что хотите принять аватар?(Аватар будет присвоен после согласия)', // <- this part is optional, you can pass an empty string
            [

                {
                    text: 'принять',
                    onPress: async () => {

                       this.setState({consent:true,avatar_request:false});
                       await consent_avatar(this.props.nic,this.state.consent,avatar,sender)

                    } ,
                    style: 'cancel',
                },
                {
                    text: 'отклонить',
                    onPress: async () => {
                        this.setState({consent:false,avatar_request:false});
                        await consent_avatar(this.props.nic,this.state.consent,avatar,sender)
                    },
                    style: 'cancel',
                }
            ],
            {cancelable: false},
        );


    };



    Update_Portal = async () => {
        const data_user = await SingleTonUpdatePortal.PortalUpdates(this.props.nic);
        const wedding_list = await request_GET_WeddingList();
        const avatar_request = await check_avatar(this.props.nic);
        const friends_req =  await friend_req_list(this.props.nic);
        const friends_list = await get_friends_list(this.props.nic);
        const avatar_parse = await ParseResponseAvatar.parse_avatar_send(avatar_request);
        this.setState({

            zags: data_user[0],
            friends_req_list:friends_req,
            zagsName: data_user[1],
            zagsRequest: data_user[2],
            zagsRequestName: data_user[3],
            balace: data_user[4],
            avatar_request:avatar_parse,
            wedding_list: wedding_list,
            friends_list:friends_list,
            loaded: false,


        })


    };


    GetAvatarList = async () => {


        const {navigator} = this.props;
        navigator.push('ScreenAvatarList', {


            user_id: this.props.nic,
            updater: this.Update_Portal

        }, {type: 'fade', duration: 150, easing: 'ease'});


    };


    Go_Profile = async (user_id, username) => {


        await this.props.Change_User_id(user_id, username);
        const {navigator} = this.props;
        navigator.push('Profile', {

            go_private: this.props.go_private_from_portal,
            user_id: user_id,
            from_id: this.props.nic,


        }, {type: 'fade', duration: 100, easing: 'ease'})
    };

    All_Weddings = () => {

        const {navigator} = this.props;
        console.log('push weddings');

        navigator.push('ScreenWeddings', {
            wedding_list: this.state.wedding_list,
            Profile_screen: this.Go_Profile
        })

    };


    fetch_zags = async (zags_from) => {
        console.log('request zags is 5done1!');


        await request_ACCEPT_ZAGS_REQUEST(zags_from, this.props.nic);
        await this.Update_Portal()

    };

    select_modal_run_line = async () => {

        this.setState({isVisible: !this.state.isVisible})

    };

    start_line = async () => {
        await request_START_LINE(this.state.run_line_text);
        await this.setState({isVisible: !this.state.isVisible});
        const {navigator} = this.props;
        navigator.pop()


    };

    add_run_line_text = (text) => {

        this.setState({run_line_text: text})

    };


    fetch_zags_decline = async (zags_from) => {
        console.log('request zags decline is done!');


        await request_DECLINE_ZAGS_REQUEST(zags_from, this.props.nic);
        await this.Update_Portal()

    };

    fetch_zags_delete = async (zags_from) => {
        console.log('request zags decline is done!');


        await request_DELETE_ZAGS_REQUEST(zags_from, this.props.nic);
        await this.Update_Portal()


    };


    Delete_Zags = async (zags_from) => {

        Alert.alert(
            '' + this.state.zagsName,
            'Вы хотите удалить брак?',
            [

                {
                    text: 'нет',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },


                {
                    text: 'хочу', onPress: async () => {
                        await this.fetch_zags_delete(zags_from)
                    },


                }
            ],
            {cancelable: false},
        );


    };




    Accept_Zags_Req = async (zags_from) => {


        Alert.alert(
            '' + this.state.zagsRequestName,
            'Запрос на брак!', // <- this part is optional, you can pass an empty string
            [

                {
                    text: 'отмена',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {
                    text: 'отклонить',
                    onPress: async () => {
                        await this.fetch_zags_decline(zags_from)
                    },
                    style: 'cancel',
                },


                {
                    text: 'принять', onPress: async () => {
                        await this.fetch_zags(zags_from)
                    },


                }
            ],
            {cancelable: false},
        );


    };

    friends_action = async (nic,id) => {


        Alert.alert(

            ""+nic,
            "",// <- this part is optional, you can pass an empty string
            [

                {
                    text: 'дружить',
                    onPress: async () => {
                        this.setState({loaded:true});
                        await consent_friend(this.props.nic,!this.state.consent_friend,id);
                        await this.Update_Portal();
                        this.setState({loaded:false});
                    }
                },
                {
                    text: 'отклонить',
                    onPress: async () => {
                        this.setState({loaded:true});
                        await consent_friend(this.props.nic,this.state.consent_friend,id);
                        await this.Update_Portal();
                        this.setState({loaded:false});

                    },
                    style: 'cancel',
                },


                {
                    text: 'профиль', onPress: async () => {
                       await this.Go_Profile(id,nic);
                        this.setState({isVisibleList:!this.state.isVisibleList})
                    },


                }
            ],
            {cancelable: false},
        );


    };

    friends_action_list = async (nic,id) => {


        Alert.alert(

            ""+nic,
            "",// <- this part is optional, you can pass an empty string
            [
                {
                    text: 'профиль', onPress: async () => {
                        await this.Go_Profile(id,nic);
                        this.setState({isVisibleFriend:!this.state.isVisibleFriend})
                    },


                },

                {
                    text: 'удалить',
                    onPress: async () => {
                        this.setState({loaded:true});
                        await delete_friend(this.props.nic,id);
                        await this.Update_Portal();
                        this.setState({loaded:false});
                    }
                },



            ],
            {cancelable: false},
        );


    };
    render() {

        const {navigator} = this.props;

        if (this.state.loaded) {

            return (<View>

                    <Header style={{backgroundColor: 'rgba(212,212,212,0.96)',}}
                            androidStatusBarColor="#A9A9A9"

                    >
                        <TouchableNativeFeedback
                            background={TouchableNativeFeedback.Ripple('rgba(72,119,108,0.77)', true)}
                            onPress={() => navigator.pop(

                            )}>

                            <Left style={{flex: 1}}>


                                <Icon
                                    size={25}
                                    style={{color: 'black'}}
                                    name="arrowleft"/>

                            </Left>
                        </TouchableNativeFeedback>

                        <Body style={{flex: 2}}>
                            <Title style={{color: 'black'}}>Чат портал</Title>
                        </Body>
                    </Header>

                    <ActivityIndicator
                        size="large"
                        color="#254C6B"

                    />
                </View>


            )

        }
        return (
            <Container>
                <Header style={{backgroundColor: 'rgba(212,212,212,0.96)',}}
                        androidStatusBarColor="#A9A9A9"

                >
                    <TouchableNativeFeedback
                        background={TouchableNativeFeedback.Ripple('rgba(72,119,108,0.77)', true)}
                        onPress={() => navigator.pop(

                        )}>

                        <Left style={{flex: 1}}>


                            <Icon
                                size={25}
                                style={{color: 'black'}}
                                name="arrowleft"/>

                        </Left>
                    </TouchableNativeFeedback>

                    <Body style={{flex: 2}}>
                        <Title style={{color: 'black'}}>Чат портал</Title>
                    </Body>
                </Header>
                <Content style={{backgroundColor: 'rgba(255,255,255,0)', flex: 7}}>


                    <Card>
                        <ImageBackground
                            style={{resizeMode: 'contain', height: '100%', width: '100%'}}
                            source={{uri: 'background_airwaychat'}}>
                            <CardsBalance
                                balance_card={this.state.balace}
                            />
                            <CardsWedding zags={this.state.zags}
                                          zagsName={this.state.zagsName}
                                          zagsRequest={this.state.zagsRequest}
                                          zagsRequestName={this.state.zagsRequestName}
                                          Accept_Zags_Req={this.Accept_Zags_Req}
                                          Delete_Zags={this.Delete_Zags}
                                          wedding_list={this.state.wedding_list}
                                          Profile_screen={this.Go_Profile}
                                          All_Weddings={this.All_Weddings}

                            />
                            <CardsService
                                GetAvatarList={this.GetAvatarList}
                                select_modal_run_line={this.select_modal_run_line}
                                avatar_request={this.state.avatar_request}
                                avatar_choice={this.avatar_choice}

                            />
                            <ModalFriendsRequest
                                friends_action={this.friends_action}
                                isVisibleList={this.state.isVisibleList}
                                users={this.state.friends_req_list}
                                visible_friends_list={this.visible_friends_req_list}

                            />
                            <ModalFriendsList
                                isVisibleFriend={this.state.isVisibleFriend}
                                friends_action_list={this.friends_action_list}
                                visible_friends_list={this.visible_friends_list}
                                users ={this.state.friends_list}
                            />
                            <CardsFriends
                                visible_friends_req_list={this.visible_friends_req_list}
                                visible_friends_list={this.visible_friends_list}
                            />
                            <Modal_running_line
                                select_modal_run_line={this.select_modal_run_line}
                                isVisible={this.state.isVisible}
                                add_run_line_text={this.add_run_line_text}
                                start_line={this.start_line}

                            />

                        </ImageBackground>
                    </Card>

                </Content>
            </Container>
        );
    }
}
