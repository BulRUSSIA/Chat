import React from 'react';
import {

    View,
    BackHandler,
    ImageBackground,
    Alert,

    Keyboard, ActivityIndicator,
} from 'react-native';
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


const list_moder = ['Ответить', 'Написать Личное', 'Профиль', 'Напугать', 'Бан 5 минут', 'Бан 15 минут', 'Бан 60 минут', 'Бан 120 минут'];
const list_user = ['Ответить', 'Написать Личное', 'Профиль', 'Добавить в друзья'];
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
            photo: false,
            attachments: 'Not',
            modal_indicator:false,


        };

        this.Change_Visible_List = this.Change_Visible_List.bind(this);


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

    View_full_photo = async (attach) => {

        const {router} = this.props;

        await router.push.PHOTO_VIEWER({
            room: this.props.room,
            nic: this.props.nic,
            chat_name: this.props.chat_name,
            photo: attach,

        });


    };
    Action_Nick = (user) => {


        this.setState({user_now: user, isVisibleList: false, isVisible: !this.state.isVisible});


    };


    Action_nick_selected = async (position) => {
        if (position === 'Напугать') {
            this.Change_Visible_Action();
            console.log('0');
            console.log(this.props.nic);

            await request_SEND_BANNED_ACTION(0, this.state.user_now, this.props.nic);


        }

        if (position === 'Добавить в друзья') {
            Alert.alert('Раздел недоступен')
            this.Change_Visible_Action()

        }


        if (position === 'Бан 5 минут') {
            this.Change_Visible_Action();
            console.log('ban 5 minutes');
            console.log(this.props.nic);

            await request_SEND_BANNED_ACTION(0.05, this.state.user_now, this.props.nic);


        }

        if (position === 'Бан 15 минут') {
            this.Change_Visible_Action();
            console.log('ban 15  minutes');
            console.log(this.props.nic);

            await request_SEND_BANNED_ACTION(0.25, this.state.user_now, this.props.nic);


        }

        if (position === 'Бан 60 минут') {
            this.Change_Visible_Action();
            console.log('ban 60 minutes');
            console.log(this.props.nic);

            await request_SEND_BANNED_ACTION(1, this.state.user_now, this.props.nic);


        }
        if (position === 'Бан 120 минут') {
            this.Change_Visible_Action();
            console.log('ban 120 minutes');
            console.log(this.props.nic);

            await request_SEND_BANNED_ACTION(2, this.state.user_now, this.props.nic);


        }


        if (position === 'Ответить') {

            this.setState({isVisible: !this.state.isVisible, text: this.state.user_now + ', '});


        }
        if (position === 'Написать Личное') {
//Исправить пропсы ник не находит
            this.Change_Visible_Action();
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


            this.Change_Visible_Action();
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


    //  ban_msg = async () => {

    //  const ban = address + `/banned/room/${this.props.nic}`;

    //   return fetch(ban)
    //       .then((response) => response.json())
    //       .then(async (responseJson) => {


    //        this.setState({ban: responseJson['user']});

    //        if (this.state.ban === 'banned') {


    //         let check = this.props.room;


    //         if (check === 'Тюрьма') {

    //   console.log('ok');
    //   } else {

    //       const {router} = this.props;


    //       Alert.alert('Вы были забанены на неопределенный срок');
    //    router.push.Rooms({
    //         name: this.props.nic,
    //          room: 'Тюрьма',
    //            roomlist: this.state.rooms_Banned,
    //            recieve: this.props.recieve
    //        });

    //       await request_ENTRY_USER_ROOM(this.props.nic, this.props.room);
    //   console.log('prison' + this.props.room)

    //   }

    //   } else if ((this.state.ban === 'unbanned' && this.props.room === 'Тюрьма')) {

    //        Alert.alert('Cрок закончился!');
    //  const {router} = this.props;
    //     router.pop({name: this.props.nic, room: 'Тюрьма', item_menu: this.props.item_menu});

    //            console.log('go')

    //       } else {

    //           console.log('go')

    //       }
    //    })
    //    .catch((error) => {
    //   console.error(error);
    //     });

    //  };


    update_msg = async () => {


        const message = await request_GET_MESSAGES(this.props.room);
        this.setState({
                dataSource: message,


            }
        );

        if (this.state.animating) {

            await this.setState({animating: !this.state.animating});
            this.componentWillUnmount();
            this.componentDidMount();


        }


    };

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
        clearInterval(this.interval);
        console.log('i am unmount chatting');

    }

    componentDidMount = () => {
        if (this.props.type_user === 2 || this.props.type_user === 4) {

            this.setState({action_nick: list_moder})

        }

        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);


        this.interval = setInterval(() => this.update_msg(), 3000);


    };

    Modal_Activity = () => {

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

    onActionSelected = async (position) => {

        if (position === 0) {
            if (!this.state.animating) {

                await this.setState({animating: !this.state.animating});
                this.componentWillUnmount();
                this.componentDidMount();


            }
            const get_list = await request_GET_PRIVATE_LIST(this.props.nic);

            const {router} = this.props;
            await router.push.Private_List({
                profile_user: this.state.user_now,
                room: this.props.room,
                nic: this.props.nic,
                chat_name: this.props.chat_name,
                private_user_list: get_list,
                select: this.onActionSelected.bind(this),
                mount: this.componentDidMount


            });
            this.componentWillUnmount();
            await this.setState({animating: !this.state.animating});

        }

        if (position === 1) {
            console.log("I am in 0");


            const usr_list_vw = await fetch_users_in_room(this.props.room);

            this.setState({isVisibleList: !this.state.isVisibleList, users: usr_list_vw})


        }


        if (position === 2) {


            //  await this.ban_msg();
            await this.Del_user_change();
            await this.componentWillUnmount()


        }


        if (position === 3) {


            const profile_info = await request_GET_PROFILE(this.props.chat_name);
            const a = profile_info.data;
            const {router} = this.props;
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

                });

            }


            await router.push.Profile_redactor({

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
            });


        }
        if (position === 4) {

            const profile_info = await request_GET_PROFILE(this.props.chat_name);
            const a = profile_info.data;
            const {router} = this.props;
            for (let i = 0; i < a.length; i++) {
                let obj = a[i];

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


        }


        if (position === 5) {


            const {router} = this.props;

            router.push.Login();
            await this.Del_user_change();
            this.componentWillUnmount()


        }
        if (position === 6) {


            await this.handleChoosePhoto();





        }

    };

    handleChoosePhoto =  () => {
        const options = {
            noData: true,
        };
        ImagePicker.launchImageLibrary(options, response => {
            if (response.uri) {
                this.setState({photo: response});
                Alert.alert("фото успешно загружено!\nЖмите кнопку отправить");

                this.componentWillUnmount();

                this.componentDidMount()


            }


        });





    };

    close_attach = () => {

    this.setState({photo:null})

    };

    view = () =>{

        if (this.state.photo) {

          return(
           <Attachments_preview
              photo={this.state.photo}
              close_attach={this.close_attach}

           />
          )
        }
    };

    send_photo = async () => {
        this.setState({modal_indicator:true});
        const attach = await SEND_PHOTO_request(this.state.photo);
        this.setState({attachments: attach});
        console.log('attach123' +attach)
        this.setState({modal_indicator:false});


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

       if (this.state.photo) {
           await Keyboard.dismiss();
           await this.send_photo();
           //    if (this.state.text !=='') {
           await request_SEND_MESSAGES(this.props.nic, 'Вложения', this.props.room, this.state.attachments);

           await this.setState({

               text: '', attachments: 'Not', photo: false


           });
           await this.update_msg();





       }

       else


        //    if (this.state.text !=='') {

      await Keyboard.dismiss();
       await  request_SEND_MESSAGES(this.props.nic, this.state.text, this.props.room, this.state.attachments);
        await this.setState({

            text: '',


        });

        await this.update_msg();




        //   }
        //     else {
        //       Alert.alert("Cообщение не может быть пустым")
//
        //  }


    };


    /*    .catch(error => this.setState({error}));*/


    _renderItem = ({item}) => {


        let name = item.message.startsWith(this.props.chat_name + ',');
        let server = item.user;
        let attch = item.attachments;
        let _class = item._class;
        let avatars = item.avatars;
        let message = item.message;

        if (name) {


            return (


                <Pattern_message1

                    Action_Nick={this.Action_Nick}
                    user={server}
                    _class={_class}
                    avatars={avatars}
                    message={message}


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

                    user={server}
                    _class={_class}
                    avatars={avatars}
                    message={message}
                    attachments={attch}
                    view_attach={this.View_full_photo}


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

                    Action_Nick={this.Action_Nick}
                    user={server}
                    _class={_class}
                    message={message}


                />


            )

        } else {

            return (


                <Pattern_message6

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

                <ImageBackground source={require('../Image/Chattingbackground.webp')}
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


                <ImageBackground source={require('../Image/Chattingbackground.webp')}
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
                        add_text={this.add_text}
                        send_msg={this.send_msg}
                        text={this.state.text}


                    />

                </ImageBackground>


            </View>

        );


    }
}
