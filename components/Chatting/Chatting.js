import React from 'react';
import {

    View,
    BackHandler,
    ImageBackground,
    Alert,
    Keyboard, ActivityIndicator, Text, Dimensions, AsyncStorage, KeyboardAvoidingView
} from 'react-native';
import menu_moderator from '../const/menu_moderator'
import list_moder from '../const/list_moder'
import list_user from '../const/list_user'
import menusmiles from '../const/smiles'
import menuitem from '../const/menu'
import {Pattern_message1} from "./pattern_message1";
import {Toolbar_Chatting} from "./Toolbar_Chatting";
import Flatlist_Chatting_Messaging from "./Flatlist_Chatting_Messaging";
import {Modal_Chatting_ListUsers_Flatlist} from "./Modal_Chatting_ListUsers_Flatlist";
import {Modal_Chatting_Action_Flatlist} from "./Modal_Chatting_Action_Flatlist";
import {TextInput_Chatting} from "./TextInput_Chatting";
import request_GET_PRIVATE_ROOM from "../../actions/fetch_create_private";
import request_GET_PROFILE from "../../actions/fetch_profile_info";
import fetch_users_in_room from "../../actions/fetch_users_in_room";
import request_DELETE_USER_ROOM from "../../actions/fetch_delete_user";
import request_SEND_MESSAGES from "../../actions/fetch_send_message";
import {Pattern_message2} from "./pattern_message2";
import {Pattern_message3} from "./pattern_message3";
import {Pattern_message4} from "./pattern_message4";
import {Pattern_message5} from "./pattern_message5";
import {Pattern_message6} from "./pattern_message6";
import request_SEND_BANNED_ACTION from "../../actions/fetch_banned_action_moderator";
import ImagePicker from "react-native-image-picker";
import SEND_PHOTO_request from "../../actions/fetch_upload_image";
import {Attachments_preview} from "./Attachments_preview";
import {TYPE_MODERATOR, TYPE_ADMIN} from "../const/const type_user_chats";
import FastImage from "react-native-fast-image";
import request_GET_NOTICE from "../../actions/fetch_get_notice";
import NavigationApp from "./NavigationSmiles";
import firebase from "react-native-firebase";
import type {Notification, NotificationOpen} from 'react-native-firebase';
import AudioExample from "./AudioRecorder";
import SEND_AUDIO_request from "../../actions/fetch_upload_audio";
import request_GET_MESSAGES from "../../actions/fetch_get_messages";
import request_ADD_INVISIBLE from "../../actions/fetch_add_invisible";
import Toast from "react-native-whc-toast";


const {width, height} = Dimensions.get('window');

export default class Chatting extends React.Component {


    constructor(props) {
        super(props);


        this.state = {
            color: [],
            users: [],
            item_menu: menuitem,
            item_smiles: menusmiles,
            text: '',
            action_nick: list_user,
            user_now: '',
            type_user: null,
            isVisible: false,
            isVisibleList: false,
            // showAlert: false,
            animating: false,
            photo_attachments: false,
            attachments: [], // Not для ba ck-a
            modal_indicator: false,
            room_now: this.props.room,
            user_id: '',
            ShowSmiles: false,
            new_pm: false,
            size_av: 18,
            size_msg: 25,
            background_image: 'default_background',
            editable: true,
            name_attachments: '',
            audio_preview: false,
            update_msg_bool: true,
            extra_data_bool: false,
            data: {
                "_id": {"$oid": "5e1eb2cf0a975a5421793e21"},
                "message": 'Загружаю сообщения...',
                "type": 1,
                "place": this.props.room,
                "system": false,
                "createdAt": {"$date": new Date()},
                "user_id": this.props.nic,
                "user": this.props.chat_name,
                "key": "5e1eb2cf0a975a5421793e21",
                "_class": "#c60915",
                "readed": true,
                "user_type": 1,
                "attachments": [],
                "avatars": false,
                "hideNic": false
            }

        };


    }

    _retrieveData_Settings = async () => {
        try {


            const size_av = await AsyncStorage.getItem('size_avatar');
            const size_msg = await AsyncStorage.getItem('size_message');
            const background_image = await AsyncStorage.getItem('background_fon');

            // We have data!!
            this.setState({
                size_av: Number(size_av),
                size_msg: Number(size_msg),
                background_image: background_image,
            });


        } catch (error) {
            console.log('error -asyncstore', error)
        }
    };


    add_text = async (text) => { // add text to textinput


        await this.setState({text: text});


    };

    change_pm = async () => {
        this.setState({new_pm: !this.state.new_pm})

    };

    add_emoji = (emoji) => {              //add emoji to text
        this.setState({text: this.state.text + emoji});
    };


    Change_Visible_List = async () => {
        await this.setState({isVisibleList: !this.state.isVisibleList});
    };

    Change_Visible_Action = async () => {
        await this.setState({isVisible: !this.state.isVisible});
    };

    View_full_photo = async (attach) => { //# переход на страницу просмотра фото целиком передаем туда attach с телефона
        const {navigator} = this.props;
        await navigator.push('PHOTO_VIEWER', {

            photo_attachments: attach,
        });
    };

    listening_sound = async (attach) => { //# переход на страницу просмотра фото целиком передаем туда attach с телефона
        const {navigator} = this.props;
        console.log('auido file', attach);
        await navigator.push('PlayerScreen', {title: 'Аудио', filepath: attach});
    };

    Action_Nick = async (user, user_id) => { ///Окно что сделать с чаттером передается его ник и его mongoID
        await this.setState({user_now: user, isVisibleList: false, isVisible: !this.state.isVisible, user_id: user_id});//user_now=ник чаттера, флаги на модалки visible,user_id=его монго id
    };


    Action_nick_selected = async (position) => {

        const {navigator} = this.props;

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
                await request_SEND_BANNED_ACTION(0.089, this.state.user_id, this.props.nic);
                this.refs.toast.show('Пользователь забанен');
                break;

            case 'Бан 15 минут' :

                await this.Change_Visible_Action();
                await request_SEND_BANNED_ACTION(0.25, this.state.user_id, this.props.nic);
                this.refs.toast.show('Пользователь забанен');
                break;

            case 'Бан 60 минут':

                await this.Change_Visible_Action();
                await request_SEND_BANNED_ACTION(1, this.state.user_id, this.props.nic);
                this.refs.toast.show('Пользователь забанен');
                break;

            case 'Бан 120 минут':

                await this.Change_Visible_Action();
                await request_SEND_BANNED_ACTION(2, this.state.user_id, this.props.nic);
                this.refs.toast.show('Пользователь забанен');
                break;
            case 'Невидимка':

                await this.Change_Visible_Action();
                await request_ADD_INVISIBLE(this.state.user_id, this.props.nic);
                this.refs.toast.show('Невидимка установлена');

                break;
            case 'Ответить':
                this.setState({isVisible: !this.state.isVisible, text: this.state.user_now + ', '});
                break;

            case 'Написать Личное':
                this.setState({isVisible: false});
                const get_private = await request_GET_PRIVATE_ROOM(this.props.nic, this.state.user_id);
                const get_private_data = await request_GET_MESSAGES(this.props.nic, get_private);

                navigator.push('Private', {
                    profile_user: this.state.user_now,
                    room: this.props.room,
                    nic: this.props.nic,
                    chat_name: this.props.chat_name,
                    private_room: get_private,
                    private_chatter: this.state.user_now,
                    private_data: get_private_data,
                }, {animation: 'right'});

                break;

            case 'Профиль':

                await this.Change_Visible_Action();


                navigator.push('Profile', {

                    //   data_user:profile_info,
                    chat_name: this.props.chat_name,
                    user_id: this.state.user_id,
                    from_id: this.props.nic,
                    go_private: this.Action_nick_selected,
                }, {animation: 'right'});
        }


    };

    Change_User_id = (user_id, private_chatter) => {
        this.setState({user_id: user_id, user_now: private_chatter})

    };


    componentWillUnmount() {
        this.notificationDisplayedListener();
        this.notificationListener();
        this.notificationOpenedListener();

        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);


    };


    componentDidMount = async () => {


        await this._retrieveData_Settings();

        if (this.props.type_user === TYPE_ADMIN || this.props.type_user === TYPE_MODERATOR) {

            //проверяем тип пользователя если админ или мд открыть меню суперпользователя
            console.log(' i am admin  ');
            this.setState({action_nick: list_moder, item_menu: menu_moderator})

        }


        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
        this.notificationDisplayedListener = firebase.notifications().onNotificationDisplayed((notification) => {

        });

        this.notificationListener = firebase.notifications().onNotification((notification) => {
            const body = notification['body'];
            this.setState({new_pm: !this.state.new_pm});
        });

// App (in background) was opened by a notification
        this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {

            const action = notificationOpen.action;
            // Get information about the notification that was opened
            const notification = notificationOpen.notification;
            console.log('63' + notification)

        });

// App was opened by a notification
        const notificationOpen = await firebase.notifications().getInitialNotification();
        if (notificationOpen) {
            // Get the action triggered by the notification being opened
            const action = notificationOpen.action;
            // Get information about the notification that was opened
            const notification = notificationOpen.notification;
            console.log('45' + notification)
        }


    };


    handleBackButton = () => {


        return true

    };

    onActionSelected = async (position) => { //меню чата , передаем позицию item из массива с меню
        const {navigator} = this.props;
        switch (position) {


            case 0:
                this.setState({isVisibleList: !this.state.isVisibleList});
                const usr_list_vw = await fetch_users_in_room(this.props.room); //пользователи в комнате
                this.setState({users: usr_list_vw});
                break;


            case 1: //сменить комнату


                await this.Del_user_change();
                await this.componentWillUnmount();


                break;


            case 2: //профиль


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
                        bday: obj.bday,

                    });
                }

                navigator.push('Profile_Redactor_New', {

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
                    bday: this.state.bday,
                }, {animation: 'right'});
                break;


            case  3: //чат портал


                navigator.push('ChatPortal', {

                    room: this.props.room,
                    nic: this.props.nic,
                    chat_name: this.props.chat_name,
                    go_private_from_portal: this.Action_nick_selected,
                    Change_User_id: this.Change_User_id,


                }, {animation: 'right'});

                break;


            case 4: // выход


                navigator.reset('Login');

                this.componentWillUnmount();
                break;


            case 5: //админ меню

                navigator.push('NavigationAdmin', {
                    type_user: this.props.type_user,
                    nic: this.props.nic,
                    Change_User_id: this.Change_User_id,
                    go_private: this.Action_nick_selected,
                }, {animation: 'right'});
                break;

            case 6: // личные сообшения

                navigator.push('Private_List', {

                    nic: this.props.nic,
                    chat_name: this.props.chat_name,
                    select: this.onActionSelected.bind(this),


                }, {animation: 'right'});

                this.setState({new_pm: false});
                break;

            case 7: // прикрепить изображение

                if (this.props.type_user === TYPE_ADMIN || this.props.type_user === TYPE_MODERATOR) {

                    await this.handleChoosePhoto();
                } else {

                    Alert.alert('Ошибка', 'Не хватает прав доступа')
                }


                break;


        }


    };


    handleChoosePhoto = async () => { //выбираем фото из памяти телефона
        const options = {
            noData: true,
        };
        ImagePicker.launchImageLibrary(options, response => {
            if (response.uri) {
                this.setState({photo_attachments: response});
                Alert.alert("фото успешно загружено!", "\nЖмите кнопку отправить");

                this.componentWillUnmount();


            }


        });
        await this.componentDidMount()

    };

    close_attach = () => {        //закрыть превью attachmentsa

        this.setState({photo_attachments: false,})

    };


    ShowSmiles = async () => { // логика отображения смайлов true/1 false1


        await this.setState({


            ShowSmiles: !this.state.ShowSmiles,
            editable: !this.state.editable
        });

    };


    send_photo = async () => {  //отправляем фото в mongoDb
        this.setState({modal_indicator: true});
        const attach = await SEND_PHOTO_request(this.state.photo_attachments);
        console.log(this.state.photo_attachments);
        this.setState({attachments: attach[0]});
        this.setState({modal_indicator: false});


    };

    send_audio_file = async (audio) => {  //отправляем фото в mongoDb

        const attach = await SEND_AUDIO_request(audio);
        this.setState({attachments: attach[0], text: attach[1]});


    };


    Del_user_change = async () => {

        this.setState({update_msg_bool: !this.state.update_msg_bool});
        // await request_DELETE_USER_ROOM(this.state.room_now, this.props.nic);


        const {navigator} = this.props;
        await navigator.reset('Rooms', {
            name: this.props.nic,
            roomlist: this.props.item_menu,
            chat_name: this.props.chat_name,
            type_user: this.props.type_user,
            category_update: this.props.category_update,
            category_name_toolbar: this.props.category_name_toolbar,
            count: this.props.count,
            parent: this.props.parent,
        });


    };

    send_msg = async () => {

        if (this.state.photo_attachments) {

            await Keyboard.dismiss();
            await this.send_photo();
            await request_SEND_MESSAGES(this.props.nic, 'Вложения', this.props.room, this.state.attachments, 1);
            await this.setState({
                text: '', attachments: [], photo_attachments: false
            });


        } else {

            await Keyboard.dismiss();

            const res = await request_SEND_MESSAGES(this.props.nic, this.state.text, this.props.room, this.state.attachments, 1);

            let validate_send = res['send'];
            if (!validate_send) {

                Alert.alert('Ошибка', 'Невозможно отправить сообщение')

            }

            this.setState({
                text: '', attachments: []
            });

        }
    };

    Show_notice = async () => {

        const res = await request_GET_NOTICE(this.props.nic);
        try {
            let text = res['notice'];

            let readed = res['readed'];

            if (!readed && text.length > 5) {
                await request_DELETE_USER_ROOM(this.state.room_now, this.props.nic);
                this.componentWillUnmount();
                const {navigator} = this.props;
                navigator.push('NoticeScreen', {notice_text: text, go_room: this.Del_user_change})

            }
        } catch (e) {

            console.log(e, 'Shownotice')

        }
        {

        }

    };


    _renderItem = ({item}) => { //render листа с чат сообще ниями
        let name = item.message.startsWith(this.props.chat_name + ','); //если начало сообщения начинается с вашего ника(для проверки)
        let name_notice = item.message.startsWith('Пользователь ' + this.props.chat_name); //если начало сообщения начинается с вашего ника(для проверки нотайс)
        let server = item.user; //имя пользователя
        let attch = item.attachments;//аттач-
        let attch_name = item.name_attachments;
        let _class = item._class;//цвет ника и сообщения0!
        let avatars = item.avatars;//аватарка
        let message = item.message; //сообшение
        let user_id = item.user_id; //id пользователя
        let system = item.system;


        if (name) {


            return (
                <Pattern_message1

                    Action_Nick={this.Action_Nick}
                    user={server}
                    _class={_class}
                    avatars={avatars}
                    message={message}
                    size_msg={this.state.size_msg}
                    size_av={this.state.size_av}
                    user_id={user_id}
                />
            )

        } else if (name_notice && system) {

            (async () => {
                try {

                    await this.Show_notice()
                } catch (err) {
                    console.log(err);
                }
            })();


        } else if (system) {

            return (
                <Pattern_message2

                    Action_Nick={this.Action_Nick}
                    user={server}
                    message={message}
                    size_msg={this.state.size_msg}


                />
            )

        } else if (attch.length > 5) {
            return (
                <Pattern_message3

                    size_msg={this.state.size_msg}
                    size_av={this.state.size_av}
                    _class={_class}
                    avatars={avatars}
                    message={message}
                    attachments={attch}
                    name={attch_name}
                    view_attach={this.View_full_photo}
                    listening_sound={this.listening_sound}
                    user={server}
                />
            )

        } else if (item.hideNic) {
            return (

                <Pattern_message4

                    Action_Nick={this.Action_Nick}
                    user={server}
                    _class={_class}
                    message={message}
                    size_msg={this.state.size_msg}


                />


            )

        } else if (!item.avatars) {


            return (


                <Pattern_message5
                    user_id={user_id}
                    Action_Nick={this.Action_Nick}
                    user={server}
                    _class={_class}
                    message={message}
                    size_msg={this.state.size_msg}


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
                    size_msg={this.state.size_msg}
                    size_av={this.state.size_av}


                />


            )


        }


    };
    audio_screen = async () => {

        this.setState({audio_preview: !this.state.audio_preview, attachments: []})
    };

    render() {
        const Smiles = this.state.ShowSmiles;
        const new_pm = this.state.new_pm;
        const indicator = this.state.modal_indicator;
        const attachments = this.state.photo_attachments;
        const attachments_audio = this.state.audio_preview;


        return (

            <View

            >


                <ImageBackground source={{uri: this.state.background_image}}
                                 style={{width: width, height: height}}>

                    <Toolbar_Chatting select={this.onActionSelected.bind(this)}


                                      users={this.state.users}
                                      item_menu={this.state.item_menu}

                                      room_name={this.props.room_name}
                    />

                    {
                        new_pm &&

                        <View style={{backgroundColor: 'white', flexDirection: 'column', borderRadius: 14}}>
                            <Text style={{marginLeft: width / 2.5, color: 'red', fontSize: 16, fontWeight: 'bold'}}>
                                вам почта

                            </Text>

                            <FastImage source={{uri: 'newpm'}}
                                       style={{
                                           width: width * 0.09,
                                           height: height * 0.09,
                                           marginLeft: width / 2.25


                                       }}

                                       resizeMode={FastImage.resizeMode.contain}
                            />
                        </View>
                    }


                    {indicator && <ActivityIndicator
                        size='large'
                        animating={this.state.modal_indicator}/>}

                    <KeyboardAvoidingView
                        behavior='padding'


                        style={{flex: 1}}>


                        <Flatlist_Chatting_Messaging
                            render={this._renderItem}
                            nic={this.props.nic}
                            room_now={this.state.room_now}
                            Del_user_change={this.Del_user_change}
                            showLoading={this.state.update_msg_bool}
                            unmount_comp={this.componentWillUnmount}
                            onActionSelected={this.onActionSelected}
                            change_pm_state={this.change_pm}
                            user={this.props.chat_name}
                            obj_msg={this.state.data}
                            // extra={this.state.extra_data_bool}

                        />

                        {
                            attachments &&
                            <Attachments_preview
                                photo={this.state.photo_attachments}
                                close_attach={this.close_attach}
                                color="#FFFFFF"

                            />

                        }
                        <View >

                            <Toast ref="toast"
                            style={{borderRadius: 14}}

                            />
                        </View>
                        <TextInput_Chatting
                            key_color='#FFFFFF'
                            show={this.ShowSmiles}
                            send_msg={this.send_msg}
                            text={this.state.text}
                            active={this.state.ShowSmiles}
                            editable_key={this.state.editable}
                            add_text={this.add_text}
                            send_audio_screen={this.audio_screen}


                        />

                        {Smiles &&


                        <View style={{
                            width: width, height: height * 0.35,

                            backgroundColor: '#6d6d6d',
                        }}>
                            <NavigationApp
                                screenProps={{
                                    add_emoji: this.add_emoji

                                }}


                            />
                        </View>

                        }
                    </KeyboardAvoidingView>


                    {
                        attachments_audio &&
                        <AudioExample

                            send_audio_file={this.send_audio_file}

                        />

                    }


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

                </ImageBackground>


            </View>

        );


    }
}