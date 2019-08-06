import React from 'react';
import {
    FlatList,
    Image,
    Text,
    View,
    BackHandler,
    TouchableWithoutFeedback,
    Animated,
    ImageBackground, ToolbarAndroid, TextInput, Alert, TouchableOpacity
} from 'react-native';

import Chatting from '../components/Chatting'


import styles from '../styles'
const list = [{
    action: 'Написать личное сообщение',
    icon: require('./messageProfile.png')
}, {action: 'Добавить в друзья', icon: require('./addfriendProfile.png')}, {
    action: 'Сделать подарок',
    icon: require('./GiftProfile.png')
}, {action: 'Подарить аватар', icon: require('./avatarProfile.png')}, {
    action: 'Подарить авторитет',
    icon: require('./avtoritetProfile.png')

}, {action: 'Вступить в брак', icon: require('./weddingProfile.png')}];
//<Image source={{uri: item}} style={styles.imageViewAvatars}

export default class Profile extends React.Component {


    constructor(props) {
        super(props);


        this.state = {
            color: [],
            toolbar_text: 'Анкета пользователя',
            profile_info: list,
            user_info: this.props.user_data.data,
            gifts_list: this.props.gift,



        };

    }

    backs =() => {
        const {router} = this.props;
        this.componentWillUnmount();
        router.pop({
            nic: this.props.nic,
            room: this.props.room,
            chat_name: this.props.chat_name
        })};



    delete_gift = (gift,url,description) => {


        const {router} = this.props;
        router.push.View_stuff({
            nic: this.props.nic,
            room: this.props.room,
            chat_name: this.props.chat_name,
            gift_view:url,
            gift_id:gift,
            gift_description:description,
            user_information:this.props.user_data,
            gifts_list:this.state.gifts_list,
            _isMounted:false,
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







    renderSeparator_1 = () =>

        (
            <View
                style={{
                    backgroundColor: '#e6efb2',
                    height: 0.35

                }}
            />
        );


    render() {



        return (

            <View style={styles.container_pofile}

            >


                <ImageBackground source={require('./mochat.jpg')} style={{width: '100%', height: '100%'}}>

                    <ToolbarAndroid style={styles.containerToolbarProfile}


                                    data={this.state.toolbar_text}
                    >
                        <View>

                            <Text style={styles.Profile_Toolbar_text}>{this.state.toolbar_text}</Text>
                        </View>

                    </ToolbarAndroid>


                    <FlatList

                              data={this.state.user_info}
                              extraData={this.state}


                              renderItem={(({item}) =>


                                      //       <TouchableOpacity onPress={() => this.check_nick(item.user)}>




                                      <View style={{

                                          marginLeft: 30,
                                          marginRight: 30,


                                      }}>

                                          <View>
                                              <Image source={({uri: item.photo})} style={styles.imageAvatarProfile}/>

                                          </View>


                                          <Text style={styles.Profile_List_text_info}>
                                              {'Пользователь:' + item.nic +'\n'}
                                              {item.sex + '\n'}
                                              {item.bday+ '\n'}
                                              {item.email+ '\n'}
                                              {item.firstName+ '\n'}
                                              {item.lastName+ '\n'}
                                              {item.about+ '\n'}
                                              {item.city+'\n'}
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
                    }}
                        horizontal
                        data={this.state.gifts_list}
                        renderItem={({item}) => {
                            return (


                                <View style={{

                                    marginTop: 1,
                                    marginBottom: 14,
                                    marginLeft: 5,
                                    marginRight: 5
                                }}>
                                    <TouchableOpacity onPress={() => this.delete_gift(item.id,item.url,item.description)}>

                                        <Image source={{uri:item.url}} style={styles.imageViewAvatars}/>
                                    </TouchableOpacity>

                                </View>

                            );
                        }}
                        keyExtractor={(item, index) => index}


                    />

                        <FlatList style={{marginBottom: 10, marginTop: 12}}


                                  data={this.state.profile_info}
                                  extraData={this.state}


                                  ItemSeparatorComponent={this.renderSeparator_1}


                                  renderItem={(({item}) =>


                                          //       <TouchableOpacity onPress={() => this.check_nick(item.user)}>

                                          <View style={{flex: 1, flexDirection: 'row', backgroundColor: '#ffffff'}}>

                                              <Image source={item.icon} style={styles.imageView}/>
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


                    <ToolbarAndroid style={styles.containerToolbarProfile}


                    >
                        <View>
                            <Text style={styles.Profile_Toolbar_text_down}
                                  onPress={this.backs}


                            >назад</Text>
                        </View>

                    </ToolbarAndroid>


                </ImageBackground>

            </View>
        )


    }
}


