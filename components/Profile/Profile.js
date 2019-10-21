import React from 'react';
import {
    View,
    BackHandler,
    ImageBackground,
} from 'react-native';

import Chatting from '../../components/Chatting/Chatting'
import styles from '../../styles'
import GiftList from "./GiftList";
import ProfileInfoList from "./ProfileInfoList";
import ActionsList from "./ActionsList";
import HeaderBar from "./Header";
import FooterDown from "./Footer";
import PhotosList from "./PhotosList";

const list = [{
    action: 'Написать личное сообщение',
    icon: require('../Image/messageProfile.png')
}, {action: 'Добавить в друзья', icon: require('../Image/addfriendProfile.png')}, {
    action: 'Сделать подарок',
    icon: require('../Image/GiftProfile.png')
}, {action: 'Подарить аватар', icon: require('../Image/avatarProfile.png')}, {
    action: 'Подарить авторитет',
    icon: require('../Image/avtoritetProfile.png')

}, {action: 'Вступить в брак', icon: require('../Image/weddingProfile.png')}];

export default class Profile extends React.Component {


    constructor(props) {
        super(props);


        this.state = {
            color: [],
            toolbar_text: 'Профиль',
            profile_info: list,
            user_info: this.props.user_data.data,
            gifts_list: this.props.gift,
            photos_list:this.props.photos_list


        };


    }


    backs = () => {
        const {router} = this.props;
        this.componentWillUnmount();
        router.pop({
            nic: this.props.nic,
            room: this.props.room,
            chat_name: this.props.chat_name
        })
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

    View_full_photo =  (attach) => { //# переход на страницу просмотра фото целиком передаем туда attach с телефона
        const {router} = this.props;
         router.push.PHOTO_VIEWER({
            room: this.props.room,
            nic: this.props.nic,
            chat_name: this.props.chat_name,
            photo_attachments: attach,
        });
    };


    render() {


        return (

            <View style={styles.container_pofile}

            >


                <ImageBackground source={require('../Image/reg_background.jpg')}
                                 style={{width: '100%', height: '100%'}}>

                    <HeaderBar
                        backs={this.backs}
                    />
                    <ProfileInfoList
                        user_info={this.state.user_info}
/>


                        <PhotosList
                            photos_list={this.state.photos_list}
                            View_full_photo={this.View_full_photo}

                        />
                        <GiftList
                            gifts_list={this.state.gifts_list}
                            delete_gift={this.delete_gift}

                        />

                        <ActionsList
                            profile_info={this.state.profile_info}

                        />

<FooterDown/>


                </ImageBackground>

            </View>
        )


    }
}


