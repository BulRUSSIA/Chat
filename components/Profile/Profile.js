import React from 'react';
import {
    ScrollView,
    Text,
    View,
    BackHandler,
    ImageBackground, TouchableOpacity,
} from 'react-native';

import Chatting from '../../components/Chatting/Chatting'
import styles from '../../styles'
import GiftList from "./GiftList";
import ProfileInfoList from "./ProfileInfoList";
import HeaderBar from "./Header";
import FooterDown from "./Footer";
import NavigationApp from "./Navigation";

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
            photos_list: this.props.photos_list,
            visible:false,


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

    View_all_photo = () => {
        const {router} = this.props;
        router.push.PhotosAll({
            photos_list: this.state.photos_list,
            View_full_photo: this.View_full_photo
        });


    };

    visible_action =()=>{

      this.setState({visible:!this.state.visible});
        console.log(this.state.visible)

    };

    View_full_photo = (attach) => { //# переход на страницу просмотра фото целиком передаем туда attach с телефона
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


                <ImageBackground source={require('../Image/main-qimg-0548d95c40fa2abe7088c8a551fb5296.jpg')}
                                 style={{width: '100%', height: '100%'}}>

                    <HeaderBar
                        backs={this.backs}
                    />

                    <View>


                        <ProfileInfoList
                            user_info={this.state.user_info}
                            visible={this.state.visible}
                            visible_action={this.visible_action}
                        />
                    </View>
                    <View style={{flex: 0, flexDirection: 'row',padding:5,marginleft:2}}>
                        <TouchableOpacity style={{
                            backgroundColor: 'rgba(32,108,134,0.78)', flex: 1, borderRadius: 14,


                            padding: 14,


                        }}
                                          activeOpacity={.5}

                        >
                            <Text style={{
                                color: 'white',
                                textAlign: 'center',
                                fontWeight: 'bold',
                                fontSize: 15,
                            }}>Написать</Text>

                        </TouchableOpacity>
                        <TouchableOpacity style={{
                            backgroundColor: 'rgba(33,108,134,0.78)', flex: 1, borderRadius: 14,marginLeft:3,


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
                            photos_list:this.state.photos_list,
                            View_full_photo: this.View_full_photo,
                            View_all_photo: this.View_all_photo,
                        }}


                    />


                    <FooterDown/>


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