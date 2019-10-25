import React from 'react';
import {

    View,
    BackHandler,
    ImageBackground,
    Alert,
    Keyboard, ActivityIndicator,
} from 'react-native';

import menu_moderator from '../const/menu_moderator'
import list_moder from '../const/list_moder'
import list_user from '../const/list_user'
import menusmiles from '../const/smiles'
import menuitem from '../const/menu'
import styles from '../../styles'
import Rooms_list from '../const/Room_List'
import Rooms_banned from '../const/Room_list_banned'
import {Pattern_message1} from "./pattern_message1";
import {Toolbar_Chatting} from "./Toolbar_Chatting";
import {Flatlist_Chatting_Messaging} from "./Flatlist_Chatting_Messaging";
import {Modal_Chatting_ListUsers_Flatlist} from "./Modal_Chatting_ListUsers_Flatlist";
import {Modal_Chatting_Action_Flatlist} from "./Modal_Chatting_Action_Flatlist";
import {TextInput_Chatting} from "./TextInput_Chatting";
import request_GET_PRIVATE_ROOM from "../../actions/fetch_create_private";
import request_GET_MESSAGES_PRIVATE from "../../actions/fetch_private_message";
import request_GET_PROFILE from "../../actions/fetch_profile_info";
import request_GET_GIFTS from "../../actions/fetch_user_gifts";
import request_GET_MESSAGES from "../../actions/fetch_get_messages";
import request_GET_PRIVATE_LIST from "../../actions/fetch_private_list";
import fetch_users_in_room from "../../actions/fetch_users_in_room";
import request_DELETE_USER_ROOM from "../../actions/fetch_delete_user";
import request_SEND_MESSAGES from "../../actions/fetch_send_message";
import {Pattern_message2} from "./pattern_message2";
import {Pattern_message3} from "./pattern_message3";
import {Pattern_message4} from "./pattern_message4";
import {Pattern_message5} from "./pattern_message5";
import {Pattern_message6} from "./pattern_message6";
import {Alert_Action} from "../Alert_Action";
import request_SEND_BANNED_ACTION from "../../actions/fetch_banned_action_moderator";
import ImagePicker from "react-native-image-picker";
import SEND_PHOTO_request from "../../actions/fetch_upload_image";
import {Attachments_preview} from "./Attachments_preview";
import {Flatlist_smiles_chatting} from "./Flatlist_smiles_chatting";
import fetch_REQUEST_BANNED_LIST from "../../actions/fetch_banned_list";
import fetch_REQUEST_MODERATOR_LIST from "../../actions/fetch_moderators_list";
import fetch_REQUEST_INVISIBLE_LIST from "../../actions/fetch_invisible_list";
import request_GET_USER_PHOTO from "../../actions/fetch_get_photo_user";
const TYPE_ADMIN = 2;
const TYPE_MODERATOR = 4;
const CHAT_UPDATE = 3000;

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
            action_nick: list_user,
            user_now: '',
            msg: '',
            type: null,
            isVisible: false,
            isVisibleList: false,
            showAlert: false,
            animating: true,
            photo_attachments: false,
            attachments: 'Not', // Not для back-a
            modal_indicator: false,
            user_id: '',
            ShowSmiles: false,


        };


    }

    add_text = async (text) => { // add text to textinput

        console.log(text);
        await this.setState({text: text});
        console.log(this.state.text + 'textttt');
    };

    add_emoji = async (emoji) => {              //add emoji to text
        await await this.setState({text: this.state.text + emoji});
    };


    Change_Visible_List = async () => {
        await this.setState({isVisibleList: !this.state.isVisibleList});
    };

    Change_Visible_Action = async () => {
        await this.setState({isVisible: !this.state.isVisible});
    };

    View_full_photo = async (attach) => { //# переход на страницу просмотра фото целиком передаем туда attach с телефона
        const {router} = this.props;
        await router.push.PHOTO_VIEWER({

            photo_attachments: attach,
        });
    };

    Action_Nick = async (user, user_id) => { ///Окно что сделать с чаттером передается его ник и его mongoID
        await this.setState({user_now: user, isVisibleList: false, isVisible: !this.state.isVisible, user_id: user_id});//user_now=ник чаттера, флаги на модалки visible,user_id=его монго id
    };


    Action_nick_selected = async (position) => {

        const {router} = this.props;

        switch (position) {

            case 'Напугать':

                await this.Change_Visible_Action();
                await request_SEND_BANNED_ACTION(0, this.state.user_id, this.props.nic);
                break;

            case 'Добавить в друзья':

                Alert.alert('Раздел недоступен');
                await this.Change_Visible_Action();
                break;

            case 'Бан 5 минут':

                await this.Change_Visible_Action();
                await request_SEND_BANNED_ACTION(0.088, this.state.user_id, this.props.nic);
                break;

            case 'Бан 15 минут' :

                await this.Change_Visible_Action();
                await request_SEND_BANNED_ACTION(0.25, this.state.user_id, this.props.nic);
                break;

            case 'Бан 60 минут':

                await this.Change_Visible_Action();
                await request_SEND_BANNED_ACTION(1, this.state.user_id, this.props.nic);
                break;

            case 'Бан 120 минут':

                await this.Change_Visible_Action();
                await request_SEND_BANNED_ACTION(2, this.state.user_id, this.props.nic);
                break;

            case 'Ответить':
                this.setState({isVisible: !this.state.isVisible, text: this.state.user_now + ', '});
                break;

            case 'Написать Личное':

                await this.Change_Visible_Action();
                const get_private = await request_GET_PRIVATE_ROOM(this.props.nic, this.state.user_now);
                const get_private_data = await request_GET_MESSAGES_PRIVATE(get_private);

                router.push.Private({
                    profile_user: this.state.user_now,
                    room: this.props.room,
                    nic: this.props.nic,
                    chat_name: this.props.chat_name,
                    private_room: get_private,
                    private_chatter: this.state.user_now,
                    private_data: get_private_data,
                });

                break;

            case 'Профиль':
                await this.Change_Visible_Action();
                const profile_info = await request_GET_PROFILE(this.state.user_id);
                const gifts = await request_GET_GIFTS(this.state.user_id);
                const photos_list = await request_GET_USER_PHOTO(this.state.user_id);

                router.push.Profile({
                    user_data: profile_info,
                    chat_name: this.props.chat_name,
                    gift: gifts,
                    photos_list:photos_list
                });



        }


    };

    update_msg = async () => {


        const message = await request_GET_MESSAGES(this.props.room); //обновляем сообщения повешен интервал 3 секунды в ComponentDIDmount setInterval
        this.setState({
                dataSource: message,

            }
        );

        if (this.state.animating) {    //индикатор при первом заходе в комнату

            await this.setState({animating: !this.state.animating});
            this.componentWillUnmount();
            this.componentDidMount();
        }


    };

    componentWillUnmount() { //анмаунт из памяти
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
        clearInterval(this.interval);
        console.log('i am unmount chatting');

    }

    componentDidMount = () => {
        if (this.props.type_user === TYPE_ADMIN || this.props.type_user === TYPE_MODERATOR) { //проверяем тип пользователя если админ или мд открыть меню суперпользователя

            this.setState({action_nick: list_moder, item_menu: menu_moderator})

        }

        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);


        this.interval = setInterval(() => this.update_msg(), CHAT_UPDATE);


    };

    Modal_Activity = () => { // кидаем компонент индикатора во флетлист при первом заходе

        if (this.state.modal_indicator) {

            return (


                <ActivityIndicator
                    size='large'
                    animating={this.state.modal_indicator}/>


            )
        }

    };


    handleBackButton = () => {


        return true

    };

    onActionSelected = async (position) => { //меню чата , передаем позицию item из массива с меню
        const {router} = this.props;
        switch (position) {


            case 0: // личные сообшения
                if (!this.state.animating) {

                    this.setState({animating: !this.state.animating});
                    this.componentWillUnmount();
                    this.componentDidMount();
                }


                const get_list = await request_GET_PRIVATE_LIST(this.props.nic);


                router.push.Private_List({
                    profile_user: this.state.user_now,
                    room: this.props.room,
                    nic: this.props.nic,
                    chat_name: this.props.chat_name,
                    private_user_list: get_list,
                    select: this.onActionSelected.bind(this),
                    mount: this.componentDidMount


                });
                this.componentWillUnmount();
                this.setState({animating: !this.state.animating});
                break;


            case 1:
                const usr_list_vw = await fetch_users_in_room(this.props.room); //пользователи в комнате
                this.setState({isVisibleList: !this.state.isVisibleList, users: usr_list_vw});
                break;


            case 2: //сменить комнату


                await this.Del_user_change();
                await this.componentWillUnmount();
                break;


            case 3: //профиль


                const profile_info = await request_GET_PROFILE(this.props.nic);
                const a = profile_info.data;

                for (let i = 0; i < a.length; i++) {
                    let obj = a[i];

                    this.setState({
                        firstName: obj.firstName,
                        lastName: obj.lastName,
                        city: obj.city,
                        about: obj.about,
                        color: obj.color,
                        photo: obj.photo,
                        sex: obj.sex,
                        balace: obj.balace,
                        bday:obj.bday,

                    });
                }

                router.push.Profile_redactor({

                    room: this.props.room,
                    nic: this.props.nic,
                    chat_name: this.props.chat_name,
                    user_data: profile_info,
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    city: this.state.city,
                    about: this.state.about,
                    color: this.state.color,
                    photo: this.state.photo,
                    sex: this.state.sex,
                    bday:this.state.bday,
                });
                break;


            case  4: //чат портал

                const profile = await request_GET_PROFILE(this.props.nic);
                const b = profile.data;

                for (let i = 0; i < b.length; i++) {
                    let obj = b[i];

                    this.setState({
                        balace: obj.balace,

                    });

                }
                router.push.ChatPortal({

                    room: this.props.room,
                    nic: this.props.nic,
                    chat_name: this.props.chat_name,
                    balance_card: this.state.balace


                });

                break;


            case 5: //выход


                router.push.Login();
                await this.Del_user_change();
                this.componentWillUnmount();
                break;


            case 6: // прикрепить изображение


                await this.handleChoosePhoto(); //
                break;


            case 7: //админ меню

                const usr_banned_list = await fetch_REQUEST_BANNED_LIST();
                const usr_moderator_list = await fetch_REQUEST_MODERATOR_LIST();
                const usr_invisible_list = await fetch_REQUEST_INVISIBLE_LIST();


                router.push.NavigationAdmin({
                    banned_list: usr_banned_list,
                    moderator_list: usr_moderator_list,
                    invisible_list: usr_invisible_list,
                    type_user: this.props.type_user
                });
                break;


        }


    };

    handleChoosePhoto = () => { //выбираем фото из памяти телефона
        const options = {
            noData: true,
        };
        ImagePicker.launchImageLibrary(options, response => {
            if (response.uri) {
                this.setState({photo_attachments: response});
                Alert.alert("фото успешно загружено!", "\nЖмите кнопку отправить");

                this.componentWillUnmount();

                this.componentDidMount()


            }


        });


    };

    close_attach = () => {        //закрыть превью attachmentsa

        this.setState({photo_attachments: false,})

    };

    view = () => {

        if (this.state.photo_attachments) {

            return (
                <Attachments_preview
                    photo={this.state.photo_attachments}
                    close_attach={this.close_attach}

                />
            )
        }
    };

    ListSmileAction = () => {    //вызываем смайлы


        if (this.state.ShowSmiles) {
            Keyboard.dismiss();

            return (


                <Flatlist_smiles_chatting

                    add_emoji={this.add_emoji}


                />


            )


        }


    };


    ShowSmiles = () => { // логика отображения смайлов true/false


        this.setState({


            ShowSmiles: !this.state.ShowSmiles
        });

    };


    send_photo = async () => {  //отправляем фото в mongoDb
        this.setState({modal_indicator: true});
        const attach = await SEND_PHOTO_request(this.state.photo_attachments);
        this.setState({attachments: attach});
        this.setState({modal_indicator: false});


    };

    showAlert = () => {

        this.setState({
            showAlert: true
        });
    };

    showPrivate = async () => {
        const get_private_data = await request_GET_MESSAGES_PRIVATE(get_private);
        const {router} = this.props;
        router.push.Private({
            profile_user: this.state.user_now,
            room: this.props.room,
            nic: this.props.nic,
            chat_name: this.props.chat_name,
            private_room: this.state.chatid,
            private_chatter: this.state.user_now,
            private_data: get_private_data,


        });

        this.setState({
            showAlert: false
        });


    };

    hideAlert = () => {
        this.setState({
            showAlert: false
        });
    };


    Del_user_change = async () => {


        await request_DELETE_USER_ROOM(this.props.room, this.props.nic);
        let nw = this.props.room;
        if (nw === 'Тюрьма') {
            const {router} = this.props;

            router.pop({name: this.props.nic, item_menu: this.state.rooms_Banned,});

        } else {
            const {router} = this.props;
            await router.pop({name: this.props.nic, roomlist: this.props.item_menu, item_menu: this.props.roomlist});

        }


    };

    send_msg = async () => {

        if (this.state.photo_attachments) {

            await Keyboard.dismiss();
            await this.send_photo();
            await request_SEND_MESSAGES(this.props.nic, 'Вложения', this.props.room, this.state.attachments);
            await this.setState({
                text: '', attachments: 'Not', photo_attachments: false
            });

            await this.update_msg();
        }

        else {
            await Keyboard.dismiss();
            await request_SEND_MESSAGES(this.props.nic, this.state.text, this.props.room, this.state.attachments);
            await this.setState({
                text: '',
            });
            await this.update_msg();

        }
    };


    _renderItem = ({item}) => { //render листа с чат сообщениями
        let name = item.message.startsWith(this.props.chat_name + ','); //если начало сообщения начинается с вашего ника(для проверки)
        let server = item.user; //имя пользователя
        let attch = item.attachments;//аттач
        let _class = item._class;//цвет ника и сообщения
        let avatars = item.avatars;//аватарка
        let message = item.message; //сообшение
        let user_id = item.user_id; //id пользователя
        if (name) {


            return (
                <Pattern_message1

                    Action_Nick={this.Action_Nick}
                    user={server}
                    _class={_class}
                    avatars={avatars}
                    message={message}
                    user_id={user_id}
                />
            )
        } else if (server === '') {

            return (
                <Pattern_message2

                    Action_Nick={this.Action_Nick}
                    user={server}
                    message={message}


                />
            )

        } else if (attch.length > 5) {
            return (
                <Pattern_message3


                    _class={_class}
                    avatars={avatars}
                    message={message}
                    attachments={attch}
                    view_attach={this.View_full_photo}
                    user={server}
                />
            )
        } else if (item.message.startsWith('\b\tзашел') || (item.message.startsWith('\b\tвышел') || (item.message.startsWith('\b\tзашла') || (item.message.startsWith('\b\tвышла') === true)))) {
            return (

                <Pattern_message4

                    Action_Nick={this.Action_Nick}
                    user={server}
                    _class={_class}
                    message={message}


                />


            )

        } else if ((item.avatars.slice(-1,).startsWith('g') === true) || (item.avatars.slice(-1,).startsWith('/')) === true) {


            return (


                <Pattern_message5
                    user_id={user_id}
                    Action_Nick={this.Action_Nick}
                    user={server}
                    _class={_class}
                    message={message}


                />


            )

        } else {

            return (


                <Pattern_message6
                    user_id={user_id}
                    Action_Nick={this.Action_Nick}
                    user={server}
                    _class={_class}
                    avatars={avatars}
                    message={message}


                />


            )


        }


    };


    render() {


        if (this.state.animating) {

            return (

                <ImageBackground source={require('../Image/whatsap.png')}
                                 style={{width: '100%', height: '100%'}}>

                    <Toolbar_Chatting select={this.onActionSelected.bind(this)}


                                      users={this.state.users}
                                      item_menu={this.state.item_menu}

                                      room={this.props.room}
                    />


                    <ActivityIndicator size="large" color="#3E8CB4"
                                       animating={this.state.animating}/>
                </ImageBackground>)
        }


        return (

            <View style={styles.container}

            >


                <ImageBackground source={require('../Image/whatsap.png')}
                                 style={{width: '100%', height: '100%'}}>

                    <Toolbar_Chatting select={this.onActionSelected.bind(this)}


                                      users={this.state.users}
                                      item_menu={this.state.item_menu}

                                      room={this.props.room}
                    />

                    {this.Modal_Activity()}
                    <Flatlist_Chatting_Messaging

                        dataSource={this.state.dataSource}
                        render={this._renderItem}

                    />

                    {this.view()}
                    <Alert_Action
                        showAlert={this.state.showAlert}
                        hideAlert={this.hideAlert}
                        showPrivate={this.showPrivate}


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
                        show={this.ShowSmiles}
                        add_text={this.add_text}
                        send_msg={this.send_msg}
                        text={this.state.text}
                        active={this.state.ShowSmiles}


                    />
                    {this.ListSmileAction()}
                </ImageBackground>


            </View>

        );


    }
}

