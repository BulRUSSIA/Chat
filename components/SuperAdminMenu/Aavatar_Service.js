import {Alert, Dimensions, ImageBackground,ActivityIndicator, FlatList, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import React from "react";
import request_GET_AvatarList from "../../actions/fetch_Avatar_List";
import FastImage from "react-native-fast-image";
import Icon from "react-native-vector-icons/AntDesign";
import Modal_Add_stuff from "./Modal_Add_stuff";
import ImagePicker from "react-native-image-picker";
import request_ADD_IMAGE from "./fetch_response_image";
import request_EDIT_AVATAR from "./fetch_update_avatar";
import request_DELETE_AVATAR from "./fetch_delete_avatar";
const ITEM_WIDTH = Dimensions.get('window').width;
const ITEM_HEIGHT = Dimensions.get('window').height;

export class Aavatar_Service extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            avatars_list: [],
            isVisible: false,
            photo: 'ic_portrait_deep_orange_700_48dp',
            upload_photo:'',
            name: '',
            price: 1,
            photos_list: [],
            my_id: this.props.screenProps.nic,
            avatar_id: '',
            name_modal: '',
            selector: null,
            loaded:true,


        }

    }

    fetch_avatar = async () => {

        const avatars_list = await request_GET_AvatarList();
        this.setState({avatars_list: avatars_list,loaded:false})

    };

    componentDidMount = async () => {

        await this.fetch_avatar()

    };

    change_avatar = async (avatar_id, price, name, url) => {
        this.setState({
            isVisible: !this.state.isVisible,
            avatar_id: avatar_id,
            price: price,
            name: name,
            name_modal: 'Изменить Картинку',
            photo: url,
            selector:1,
        })


    };


    close_modal_add = () => {
        this.setState({isVisible: false})

    };

    handleChoosePhoto = async () => { //выбираем фото из памяти телефона
        const options = {
            noData: true,
        };

        ImagePicker.launchImageLibrary(options, async response => {
            if (response.uri) {
                this.setState({photo: response.uri, upload_photo: response});
                Alert.alert("Фото загружено");
                this.componentWillUnmount();


            }


        });

        await this.componentDidMount()

    };

    create_update_delete_avatar = async () => {
        switch (this.state.selector) {
            case 0: //add avatar
                await this.send_responsible_photo();
                break;
            case 1: //edit avatar
                await this.send_edit_avatar();
                break;

            case 2: //delete avatar
                await this.send_delete_avatar();
                break;

            default:
                console.log('default');
                break;

        }
    };

    delete_action = async (avatar_id) => {
        this.setState({selector:2,avatar_id:avatar_id});
        Alert.alert(
            'Аватар',
            "Вы действительно хотите удалить аватар?",
            [

                {
                    text: 'Отмена',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {
                    text: 'OK', onPress: async () => {
                        await this.create_update_delete_avatar()
                    }
                },
            ],
            {cancelable: false},
        );


    };

    send_delete_avatar = async () => {
        await request_DELETE_AVATAR(this.state.my_id, this.state.avatar_id);
        Alert.alert('Аватар', 'Успешно удален!');
        await this.fetch_avatar()
    };

    send_edit_avatar = async () => {
        await request_EDIT_AVATAR(this.state.my_id, this.state.name, this.state.price, this.state.avatar_id);
        Alert.alert('Аватар', 'Редактирование прошло успешно!');
        this.setState({isVisible:!this.state.isVisible});
        await this.fetch_avatar()
    };
    send_responsible_photo = async () => {

         await request_ADD_IMAGE(this.state.my_id, this.state.name, this.state.price,this.state.upload_photo);
        this.setState({isVisible: false,loaded:true});
        await this.fetch_avatar()

    };
    change_name = (name) => {
        this.setState({name: name})
    };

    change_price = (price) => {
        this.setState({price: price})
    };

    render() {
        if (this.state.loaded) {
            return (
                <ActivityIndicator
                size="large"
                color="#254C6B"
                />
            )
        }
        return (
            <ScrollView>
                <ImageBackground
                    style={{resizeMode: 'contain', height: '100%', width: '100%'}}
                    source={{uri: 'background_airwaychat'}}>
                    <View>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={{color: 'red', fontSize: 25}}> Добавить Аватар</Text>
                            <TouchableOpacity
                                    onPress={() => this.setState({
                                        isVisible: true,
                                        selector:0,
                                        name_modal: 'Добавить Картинку',
                                        name: '',
                                        photo: 'ic_portrait_deep_orange_700_48dp'
                                    })}
                            >
                                <Icon
                                    size={35}
                                    style={{color: 'black', marginLeft: 15}}
                                    name="plus"/>
                            </TouchableOpacity>

                        </View>
                        <View style={{backgroundColor: 'black', height: 1, width: '100%'}}/>

                        <FlatList style={{backgroundColor: 'rgba(60,62,94,0)'}}
                                  contentContainerStyle={{
                                      justifyContent: 'center',
                                  }}
                                  numColumns={4}
                                  data={this.state.avatars_list}
                                  renderItem={({item}) => {
                                      return (
                                          <View style={{
                                              flex: 1,
                                              margin: 5,
                                              borderColor: '#010101'
                                          }}>
                                              <TouchableOpacity
                                                  onPress={() => this.change_avatar(item.id, item.price, item.name, item.url)}
                                                  onLongPress={()=>this.delete_action(item.id)}
                                              >
                                                  <FastImage source={{uri: item.url}} style={{
                                                      width: (ITEM_WIDTH) / 11,
                                                      height: (ITEM_HEIGHT / 14),
                                                      alignSelf: 'center'
                                                  }}
                                                             resizeMode={FastImage.resizeMode.contain}

                                                  />

                                                  <Text style={{color: 'black', fontSize: 10, textAlign: 'center'}}>
                                                      {item.name}

                                                  </Text>
                                                  <Text style={{textAlign: 'center', color: 'black'}}>
                                                      {item.price} руб.
                                                  </Text>
                                              </TouchableOpacity>
                                          </View>
                                      );
                                  }}
                                  keyExtractor={(item, index) => index.toString()}
                        />

                        <Modal_Add_stuff
                            isVisible={this.state.isVisible}
                            close_modal_add={this.close_modal_add}
                            photo={this.state.photo}
                            object_avatar={[this.state.name, this.state.price]}
                            handleChoosePhoto={this.handleChoosePhoto}
                            change_name={this.change_name}
                            change_price={this.change_price}
                            send_responsible_photo={this.create_update_delete_avatar}
                            name_modal={this.state.name_modal}
                            description={false}
                        />
                    </View>
                </ImageBackground>
            </ScrollView>


        )


    }
}
