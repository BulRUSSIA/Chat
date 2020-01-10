import React from 'react';
import {

    View,
    BackHandler,
    ImageBackground,
    Alert,
    Keyboard, ActivityIndicator, Dimensions, AsyncStorage,
} from 'react-native';
import type {Notification, NotificationOpen} from 'react-native-firebase';
import menu_moderator from '../const/menu_moderator'
import list_moder from '../const/list_moder'
import list_user from '../const/list_user'
import menusmiles from '../const/smiles'
import menuitem from '../const/menu'
import styles from '../../styles'

import {Pattern_message1} from "./pattern_message1";
import {Toolbar_Chatting} from "./Toolbar_Chatting";
import {Flatlist_Chatting_Messaging} from "./Flatlist_Chatting_Messaging";
import {Modal_Chatting_ListUsers_Flatlist} from "./Modal_Chatting_ListUsers_Flatlist";
import {Modal_Chatting_Action_Flatlist} from "./Modal_Chatting_Action_Flatlist";
import {TextInput_Chatting} from "./TextInput_Chatting";
import request_GET_PRIVATE_ROOM from "../../actions/fetch_create_private";
import request_GET_MESSAGES_PRIVATE from "../../actions/fetch_private_message";
import request_GET_PROFILE from "../../actions/fetch_profile_info";
import request_GET_MESSAGES from "../../actions/fetch_get_messages";
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

const TYPE_ADMIN = 2;
const TYPE_MODERATOR = 4;
const CHAT_UPDATE = 3000;
import firebase from 'react-native-firebase';
import FireSingleTon from "../../FireSingleTon";
import FastImage from "react-native-fast-image";
import request_MY_NICKNAME from "../../actions/fetch_my_nickname";
import SingleTonUpdateZags from "../ChatPortal/SingleTonUpdatePortal";
import {TYPE_BANNED} from "../const/const type_user_chats";
import request_GET_ROOMS from "../../actions/fetch_get_rooms";

const screenWidtht = Math.round(Dimensions.get('window').width);

//this.props.nic = your mongoDB-id
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
            showAlert: false,
            animating: true,
            photo_attachments: false,
            attachments: 'Not', // Not для back-a
            modal_indicator: false,
            room_now: this.props.room,
            user_id: '',
            ShowSmiles: false,
            new_pm: false,
            size_av: 18,
            size_msg: 25,
            background_image: 'default_background'
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


            console.log(this.state.size_msg);


        } catch (error) {
            console.log('error -asyncstore', error)
        }
    };


    add_text = async (text) => { // add text to textinput


        await this.setState({text: text});

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
        const {navigator} = this.props;
        await navigator.push('PHOTO_VIEWER', {

            photo_attachments: attach,
        });
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
                this.setState({isVisible: false});
                const get_private = await request_GET_PRIVATE_ROOM(this.props.nic, this.state.user_id);
                const get_private_data = await request_GET_MESSAGES_PRIVATE(get_private);

                navigator.push('Private', {
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
                //   const profile_info = await request_GET_PROFILE(this.state.user_id);
                //     const gifts = await request_GET_GIFTS(this.state.user_id);
                //     const photos_list = await request_GET_USER_PHOTO(this.state.user_id);

                navigator.push('Profile', {

                    //   data_user:profile_info,
                    chat_name: this.props.chat_name,
                    user_id: this.state.user_id,
                    from_id: this.props.nic,
                    go_private: this.Action_nick_selected,
                });



            //         this.setState({animating: !this.state.animating});
            //      this.componentWillUnmount();
            //      this.componentDidMount();


        }


    };

    Change_User_id = (user_id, private_chatter) => {
        this.setState({user_id: user_id, user_now: private_chatter})

    };

    update_msg = async () => {


        const message = await request_GET_MESSAGES(this.props.nic,this.state.room_now);
        console.log('message types' + message);
        //обновляем сообщения повешен интервал 3 секун ды в ComponentDIDmount setInterval
        if (!message && this.state.room_now!=='Тюрьма'){

            console.log('banneeeeed');

            Alert.alert(
                'Бан',
                'Вы были забанены и будете перемещены в тюрьму ', // <- this part is optional, you can pass an empty string
                [


                    {
                        text: 'ну,пойду посижу', onPress: async () => {
                            await this.Del_user_change()
                        },


                    }
                ],
                {cancelable: false},
            );

        }

        else {

            console.log('not banned')
            this.setState({
                    dataSource: message,

                }
            );


            if (this.state.animating) {    //индикатор при первом заходе в комнату

                await this.setState({animating: !this.state.animating});
                this.componentWillUnmount();
                await this.componentDidMount();
            }

        }
    };


    componentWillUnmount() { //анмаунт из памяти
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
        clearInterval(this.interval);
        console.log('i am unmount chaast12ting');
        this.notificationDisplayedListener();
        this.notificationListener();
        this.notificationOpenedListener();
    }

    componentDidMount = async () => {

        await this._retrieveData_Settings();
        if (this.props.type_user === TYPE_ADMIN || this.props.type_user === TYPE_MODERATOR) { //проверяем тип пользователя если админ или мд открыть меню суперпользователя

            this.setState({action_nick: list_moder, item_menu: menu_moderator})

        }

        this.interval = setInterval(() => this.update_msg(), CHAT_UPDATE);
        const granted = await firebase.messaging().hasPermission();
        if (granted) {

            await FireSingleTon.fetchToken();

        } else {
            await FireSingleTon.askPermission();
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
        const {navigator} = this.props;
        switch (position) {


            case 0: // личные сообшения

                navigator.push('Private_List', {

                    nic: this.props.nic,
                    chat_name: this.props.chat_name,
                    select: this.onActionSelected.bind(this),


                });

                this.setState({new_pm: false});
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
                });
                break;


            case  4: //чат портал


                navigator.push('ChatPortal', {

                    room: this.props.room,
                    nic: this.props.nic,
                    chat_name: this.props.chat_name,
                    go_private_from_portal: this.Action_nick_selected,
                    Change_User_id: this.Change_User_id,


                });

                break;


            case 5: //выход


                navigator.reset('Login');
                await this.Del_user_change();
                this.componentWillUnmount();
                break;


            case 6: // прикрепить изображение


                await this.handleChoosePhoto(); //
                break;


            case 7: //админ меню

                navigator.push('NavigationAdmin', {
                    type_user: this.props.type_user,
                    nic: this.props.nic,
                    Change_User_id: this.Change_User_id,
                    go_private: this.Action_nick_selected,
                });
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


    ShowSmiles = () => { // логика отображения смайлов true/1false1


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
        const {navigator} = this.props;
        navigator.push('Private', {
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


        await request_DELETE_USER_ROOM(this.state.room_now, this.props.nic);



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
            await request_SEND_MESSAGES(this.props.nic, 'Вложения', this.props.room, this.state.attachments);
            await this.setState({
                text: '', attachments: 'Not', photo_attachments: false
            });

            await this.update_msg();
        } else {
            await Keyboard.dismiss();

           await request_SEND_MESSAGES(this.props.nic, this.state.text, this.props.room, this.state.attachments);



            await this.setState({
                text: '',
            });

            await this.update_msg();
            //
            // if (res === false && this.state.room_now!=='Тюрьма') {
            //
            //     Alert.alert(
            //         'Бан',
            //         'Вы были забанены и будете перемещены в тюрьму ', // <- this part is optional, you can pass an empty string
            //         [
            //
            //
            //             {
            //                 text: 'ну,пойду посижу', onPress: async () => {
            //                     await this.Del_user_change()
            //                 },
            //
            //
            //             }
            //         ],
            //         {cancelable: false},
            //     );


            // }

        }
    };


    _renderItem = ({item}) => { //render листа с чат сообщениями
        let name = item.message.startsWith(this.props.chat_name + ','); //если начало сообщения начинается с вашего ника(для проверки)
        let server = item.user; //имя пользователя
        let attch = item.attachments;//аттач-
        let _class = item._class;//цвет ника и сообщения0!
        let avatars = item.avatars;//аватарка
        let message = item.message; //сообшение
        let user_id = item.user_id; //id пользователя
        let system = item.system;


        // if (this.props.nic === user_id && user_type === TYPE_BANNED) {
        //
        //     alert('Вы были забанены')
        // }
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
        }

        // else if (this.props.nic===user_id){
        //
        //     if (user_type ===TYPE_BANNED) {
        //
        //
        //
        //        this.setState({room_now:'Тюрьма'})
        //
        //
        //     }
        //
        //
        //
        //
        // }


        else if (system) {

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
                    view_attach={this.View_full_photo}
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


    NewPrivate_Message = () => {


        if (this.state.new_pm) {

            return (<FastImage source={require('../Image/lsmsg.png')}
                               style={{width: 40, height: 50, marginLeft: screenWidtht / 1.12, paddingBottom: '2%'}}
            />)

        }


    };


    render() {


        if (this.state.animating) {

            return (

                <ImageBackground source={{uri: this.state.background_image}}
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


                <ImageBackground source={{uri: this.state.background_image}}
                                 style={{width: '100%', height: '100%'}}>

                    <Toolbar_Chatting select={this.onActionSelected.bind(this)}


                                      users={this.state.users}
                                      item_menu={this.state.item_menu}

                                      room={this.props.room}
                    />

                    {this.NewPrivate_Message()}


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
                        key_color='#FFFFFF'
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