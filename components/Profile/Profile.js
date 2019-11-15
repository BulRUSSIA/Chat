import React from 'react';
import {

    Text,
    View,
    BackHandler,
    ImageBackground, TouchableOpacity, Alert,
} from 'react-native';

import Chatting from '../../components/Chatting/Chatting'
import styles from '../../styles'
import GiftList from "./GiftList";
import GiftsList_action from "./GiftsList_action";
import ProfileInfoList from "./ProfileInfoList";
import HeaderBar from "./Header";
import NavigationApp from "./Navigation";
import request_GET_GiftsList from "../../actions/fetch_Gifts_List";
import request_SEND_GIFT from "../../actions/fetch_send_gift";
import request_GET_GIFTS from "../../actions/fetch_user_gifts";
import request_GET_PROFILE from "../../actions/fetch_profile_info";
import request_GET_USER_PHOTO from "../../actions/fetch_get_photo_user";
const pre_data =
    {
     data:[{
        "nic": "Anonymous",
        "photo": 'image_exist'}]
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
            user_id:this.props.user_id,
            from_id:this.props.from_id,


        };



    }

    componentDidMount  = async () => {

        const profile_info = await request_GET_PROFILE(this.state.user_id);
        console.log(profile_info);
        const gifts = await request_GET_GIFTS(this.props.user_id);
        const photos_list = await request_GET_USER_PHOTO(this.props.user_id);
        this.setState({

            user_info:profile_info,
            gifts_list:gifts,
            photos_list:photos_list,


        })





    };


    BuyGift = async (gift_id,price)=> {
        Alert.alert(
            'Отправка Подарка!',
            "Вы уверены,что хотите сделать подарок данному пользователю за "+ price + " руб?",
            [

                {
                    text: 'Отмена',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {text: 'OK', onPress: async () => { await this.Buy_confirm(gift_id,price)}},
            ],
            {cancelable: false},
        );




    };

    Buy_confirm =async (gift_id,price)=> {

        const buy = await request_SEND_GIFT(this.state.user_id,this.state.from_id,gift_id,price);

        let response = buy['Accept'];
        console.log(response);

        if (response===true) {

            Alert.alert("Подарок  успешно отправлен!","Пользователь получил ваш подарок!");
            const gifts = await request_GET_GIFTS(this.state.user_id);
            this.setState({gifts_list:gifts})
        }

        else {

            Alert.alert("Недостаточно средств","Пополните баланс!!!")


        }




    };





    Get_Gifts_List = async ()=> {

        const avatars_list = await request_GET_GiftsList();
        this.setState({

            avatars_list: avatars_list,
            visible_send_gift: !this.state.visible_send_gift

        });

    };

    Event_gift_handler = async (event) => {

        switch (event) {


            case(1):
                console.log('gift');
               await this.Get_Gifts_List();

                break;
            case(2):
                console.log('avaastar');
                break;
            case(3):
                console.log('avtoritet');
                break;
            case(4):
                console.log('wedd0ing');
                break;

        }


    };


    backs = () => {
        const {router} = this.props;
        this.componentWillUnmount();
        router.pop({type:'bottom'})
    };


    delete_gift = (gift, url, description) => {


        const {router} = this.props;
        router.push.View_stuff({
            nic: this.props.nic,
            room: this.props.room,
            chat_name: this.props.chat_name,
            gift_view: url,
            gift_id: gift,
            gift_description: description,
            user_information: this.props.user_data,
            gifts_list: this.state.gifts_list,
            _isMounted: false,
            dataSource: []
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
        const {router} = this.props;
        router.push.PHOTO_VIEWER({
            room: this.props.room,
            nic: this.props.nic,
            chat_name: this.props.chat_name,
            photo_attachments: attach,
        }
);
    };


    render() {


        return (

            <View style={styles.container_pofile}

            >


                <ImageBackground source={require('../Image/main-qimg-0548d95c40fa2abe7088c8a551fb5296.jpg')}
                                 style={{width: '100%', height: '100%'}}>

                    <HeaderBar
                        backs={this.backs}
                    />

                    <View>


                        <ProfileInfoList
                            user_info={this.state.user_info.data}
                            visible={this.state.visible}
                            visible_action={this.visible_action}
                        />

                        <GiftsList_action
                            visible_send_gift={this.state.visible_send_gift}
                            avatars_list={this.state.avatars_list}
                            nic={this.props.nic}
                            Event_gift_handler={this.Event_gift_handler}
                            BuyGift={this.BuyGift}


                        />


                    </View>
                    <View style={{flex: 0, flexDirection: 'row', padding: 5, marginleft: 2}}>
                        <TouchableOpacity

                            onPress={()=> this.props.go_private('Написать Личное')}
                            style={{
                            backgroundColor: 'rgba(32,108,134,0.78)', flex: 1, borderRadius: 14,


                            padding: 15,


                        }}
                                          activeOpacity={.5}

                        >
                            <Text style={{
                                color: 'white',
                                textAlign: 'center',
                                fontWeight: 'bold',
                                fontSize: 14,
                            }}>Написать</Text>

                        </TouchableOpacity>
                        <TouchableOpacity style={{
                            backgroundColor: 'rgba(33,108,134,0.78)', flex: 1, borderRadius: 14, marginLeft: 3,


                            padding: 14,


                        }}
                                          activeOpacity={.5}

                        >
                            <Text style={{
                                color: 'white',
                                textAlign: 'center',
                                fontWeight: 'bold',
                                fontSize: 15,
                            }}>Добавить в друзья</Text>

                        </TouchableOpacity>

                    </View>


                    <GiftList
                        gifts_list={this.state.gifts_list}
                        delete_gift={this.delete_gift}

                    />
                    <NavigationApp
                        screenProps={{
                            photos_list: this.state.photos_list,
                            View_full_photo: this.View_full_photo,
                            Event_gift_handler: this.Event_gift_handler

                        }}


                    />


                </ImageBackground>


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