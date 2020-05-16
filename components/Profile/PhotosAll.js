import {

    View, TouchableOpacity, Text, ImageBackground, Dimensions, Alert, ActivityIndicator
} from 'react-native';
import React from "react";
import {OptimizedFlatList} from 'react-native-optimized-flatlist'

const {width, height} = Dimensions.get('window');
import FastImage from "react-native-fast-image";
import {Body, Button, Header, Left, Right, Title} from "native-base";
import Icon from "react-native-vector-icons/AntDesign";
import Modal_add_photo from "../Modals/Modal_add_photo";
import ImagePicker from "react-native-image-picker";
import request_ADD_PHOTO from "../Profile_redactor/fetch_function/fetch_response_photos";
import request_GET_USER_PHOTO from "../../actions/fetch_get_photo_user";
import request_DELETE_PHOTO from "../Profile_redactor/fetch_function/fetch_delete_photo";
import request_SET_AVATAR_PHOTO from "../Profile_redactor/fetch_function/fetch_set_avatar_photo";
import Toast from "react-native-whc-toast";

export class PhotosAll extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            itemsCount: 12,
            isFetching: false,
            end: 0,
            isVisible: false,
            indicator:false,
            photo: 'ic_portrait_deep_orange_700_48dp',
            upload_photo: '',
            description: '',
            photos_list: []

        };


    }

    convert_time = (timestamp) => {
        const times = new Date(timestamp);
        let year = times.getFullYear().toString();
        let mounth = times.getMonth().toString();
        let day = times.getDate().toString();
        let hours = times.getHours().toString();
        let minutes = times.getMinutes().toString();
        let seconds = times.getSeconds().toString();


        return year + '-' + mounth + '-' + day + ' ' + hours + ':' + minutes + ":" + seconds
    };

    fetch_list = async () => {
        const photos_list = await request_GET_USER_PHOTO(this.props.nic_id);
        this.setState({photos_list: photos_list});

    };

    componentDidMount = async () => {
        await this.fetch_list()
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

    selected_action_photo = async (id_photo) => {
        Alert.alert(
            'ФОТО',
            "Выберите действие",
            [
                {
                    text: 'Отмена',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {
                    text: 'Удалить фото', onPress: async () => {
                        await request_DELETE_PHOTO(id_photo);
                        await this.fetch_list();
                        this.refs.toast.show('фотография успешно удалена');
                    }
                },
                {
                    text: 'Установить на профиль', onPress: async () => {
                        await request_SET_AVATAR_PHOTO(this.props.nic_id, id_photo);
                        await this.fetch_list();
                        this.refs.toast.show('Аватарка профиля установлена');
                    }
                },
            ],
            {cancelable: false},
        );


    };


    View_full_photo = async (attach) => { //# переход на страницу просмотра фото целиком передаем туда attach с телефона
        const {navigator} = this.props;
        await navigator.push('PHOTO_VIEWER', {
            photo_attachments: attach,
        });
    };
    send_responsible_photo = async () => {
        this.setState({indicator:true});
        await request_ADD_PHOTO(this.props.nic_id, false, this.state.description,this.state.upload_photo);
        this.setState({isVisible: false,indicator:false});
        await this.fetch_list()
    };


    renderNewItem = () => {
        if (this.state.itemsCount < this.state.photos_list.length) {
            this.setState((prevState) => ({itemsCount: (prevState.itemsCount + 12), isFetching: false}));
        }


    };

    onRefresh = () => {
        this.setState({isFetching: true}, () => this.renderNewItem());
    };

    close_modal_add_photo = () => {
        this.setState({isVisible: false,})

    };

    change_description = (text) => {
        this.setState({description: text})

    };

    render() {
        if (this.state.photos_list.length < 1)
            return (
                <ImageBackground source={{uri: 'background_airwaychat'}} style={{width: '100%', height: '100%'}}>
                    <Header
                        style={{backgroundColor: 'rgba(212,212,212,0.96)',}}
                        androidStatusBarColor="#A9A9A9">
                        <Left style={{flex: 1}}>
                            <Button transparent
                                    onPress={() => this.props.get_pop()}>
                                <Icon
                                    size={25}
                                    style={{color: 'black'}}
                                    name="arrowleft"/>
                            </Button>
                        </Left>
                        <Body>
                            <Title
                                style={{color: 'black', fontWeight: '200', fontSize: 16, width: 150}}>Фотографии</Title>
                        </Body>
                        <Right>
                            <Button transparent
                                    onPress={() => this.setState({isVisible: true})}>
                                <Icon
                                    size={35}
                                    style={{color: 'black'}}
                                    name="plus"/>
                            </Button>
                        </Right>

                    </Header>
                    <Text style={{color: 'red', textAlign: 'center'}}>
                        Фотографии отсутствуют.
                        Вы можете их добавить воспользовавшись крестиком сверху.
                    </Text>
                    <Modal_add_photo
                        change_description={this.change_description}
                        send_responsible_photo={this.send_responsible_photo}
                        close_modal_add_photo={this.close_modal_add_photo}
                        isVisible={this.state.isVisible}
                        photo={this.state.photo}
                        handleChoosePhoto={this.handleChoosePhoto}
                    />
                </ImageBackground>
            );
        else {
            if (this.state.indicator) {
                return (
                    <View>
                        <ImageBackground source={{uri: 'background_airwaychat'}} style={{width: '100%', height: '100%'}}>
                            <Header
                                style={{backgroundColor: 'rgba(212,212,212,0.96)',}}
                                androidStatusBarColor="#A9A9A9">
                                <Left style={{flex: 1}}>
                                    <Button transparent
                                            onPress={this.props.get_pop}>
                                        <Icon
                                            size={25}
                                            style={{color: 'black'}}
                                            name="arrowleft"/>
                                    </Button>
                                </Left>
                                <Body>
                                    <Title style={{
                                        color: 'black',
                                        fontWeight: '200',
                                        fontSize: 16,
                                        width: 150
                                    }}>Идет загрузка...</Title>
                                </Body>
                            </Header>
                    <ActivityIndicator
                        size="large"
                        color="#254C6B"
                    />
                        </ImageBackground>
                    </View>
                )

            }



            return (
                <View>
                    <ImageBackground source={{uri: 'background_airwaychat'}} style={{width: '100%', height: '100%'}}>
                        <Header
                            style={{backgroundColor: 'rgba(212,212,212,0.96)',}}
                            androidStatusBarColor="#A9A9A9">


                            <Left style={{flex: 1}}>
                                <Button transparent

                                        onPress={this.props.get_pop}>
                                    <Icon
                                        size={25}
                                        style={{color: 'black'}}
                                        name="arrowleft"/>
                                </Button>

                            </Left>
                            <Body>
                                <Title style={{
                                    color: 'black',
                                    fontWeight: '200',
                                    fontSize: 16,
                                    width: 150
                                }}>Фотографии</Title>
                            </Body>
                            <Right>
                                <Button transparent

                                        onPress={() => this.setState({isVisible: true})}>
                                    <Icon
                                        size={35}
                                        style={{color: 'black'}}
                                        name="plus"/>
                                </Button>
                            </Right>

                        </Header>
                        <OptimizedFlatList


                            updateCellsBatchingPeriod={100}
                            removeClippedSubviews={true}
                            onEndReached={this.onRefresh}
                            onEndReachedThreshold={1}


                            data={this.state.photos_list.slice(0, this.state.itemsCount)}
                            renderItem={({item}) => {
                                return (

                                    <TouchableOpacity style={{
                                        flexDirection: 'row', borderRadius: 0, margin: 2,
                                        borderWidth: 2,
                                        borderColor: '#878787',
                                    }}
                                                      onPress={() => this.View_full_photo(item.url)}
                                                      onLongPress={()=>this.selected_action_photo(item.key)}
                                    >


                                        <FastImage source={{uri: item.url}} style={{

                                            width: (width) * 0.4,
                                            height: (height) * 0.15,
                                            borderRadius: 0,
                                            borderWidth: 1,
                                            borderColor: '#000000',


                                        }}/>
                                        <Text>{this.convert_time(item.createdAt.$date)}</Text>
                                        <Text style={{
                                            flex: 1,
                                            textAlign: 'center',
                                            color: 'red'
                                        }}>{'\n' + item.description} </Text>
                                    </TouchableOpacity>

                                );
                            }}
                            keyExtractor={(item) => item.key}


                        />
                        <View>

                            <Toast ref="toast"
                                   style={{borderRadius: 14}}

                            />
                        </View>

                        <Modal_add_photo
                            change_description={this.change_description}
                            send_responsible_photo={this.send_responsible_photo}
                            close_modal_add_photo={this.close_modal_add_photo}
                            isVisible={this.state.isVisible}
                            photo={this.state.photo}
                            handleChoosePhoto={this.handleChoosePhoto}

                        />
                    </ImageBackground>
                </View>
            )

        }
    }
}
