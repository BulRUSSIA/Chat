import React from 'react';
import {
    View,
    BackHandler,
    Alert, ImageBackground, Text, ScrollView, TouchableOpacity, Dimensions
} from 'react-native';
import FastImage from "react-native-fast-image";

import Chatting from '../../components/Chatting/Chatting'
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
import SingleTonUpdatePortal from "../ChatPortal/SingleTonUpdatePortal";

const {width, height} = Dimensions.get('window');
const pre_data =
    {
        data: [{
            "nic": "Загрузка данных...",
            "photo": 'image_exist'
        }]
    };


export default class Profile extends React.Component {


    constructor(props) {
        super(props);


        this.state = {
            color: [],
            toolbar_text: 'Профиль',
            user_info: pre_data,
            gifts_list: [],
            photos_list: [],
            visible: false,
            visible_send_gift: false,
            avatars_list: [],
            user_id: this.props.user_id,
            from_id: this.props.from_id,
            zags: null,
            colorzags: '#010101'


        };


    }

    componentDidMount = async () => {

        const profile_info = await request_GET_PROFILE(this.state.user_id);
        const gifts = await request_GET_GIFTS(this.props.user_id);
        const photos_list = await request_GET_USER_PHOTO(this.props.user_id);
        const data_user = await SingleTonUpdatePortal.PortalUpdates(this.props.user_id);
        this.setState({

            user_info: profile_info,
            gifts_list: gifts,
            photos_list: photos_list,
            zags: data_user[1],
            colorzags: data_user[5]


        })


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
            this.setState({gifts_list: gifts})
        } else {

            Alert.alert("Ошибка", "Техническая ошибка,проверьте баланс,либо обратитесь к администратору")
        }
    };


    Get_Gifts_List = async () => {

        const avatars_list = await request_GET_GiftsList();
        this.setState({

            avatars_list: avatars_list,
            visible_send_gift: !this.state.visible_send_gift
        });

    };

    Event_gift_handler = async (event) => {

        switch (event) {

            case(0):
                console.log('private');
                await this.props.go_private('Написать Личное');

                break;
            case(1):
                console.log('gift');
                await this.Get_Gifts_List();

                break;
            case(2):
                console.log('avaasitar');
                Alert.alert('Ошибка', 'раздел в разработке');
                break;
            case(3):
                console.log('avtoritet');
                Alert.alert('Ошибка', 'раздел в разработке');
                break;
            case(4):

                await this.BuyGift(null, '50', 'Запрос на Бракосочетание!', 'Вы уверены,что хотите вступить в брак с данным пользователем за\t', 1);
                break;

        }


    };


    backs = () => {
        const {navigator} = this.props;
        this.componentWillUnmount();
        navigator.pop({type: 'bottom'})
    };


    delete_gift = (gift, url, description) => {


        const {navigator} = this.props;
        navigator.push('View_stuff', {

            gift_view: url,
            gift_id: gift,
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
        let list_long = this.state.photos_list;


        return (

            <View style={styles.container_pofile}

            >

                <ImageBackground
                    style={{resizeMode: 'contain', height: '100%', width: '100%'}}
                    source={{uri: 'background_airwaychat'}}>
                    {/*<View style={{width:'100%',height:'100%',backgroundColor:'#ffffff'}}>*/}

                    <HeaderBar
                        backs={this.backs}
                        user_info={this.state.user_info.data}
                        visible={this.state.visible}
                        visible_action={this.visible_action}
                    />

                    <View>


                        <GiftsList_action
                            visible_send_gift={this.state.visible_send_gift}
                            avatars_list={this.state.avatars_list}
                            nic={this.props.nic}
                            Event_gift_handler={this.Event_gift_handler}
                            BuyGift={this.BuyGift}
                        />


                    </View>

                        <View style={{flex: 1, flexDirection: 'column', padding: 5, marginleft: 2}}>

                            <Modal_information
                                user_info={this.state.user_info.data}
                                zagsName={this.state.zags}
                                colorzags={this.state.colorzags}
                            />


                        </View>

                    <View style={{
                        maxheight: height / 10,
                        width: width,
                        backgroundColor: 'rgba(75,75,75,0.32)',
                        position: 'absolute',
                        marginTop: height / 2
                    }}>
                        <GiftList
                            gifts_list={this.state.gifts_list}
                            delete_gift={this.delete_gift}

                        />
                    </View>
                    {list_long.length > 0 && <View style={{

                        flexDirection: 'row',
                        borderWidth: 1,
                        borderColor: '#707070',
                        paddingTop: 5,
                        backgroundColor: 'white',
                        borderRadius: 5,
                        marginLeft: '1%',
                        marginRight: '1%',
                        marginBottom: 5,
                        position: 'absolute',
                        width: width * 0.975,
                        top: height / 1.493,
                        flex: 1


                    }}>
                        <TouchableOpacity onPress={() => this.my_photo()} style={{
                            flexDirection: 'row',
                            width: width * 0.95,
                            textAlign: 'center',
                            justifyContent: 'center',
                        }}>
                            <FastImage source={{uri: "add_photo"}} style={styles.imageViewProfile_icon}
                                       resizeMode={FastImage.resizeMode.contain}/>
                            <Text style={styles.Profile_List_text}
                            >

                                {'\t'}ФОТОГРАФИИ

                            </Text>
                        </TouchableOpacity>
                    </View>}

                    <ActionsList


                        Event_gift_handler={this.Event_gift_handler}


                    />


                </ImageBackground>

                {/*</View>*/}
            </View>

        )


    }
}


//<View>
//     //<ActionsList
// //       profile_info={this.state.profile_info}

// //    />
//</View>

//  <PhotosList
//                             photos_list={this.state.photos_list}
//                             View_full_photo={this.View_full_photo}
//                             View_all_photo={this.View_all_photo}
//                         />
