import React from 'react';
import {
    Image,
    Text,
    View,
    BackHandler,
    ImageBackground,
    Alert, TouchableOpacity,
} from 'react-native';
import fetch_users_in_room from '../actions/fetch_users_in_room'
import request_DELETE_USER_ROOM from '../actions/fetch_delete_user'
import request_SEND_MESSAGES from '../actions/fetch_send_message'
import request_GET_MESSAGES from '../actions/fetch_get_messages'
import request_ENTRY_USER_ROOM from '../actions/fetch_entry_user'
import request_GET_PROFILE from '../actions/fetch_profile_info'
import request_GET_GIFTS from '../actions/fetch_user_gifts'
import request_GET_PRIVATE_LIST from '../actions/fetch_private_list'
import menusmiles from './const/smiles'
import menuitem from './const/menu'
import styles from '../styles'
import Rooms_list from './const/Room_List'
import Rooms_banned from './const/Room_list_banned'
import {address} from "../config_connect";
import request_GET_PRIVATE_ROOM from "../actions/fetch_create_private";
import request_GET_MESSAGES_PRIVATE from "../actions/fetch_private_message";
import {Toolbar_Chatting} from "./Toolbar_Chatting";
import {Flatlist_Chatting_Messaging} from "./Flatlist_Chatting_Messaging";
import {Modal_Chatting_ListUsers_Flatlist} from "./Modal_Chatting_ListUsers_Flatlist";
import {Modal_Chatting_Action_Flatlist} from "./Modal_Chatting_Action_Flatlist";
import {TextInput_Chatting} from "./TextInput_Chatting";

const list = ['Ответить', 'Написать Личное', 'Профиль'];

export default class Chatting extends React.Component {


    constructor(props) {
        super(props);


        this.state = {
            color: [],
            users: [],
            item_menu: menuitem,
            item_smiles: menusmiles,
            rooms_Unbanned: Rooms_list,
            rooms_Banned: Rooms_banned,
            text: '',
            ban: '',
            action_nick: list,
            user_now: '',
            msg: '',
            isVisible: false,
            isVisibleList: false,


        };

        this.Change_Visible_List = this.Change_Visible_List.bind(this)


    }

    add_text = (text) => {


        this.setState({text: text})


    };


    Change_Visible_List() {

        this.setState({isVisibleList: !this.state.isVisibleList});


    }

    Change_Visible_Action = () => {


        this.setState({isVisible: !this.state.isVisible});


    };


    Action_Nick = (user) => {


        this.setState({user_now: user, isVisibleList: false, isVisible: !this.state.isVisible});


    };


    Action_nick_selected = async (position) => {


        if (position === 'Ответить') {

            this.setState({isVisible: !this.state.isVisible, text: this.state.user_now + ', '});


        }
        if (position === 'Написать Личное') {

            this.setState({isVisible: !this.state.isVisible});
            const get_private = await request_GET_PRIVATE_ROOM(this.props.nic, this.state.user_now);
            const get_private_data = await request_GET_MESSAGES_PRIVATE(get_private);


            const {router} = this.props;
            router.push.Private({
                profile_user: this.state.user_now,
                room: this.props.room,
                nic: this.props.nic,
                chat_name: this.props.chat_name,
                private_room: get_private,
                private_chatter: this.state.user_now,
                private_data: get_private_data,


            });


        }

        if (position === 'Профиль') {

            this.setState({isVisible: !this.state.isVisible});
            const profile_info = await request_GET_PROFILE(this.state.user_now);
            const gifts = await request_GET_GIFTS(this.state.user_now);


            const {router} = this.props;
            router.push.Profile({
                profile_user: this.state.user_now,
                room: this.props.room,
                nic: this.props.nic,
                user_data: profile_info,
                chat_name: this.props.chat_name,
                gift: gifts,


            });

        }


    };


    ban_msg = () => {

        const ban = address + `/banned/room/${this.props.nic}`;

        return fetch(ban)
            .then((response) => response.json())
            .then(async (responseJson) => {


                this.setState({ban: responseJson['user']});

                if (this.state.ban === 'banned') {


                    let check = this.props.room;



                    if (check === 'Тюрьма') {

                        console.log('ok');
                    } else {

                        const {router} = this.props;


                        Alert.alert('Вы были забанены на неопределенный срок');
                        router.push.Rooms({name: this.props.nic, room: 'Тюрьма', roomlist: this.state.rooms_Banned});

                        await request_ENTRY_USER_ROOM(this.props.nic, this.props.room);
                        console.log('prison' + this.props.room)

                    }

                } else if ((this.state.ban === 'unbanned' && this.props.room === 'Тюрьма')) {

                    Alert.alert('Cрок закончился!');
                    const {router} = this.props;
                    router.pop({name: this.props.nic, room: 'Тюрьма', item_menu: this.props.item_menu});

                    console.log('go')

                } else {

                    console.log('go')

                }
            })
            .catch((error) => {
                console.error(error);
            });

    };


    update_msg = async () => {

        const message = await request_GET_MESSAGES(this.props.room);
        this.setState({
                dataSource: message,


            }
        );


    };

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
        clearInterval(this.interval);
        console.log('i am unmount chatting')
    }

    componentDidMount = () => {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);


        this.interval = setInterval(() => this.update_msg(), 2000);


    };


    handleBackButton = () => {


        return true

    };

    onActionSelected = async (position) => {

        if (position === 0) {

            const get_list = await request_GET_PRIVATE_LIST(this.props.nic);

            const {router} = this.props;
            await router.push.Private_List({
                profile_user: this.state.user_now,
                room: this.props.room,
                nic: this.props.nic,
                chat_name: this.props.chat_name,
                private_user_list: get_list,


            });


        }

        if (position === 1) {
            console.log("I am in 0");


            const usr_list_vw = await fetch_users_in_room(this.props.room);

            this.setState({isVisibleList: !this.state.isVisibleList, users: usr_list_vw})


        }



        if (position === 2) {


            await this.ban_msg();
            this.Del_user_change();
            this.componentWillUnmount()


        }


        if (position === 3) {

            const profile_info = await request_GET_PROFILE(this.props.chat_name);
            const {router} = this.props;
            await router.push.Profile_redactor({

                room: this.props.room,
                nic: this.props.nic,
                chat_name: this.props.chat_name,
                user_data: profile_info
            });








        }
        if (position === 4) {


            Alert.alert('Данный раздел в разработке')


        }


        if (position === 5) {


            const {router} = this.props;

            router.push.Login();
            this.Del_user_change();
            this.componentWillUnmount()


        }

    };


    Del_user_change = () => {


        request_DELETE_USER_ROOM(this.props.room, this.props.nic);
        let nw = this.props.room;
        if (nw === 'Тюрьма') {
            const {router} = this.props;

            router.pop({name: this.props.nic, item_menu: this.state.rooms_Banned,});

        } else {
            const {router} = this.props;
            router.pop({name: this.props.nic, roomlist: this.props.item_menu, item_menu: this.props.roomlist});

        }


    };

    send_msg = async (messages) => {

        await this.ban_msg();
        if (this.state.text !== '' || this.state.smiles !== '') {
            this.setState({
                isLoading: false,
                text: messages,


            });

            await request_SEND_MESSAGES(this.props.nic, messages, this.props.room);
            console.log('my nicK' + this.props.nic);


            this.setState({
                isLoading: false,
                text: '',


            });

            await this.update_msg()

        } else {

            Alert.alert('Сообщение не может быть пустым!');

            return this.componentDidMount()
        }


        /*    .catch(error => this.setState({error}));*/
    };

    _renderItem = ({item}) => {


        let name = item.message.startsWith(this.props.chat_name + ',');
        let server = item.user;
        let attch = item.attachments;

        if (name === true) {


            return (

                <TouchableOpacity onPress={() => this.Action_Nick(item.user)}>


                    <View style={{flex: 1, flexDirection: 'row', backgroundColor: '#efefef'}}>


                        <Image source={{uri: item.avatars}} style={styles.imageView}/>

                        <Text style={[styles.prices, {color: item._class}]}

                        >
                            {item.user}:

                            <Text style={[styles.symbols, {color: item._class}]}
                            >
                                {item.message}


                            </Text>

                        </Text>


                    </View>

                </TouchableOpacity>


            )


        } else if (server === '') {


            return (

                <TouchableOpacity onPress={() => this.Action_Nick(item.user)}>


                    <View style={{flex: 1, flexDirection: 'row', backgroundColor: 'rgba(215,215,215,0.7)'}}>


                        <Text style={[styles.prices, {color: '#010101'}]}

                        >
                            {item.user}:

                            <Text style={[styles.symbols, {color: '#010101'}]}
                            >
                                {item.message}


                            </Text>

                        </Text>


                    </View>

                </TouchableOpacity>


            )


        } else if (attch.length > 5) {


            return (


                <View style={{flex: 1, flexDirection: 'row'}}>
                    <Image source={{uri: item.avatars}} style={styles.imageView}/>
                    <Text style={[styles.prices2, {color: item._class}]}

                    >
                        {item.user}:

                        <Text style={[styles.prices2, {color: item._class}]}
                        >
                            {item.message}


                        </Text>

                    </Text>


                    <Image source={{uri: item.attachments}} style={styles.imageAttach}/>


                </View>


            )
        } else if (item.message.startsWith('\b\tзашел') || (item.message.startsWith('\b\tвышел') || (item.message.startsWith('\b\tзашла') || (item.message.startsWith('\b\tвышла') === true)))) {


            return (


                <TouchableOpacity onPress={() => this.Action_Nick(item.user)}>


                    <View style={{flex: 1, flexDirection: 'row'}}>


                        <Text style={[styles.prices, {color: item._class}]}

                        >
                            {item.user}

                            <Text style={[styles.symbols, {color: item._class}]}
                            >
                                {item.message}


                            </Text>

                        </Text>


                    </View>

                </TouchableOpacity>


            )

        } else if ((item.avatars.slice(-1,).startsWith('g') === true) || (item.avatars.slice(-1,).startsWith('/')) === true) {


            return (


                <TouchableOpacity onPress={() => this.Action_Nick(item.user)}>


                    <View style={{flex: 1, flexDirection: 'row'}}>


                        <Text style={[styles.prices, {color: item._class}]}

                        >
                            {item.user}:

                            <Text style={[styles.symbols, {color: item._class}]}
                            >
                                {item.message}


                            </Text>

                        </Text>


                    </View>

                </TouchableOpacity>


            )

        } else {

            return (


                <TouchableOpacity onPress={() => this.Action_Nick(item.user)}>


                    <View style={{flex: 1, flexDirection: 'row'}}>


                        <Image source={{uri: item.avatars}} style={styles.imageView}/>

                        <Text style={[styles.prices, {color: item._class}]}

                        >
                            {item.user}:

                            <Text style={[styles.symbols, {color: item._class}]}
                            >
                                {item.message}


                            </Text>

                        </Text>


                    </View>

                </TouchableOpacity>


            )


        }


    };


    render() {


        return (

            <View style={styles.container}

            >
                <ImageBackground source={require('./Image/newfon.jpg')} style={{width: '100%', height: '100%'}}>

                    <Toolbar_Chatting select={this.onActionSelected.bind(this)}


                                      users={this.state.users}
                                      item_menu={this.state.item_menu}

                                      room={this.props.room}
                    />

                    <Flatlist_Chatting_Messaging

                        dataSource={this.state.dataSource}
                        render={this._renderItem}
                    />


                    <Modal_Chatting_ListUsers_Flatlist


                        users={this.state.users}
                        isVisibleList={this.state.isVisibleList}
                        Change_Visible_List={this.Change_Visible_List}
                        action_nick={this.Action_Nick}


                    />

                    <Modal_Chatting_Action_Flatlist

                        visible={this.Change_Visible_Action}
                        action_selected={this.Action_nick_selected}
                        isVisible={this.state.isVisible}
                        user_now={this.state.user_now}
                        action_nick={this.state.action_nick}


                    />


                    <TextInput_Chatting
                        add_text={this.add_text}
                        send_msg={this.send_msg}
                        text={this.state.text}

                    />

                </ImageBackground>


            </View>

        );


    }
}
