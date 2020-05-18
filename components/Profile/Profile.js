import React from 'react';
import {
    View,
    BackHandler,
    Alert, ImageBackground, Text, ScrollView, TouchableOpacity, Dimensions
} from 'react-native';
import FastImage from "react-native-fast-image";
import Chatting from '../Chatting/Chatting'
import styles from '../../styles'
import GiftList from "./GiftList";
import GiftsList_action from "./GiftsList_action";
import HeaderBar from "./Header";
import request_GET_GiftsList from "../../actions/fetch_Gifts_List";
import request_SEND_GIFT from "../../actions/fetch_send_gift";
import request_GET_GIFTS from "../../actions/fetch_user_gifts";
import request_GET_PROFILE from "../../actions/fetch_profile_info";
import request_GET_USER_PHOTO from "../../actions/fetch_get_photo_user";
import request_ZAGS_REQUEST from "../../actions/fetch_zags_request";
import {Modal_information} from "./Modal_information";
import ActionsList from "./ActionsList";
import SingleTonUpdatePortal from "../ChatPortal/utils/SingleTonUpdatePortal";
import request_GET_AvatarList from "../../actions/fetch_Avatar_List";
import Avatar_action from "./Avatar_action";
import send_avatar from "./network/send_avatar";
import Toast from "react-native-whc-toast";
import send_friend from "./network/send_friend";

const {width, height} = Dimensions.get('window');
const pre_data =
    [{
        "nic": "Загрузка данных...",
        "photo": 'image_exist'

    }];


export default class Profile extends React.Component {


    constructor(props) {
        super(props);


        this.state = {
            color: [],
            toolbar_text: 'Профиль',
            user_info: pre_data,
            gifts_list: [],
            gifts_buy_list:[],
            photos_list: [],
            visible: false,
            visible_send_gift: false,
            visible_send_avatar:false,
            avatars_list: [],
            user_id: this.props.user_id,
            from_id: this.props.from_id,
            zags: null,
            colorzags: '#010101'


        };


    }

    componentDidMount = async () => {

        const profile_info = await request_GET_PROFILE(this.state.user_id);
        const gifts = await request_GET_GIFTS(this.state.user_id);
        const photos_list = await request_GET_USER_PHOTO(this.state.user_id);
        // const data_user = await SingleTonUpdatePortal.PortalUpdates(this.state.user_id);
        this.setState({

            user_info: profile_info,
            gifts_list: gifts,
            photos_list: photos_list,
            zags: "asdas",
            colorzags: "#010101"


        })


    };

    BuyAvatar = async (avatar_id, price) => {
        Alert.alert(
            "Аватар",
            "Вы уверены,что хотите отправить аватар данному пользователю за" + price + " руб?",
            [

                {
                    text: 'Отмена',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {
                    text: 'OK', onPress: async () => {
                        let validate = await send_avatar(this.state.user_id,this.state.from_id,avatar_id);
                        await this.Event_gift_handler(2);
                        if (validate["status"]){
                            this.refs.toast.show("Аватар успешно отправлен");
                        }
                       else {
                            this.refs.toast.show("Произошла ошибка,проверьте баланс");

                        }
                    }
                },
            ],
            {cancelable: false},
        );


    };


    BuyGift = async (gift_id, price, title, message, event) => {
        Alert.alert(
            title,
            message + price + " руб?",
            [

                {
                    text: 'Отмена',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {
                    text: 'OK', onPress: async () => {
                        await this.Service_Choice(event, gift_id, price)
                    }
                },
            ],
            {cancelable: false},
        );


    };
    Service_Choice = async (choice, params1, params2) => {


        switch (choice) {
            case 0:
                await this.Buy_confirm(params1, params2);

                break;

            case 1:
                await this.Zags_Request();

                break;


        }


    };

    Zags_Request = async () => {

        const buy = await request_ZAGS_REQUEST(this.state.user_id, this.state.from_id);

        let response = buy['Accept'];
        console.log(response);

        if (response === true) {

            Alert.alert("Заявка Одобрена!", "Пользователь получил ваше предложение на вступление в брак!");
        } else {

            Alert.alert("Ошибка", "Техническая ошибка,проверьте баланс,либо обратитесь к администратору")


        }


    };


    Buy_confirm = async (gift_id, price) => {

        const buy = await request_SEND_GIFT(this.state.user_id, this.state.from_id, gift_id, price);
        let response = buy['Accept'];
        console.log(response);

        if (response === true) {
            Alert.alert("Подарок  успешно отправлен", "Пользователь получил ваш подарок!");
            const gifts = await request_GET_GIFTS(this.state.user_id);
            this.setState({gifts_list: gifts,})
        } else {

            Alert.alert("Ошибка", "Техническая ошибка,проверьте баланс,либо обратитесь к администратору")
        }
    };


    Get_Gifts_List = async () => {
        const gifts_list = await request_GET_GiftsList();
        this.setState({
            gifts_buy_list: gifts_list,
            visible_send_gift: !this.state.visible_send_gift
        });
    };



    Event_gift_handler = async (event) => {

        switch (event) {

            case(0):
                // console.log('private');
                // await this.props.go_private('Написать Личное');
                Alert.alert('Ошибка', 'раздел в раз11работке');
                break;
            case(1):
                console.log('gift');
                await this.Get_Gifts_List();

                break;
            case(2):
               this.setState({visible_send_avatar:!this.state.visible_send_avatar});
                break;
            case(3):
               await send_friend(this.state.user_id, this.state.from_id);
                Alert.alert('Друзья', 'пользователю отправлена заявка на дружбу');
                break;
            case(4):
                await this.BuyGift(null, '50', 'Запрос на Бракосочетание!', 'Вы уверены,что хотите вступить в брак с данным пользователем за\t', 1);
                break;

            case(5):
                await this.my_photo();
                break;

        }


    };


    backs = () => {
        const {navigator} = this.props;
        this.componentWillUnmount();
        navigator.pop({type: 'bottom'})
    };


    delete_gift = (gift, url, description,name) => {


        const {navigator} = this.props;
        navigator.push('View_stuff', {

            gift_view: url,
            gift_id: gift,
            gift_name:name,
            gift_description: description,
            user_id: this.state.user_id,
            my_id: this.state.from_id

        });


    };


    componentWillUnmount() {

        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
        clearInterval(Chatting.interval);
    }

    handleBackButton = () => {


        return true

    };


    visible_action = () => {

        this.setState({visible: !this.state.visible});
        console.log(this.state.visible)

    };

    View_full_photo = (attach) => { //# переход на страницу просмотра фото целиком передаем туда attach с телефона
        const {navigator} = this.props;
        navigator.push('PHOTO_VIEWER', {
                room: this.props.room,
                nic: this.props.nic,
                chat_name: this.props.chat_name,
                photo_attachments: attach,
            }
        );
    };

    my_photo = async () => {

        const {navigator} = this.props;
        navigator.push('Photo_without_redactor', {
            get_pop: this.Get_pop,
            nic_id: this.state.user_id
        });

    };

    Get_pop = () => {
        const {navigator} = this.props;
        navigator.pop();
    };

    render() {
        return (
            <View style={styles.container_pofile}
            >
                <ImageBackground
                    style={{resizeMode: 'contain', height: '100%', width: '100%'}}
                    source={{uri: 'background_airwaychat'}}>

                    <HeaderBar
                        backs={this.backs}
                        user_info={this.state.user_info}
                        visible={this.state.visible}
                        visible_action={this.visible_action}
                    />
<ScrollView>
                        <Modal_information
                            user_info={this.state.user_info}
                            zagsName={this.state.zags}
                            colorzags={this.state.colorzags}
                        />
                        <GiftList
                            gifts_list={this.state.gifts_list}
                            delete_gift={this.delete_gift}
                        />
                        <GiftsList_action
                            visible_send_gift={this.state.visible_send_gift}
                            avatars_list={this.state.gifts_buy_list}
                            nic={this.props.nic}
                            Event_gift_handler={this.Event_gift_handler}
                            BuyGift={this.BuyGift}
                        />
                        <Avatar_action
                            visible_send_avatar={this.state.visible_send_avatar}
                            Event_gift_handler={this.Event_gift_handler}
                            buy_avatar={this.BuyAvatar}
                        />

                    <ActionsList
                        Event_gift_handler={this.Event_gift_handler}
                        photos_list={this.state.photos_list}
                    />
    <Toast ref="toast"
           style={{borderRadius: 14}}

    />
</ScrollView>
                </ImageBackground>

            </View>

        )


    }
}


