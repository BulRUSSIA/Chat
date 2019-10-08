import React from 'react';
import {
    FlatList,
    Image,
    Text,
    View,
    BackHandler,
    ImageBackground,  TouchableOpacity,
} from 'react-native';

import Chatting from '../../components/Chatting/Chatting'


import styles from '../../styles'
import {Body, Button, Footer, Header, Icon, Left,  Right, Title} from "native-base";

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


    render() {


        return (

            <View style={styles.container_pofile}

            >


                <ImageBackground source={require('../Image/reg_background.jpg')} style={{width: '100%', height: '100%'}}>

                    <Header style={{backgroundColor: '#25566e'}}
                            androidStatusBarColor="#25566e">


                        <Left style={{flex: 1}}>
                            <Button transparent

                                    onPress={this.backs}>
                                <Icon
                                    style={{color: 'white'}}
                                    name="ios-arrow-back"/>
                            </Button>

                        </Left>
                        <Body>
                            <Title>Профиль</Title>
                        </Body>
                        <Right/>




                    </Header>


                    <FlatList

                        data={this.state.user_info}
                        extraData={this.state}


                        renderItem={(({item}) =>


                                //       <TouchableOpacity onPress={() => this.check_nick(item.user)}>


                                <View style={{

                                    marginLeft: 1,
                                    marginRight: 1,
                                    marginBottom: 5,


                                }}>

                                    <View style={{marginLeft: 34,}}>
                                        <Image source={({uri: item.photo})} style={styles.imageAvatarProfile}/>

                                    </View>


                                    <Text style={styles.Profile_List_text_info}>
                                        {'\t' + '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t' + item.nic + '\n\n'}
                                        {item.sex + '\n'}
                                        {item.bday + '\n'}
                                        {item.email + '\n'}
                                        {item.firstName + '\n'}
                                        {item.lastName + '\n'}
                                        {item.about + '\n'}
                                        {item.city + '\n'}
                                    </Text>


                                </View>

                        )
                        }

                        keyExtractor={(item, index) => index}
                    />
                    <View>
                        <FlatList style={{
                            marginLeft: 30,
                            marginRight: 30,
                            marginTop: 13,
                        }}
                                  horizontal
                                  data={this.state.gifts_list}
                                  renderItem={({item}) => {
                                      return (


                                          <View style={{

                                              marginTop: 1,
                                              marginBottom: 14,
                                              marginLeft: 5,
                                              marginRight: 5,

                                          }}>
                                              <TouchableOpacity
                                                  onPress={() => this.delete_gift(item.id, item.url, item.description)}>

                                                  <Image source={{uri: item.url}} style={styles.imageViewAvatars}/>
                                              </TouchableOpacity>

                                          </View>

                                      );
                                  }}
                                  keyExtractor={(item, index) => index}


                        />

                        <FlatList style={{marginBottom: 5, marginTop: 6}}


                                  data={this.state.profile_info}
                                  extraData={this.state}


                                  renderItem={(({item}) =>


                                          //       <TouchableOpacity onPress={() => this.check_nick(item.user)}>

                                          <View style={{
                                              flex: 1, flexDirection: 'row', paddingTop: 6,
                                              borderRadius: 20
                                          }}>

                                              <Image source={item.icon} style={styles.imageViewProfile_icon}/>
                                              <Text style={styles.Profile_List_text}
                                              >

                                                  {item.action}

                                              </Text>


                                          </View>

                                  )
                                  }


                                  keyExtractor={(item, index) => index.toString()}


                        />

                    </View>



                    <Footer style={{backgroundColor: '#25566e', height: '5%'}}>

                    </Footer>


                </ImageBackground>

            </View>
        )


    }
}


