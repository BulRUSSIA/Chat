import {

    View, TouchableOpacity, Text, ImageBackground, Dimensions, Alert
} from 'react-native';
import React from "react";
import {OptimizedFlatList} from 'react-native-optimized-flatlist'

const {width, height} = Dimensions.get('window');
import FastImage from "react-native-fast-image";
import {Body, Button, Header, Left, Right, Title} from "native-base";
import Icon from "react-native-vector-icons/AntDesign";
import request_GET_USER_PHOTO from "../../actions/fetch_get_photo_user";

export class Photo_without_redactor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            itemsCount: 12,
            isFetching: false,
            end: 0,
            photo: 'ic_portrait_deep_orange_700_48dp',
            photos_list: []

        };


    }

    convert_time = (timestamp) => {


        console.log(typeof (timestamp));
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
        console.log('user',this.props.nic_id);
        this.setState({photos_list: photos_list});

    };

    componentDidMount = async () => {

        await this.fetch_list()
    };


    View_full_photo = async (attach) => { //# переход на страницу просмотра фото целиком передаем туда attach с телефона
        const {navigator} = this.props;
        await navigator.push('PHOTO_VIEWER', {

            photo_attachments: attach,
        });
    };


    renderNewItem = () => {
        if (this.state.itemsCount < this.state.photos_list.length) {
            this.setState((prevState) => ({itemsCount: (prevState.itemsCount + 12), isFetching: false}));
        }


    };

    onRefresh = () => {

        this.setState({isFetching: true}, () => this.renderNewItem());
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


                    </Header>
                    <Text style={{color: 'red', textAlign: 'center'}}>
                        Фотографии отсутствуют
                    </Text>

                </ImageBackground>
            );


        else {


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
<Right/>

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


                    </ImageBackground>
                </View>
            )

        }
    }
}
