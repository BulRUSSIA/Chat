import {BackHandler, View, Alert, ImageBackground, AsyncStorage, Dimensions} from "react-native";
import React from "react";
import Chatting from '../../components/Chatting/Chatting'
import request_ENTRY_USER_ROOM from '../../actions/fetch_entry_user'
import request_MY_NICKNAME from '../../actions/fetch_my_nickname'
import request_GET_ROOMS from "../../actions/fetch_get_rooms";
import {
    Container,
    Body,

    Text,
    ListItem,
    Thumbnail,
    Right
} from 'native-base';
import ListRooms from "./ListRooms";
import Footer_rooms from "./Footer_rooms";
import Header_rooms from "./Header_rooms";
import request_all_users from "../../actions/fetch_all_users";
import ModalRoomsActions from "./ModalRoomsActions";
import request_UPDATE_CATEGORIES from "../../actions/fetch_update_categories";
import request_DELETE_CATEGORIES from "../../actions/fetch_delete_category";
import request_CREATE_CATEGORIES from "../../actions/fetch_create_category";
import request_CREATE_ROOM from "../../actions/fetch_create_room";
import {TYPE_ADMIN, TYPE_BANNED, TYPE_INVISIBLE, TYPE_MODERATOR, TYPE_USER} from "../const/const type_user_chats";

const {width} = Dimensions.get('window');
const checkbox = [{checked: false, id: 0, name: 'Пользователь', disable_item: false, mask: 1},
    {checked: true, id: 1, name: 'Администратор', disable_item: true, mask: 2},
    {checked: false, id: 2, name: 'Невидимка', disable_item: false, mask: 16},
    {checked: false, id: 3, name: 'Забаненный', disable_item: false, mask: 8},
    {checked: false, id: 4, name: 'Модератор', disable_item: false, mask: 4}];

export default class Rooms extends React.Component {
    constructor(props) {
        super(props);


        this.state = {


            item_menu: null, //ite1m_menu ==9 2сп4ис12ок10 ко10мнат--
            isFetching: false,
            all_users_online: null,
            category_name_toolbar: null,
            category_update: null,
            parent_prev: null,
            isVisible: false,
            parent: null,
            text_change: '',
            parent_name: 'Комнаты',
            name_create: this.props.category_name_toolbar,
            mask: 0,
            rooms_set_change: null,
            list: checkbox,
            size_rooms: 18,


        };


    }


    componentDidMount = async () => {


        try {

            const count_all_users = await request_all_users();
            const rooms = await request_GET_ROOMS(this.props.category_update);
            const all = count_all_users['all'];
            const Nick_chats = await request_MY_NICKNAME(this.props.name);


            const size_rooms = await AsyncStorage.getItem('size_rooms');


            // We have data!!
            this.setState({
                size_rooms: Number(size_rooms),
                item_menu: rooms,
                all_users_online: all,
                category_name_toolbar: 'Комнаты',
                category_update: '-1',
                parent: '-1',
                type_user: Nick_chats[1],
                chat_name: Nick_chats[0]

            });


            console.log(this.state.size_msg);


        } catch (error) {
            console.log('error -asyncstore', error)
        }


    };


    checkThisBox = (itemID) => {
        let list = this.state.list;
        list[itemID].checked = !list[itemID].checked;
        this.setState({list: list});
        console.log(this.state.list)
    };

    ChangeNameCreateRooms = (name) => {


        this.setState({name_create: name});


    };

    hideRoomsMenu = () => {

        this.setState({isVisible: !this.state.isVisible});


    };

    mask_count = async (item) => {
        await this.hideRoomsMenu();
        let list = this.state.list;
        let arr = [];

        for (let i = 0; i < list.length; i++) {
            let obj = list[i];


            let mask = obj.mask;
            let checked = obj.checked;
            if (checked === true) {

                arr.push(mask);
            }


        }

        this.setState({mask: arr});

        switch (item) {

            case 0:
                await request_UPDATE_CATEGORIES(this.props.name, this.state.name_create, this.state.category_update, this.state.mask);
                break;

            case 1:

                await this.Create_category();
                break;


            case 2:

                await this.Create_room();
                break;

        }


        await this.Get_update(this.state.category_update)

    };


    Get_update = async (category) => {


        const refr = await request_GET_ROOMS(category);
        const count_all_users = await request_all_users();
        const all = count_all_users['all'];
        this.setState({
            item_menu: refr,
            isFetching: false,
            all_users_online: all
        })


    };

    onRefresh = () => {

        this.setState({isFetching: true}, () => this.Get_update(this.state.category_update));
    };

    componentWillUnmount() {

        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
        clearInterval(Chatting.interval);
    }

    handleBackButton = () => {


        return true

    };


    Rooms_menu_selected = async (selected, name) => {

        switch (selected) {


            case 0:

                if (this.state.category_update === '-1') {

                    Alert.alert('Изменение категории', 'Эту категорию невозможно изменить')


                } else {

                    this.setState({text_change: 'Изменение категории', rooms_set_change: 0});
                    this.hideRoomsMenu();

                }
                break;

            case 1:
                this.setState({text_change: 'Добавление категории', rooms_set_change: 1});
                this.hideRoomsMenu();


                break;


            case 2:
                this.setState({text_change: 'Добавление комнаты', rooms_set_change: 2});
                this.hideRoomsMenu();
                break;

            case 3:
                if (this.state.category_update === '-1') {

                    Alert.alert('Удаление категории', 'Эту категорию невозможно удалить')


                } else {

                    this.setState({text_change: 'Удаление категории'});
                    await this.Delete_dialog('Вы хотите действительно хотите удалить категорию');

                }

                break;
        }


    };


    Delete_dialog = async (message) => {
        Alert.alert(
            '' + this.state.text_change,
            '' + message + '\t\t' + this.state.category_name_toolbar + '?', // <- this part is optional, you can pass an empty string
            [

                {
                    text: 'отмена',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },


                {
                    text: 'ок', onPress: async () => {
                        await this.Delete_category()
                    },


                }
            ],
            {cancelable: false},
        );


    };

    Delete_category = async () => {

        await request_DELETE_CATEGORIES(this.props.name, this.state.category_update);
        await this.back_room()


    };

    Create_category = async () => {
        await request_CREATE_CATEGORIES(this.props.name, this.state.name_create, this.state.category_update, this.state.mask);

    };


    Create_room = async () => {
        await request_CREATE_ROOM(this.props.name, this.state.name_create, this.state.category_update, this.state.mask);


    };

    renderSeparator_1 = () => (
        <View
            style={{

                height: 1,

                width: '100%',
                backgroundColor: '#aaaaaa',


            }}
        />
    );


    room_view = (name, category, count,id) => {
        return (
            <ListItem
                onPress={() => this.Get_room(name, category, count, id)}>
                <Thumbnail source={{uri: 'room_arrow'}}
                           style={{
                               width: this.state.size_rooms * 2.5,
                               height: this.state.size_rooms * 2.5
                           }}/>
                <Body>
                    <Text style={{color: 'black', fontSize: this.state.size_rooms,fontWeight:'bold'}}>
                        {name}


                    </Text>
                </Body>
                <Right>

                    <Text style={{
                        color: '#ff361c',
                        fontSize: this.state.size_rooms,
                        textAlign: 'center',
                        fontWeight: 'bold'
                    }}>{count}</Text>

                </Right>

            </ListItem>
        )

    };

    category_view = (name, parent, id) => {

        return (

            <ListItem style={{width: '100%'}}
                      onPress={() => this.Get_category(name, parent, id)}>
                <Thumbnail source={{uri: 'go_folder'}} style={{
                    width: this.state.size_rooms * 2.5,
                    height: this.state.size_rooms * 2.5,
                    resizeMode: 'contain'
                }}/>
                <Body>
                    <Text style={{color: 'black', fontSize: this.state.size_rooms,fontWeight:'bold'}}>
                        {name}


                    </Text>
                </Body>


            </ListItem>
        )


    };


    _renderItem = ({item}) => {

        let mask = item.mask;

        switch (this.state.type_user) {

            case TYPE_ADMIN:

                if (item.parent){

                    return this.category_view(item.name, item.parent, item._id.$oid)
                }

                return this.room_view(item.name, item.category, item.count,item._id.$oid);


            case TYPE_MODERATOR:

                let moder = ((mask & TYPE_MODERATOR) === TYPE_MODERATOR);

                if (moder) {

                    if (item.parent) {

                        return this.category_view(item.name, item.parent, item._id.$oid)
                    }

                    return this.room_view(item.name, item.category, item.count,item._id.$oid)
                }
                break;

            case TYPE_BANNED:
                let banned = ((mask & TYPE_BANNED) === TYPE_BANNED);
                if (banned) {


                    return this.room_view(item.name, item.category, item.count,item._id.$oid)
                }
                break;

            case TYPE_USER:
                let user = ((mask & TYPE_USER) === TYPE_USER);
                if (user) {
                    if (item.parent) {

                        return this.category_view(item.name, item.parent, item._id.$oid)
                    }

                    return this.room_view(item.name, item.category, item.count,item._id.$oid)
                }
                break;

            case TYPE_INVISIBLE:
                let invisible = ((mask & TYPE_INVISIBLE) === TYPE_INVISIBLE);
                if (invisible) {
                    if (item.parent) {

                        return this.category_view(item.name, item.parent, item._id.$oid)
                    }

                    return this.room_view(item.name, item.category, item.count,item._id.$oid)
                }
                break;


        }


    };

    Get_category = async (name, parent, category_id) => {
        console.log('category1=', category_id);
        console.log('parent=', parent);

        const count_all_users = await request_all_users();
        const rooms = await request_GET_ROOMS(category_id);
        const all = count_all_users['all'];
        const Nick_chats = await request_MY_NICKNAME(this.props.name);


        this.setState({
            item_menu: rooms,
            parent_name: this.state.category_name_toolbar,
            all_users_online: all,
            category_name_toolbar: name,
            category_update: category_id,
            parent: parent,
            type_user: Nick_chats[1],
            chat_name: Nick_chats[0],
        })

    };


    Get_room = async (name, category, count, id) => {



        console.log('room_id=:' + id);
        const Nick_chats = await request_MY_NICKNAME(this.props.name);


        const a = this.props.name;
        await request_ENTRY_USER_ROOM(name, a);


        const {navigator} = this.props;
        navigator.reset('Chatting', {

            nic: this.props.name,
            room: id,
            room_name:name,
            category_name_toolbar: this.state.category_name_toolbar,
            nic_color:Nick_chats[2],
            nic_avatar:Nick_chats[3],
            chat_name: Nick_chats[0],
            type_user: Nick_chats[1],
            item_menu: this.state.item_menu,
            category_update: this.state.category_update,
            count: this.props.count,
            parent: this.state.parent,



        });


    };


    back_room = async () => {


        await this.setState({isFetching: true},

            async () => {

                await this.Get_category(this.state.category_name_toolbar, '-1', this.state.parent)

            });

        await this.setState({isFetching: false})

    };


    render() {


        return (


            <Container style={{backgroundColor: '#3c3e5e',}}>
                <ImageBackground
                    style={{resizeMode: 'contain', height: '100%', width: '100%'}}
                    source={{uri: 'default_background'}}>

                    <Header_rooms
                        back_room={this.back_room}
                        count={this.state.all_users_online}
                        Rooms_menu_selected={this.Rooms_menu_selected}
                        category_name_toolbar={this.state.category_name_toolbar}
                        type_user={this.state.type_user}

                    />
                    <ModalRoomsActions
                        hideRoomsMenu={this.hideRoomsMenu}
                        list_checkbox={this.state.list}
                        isVisible={this.state.isVisible}
                        textchange={this.state.text_change}
                        ChangeNameCreateRooms={this.ChangeNameCreateRooms}
                        checkThisBox={this.checkThisBox}
                        name_create={this.state.name_create}
                        mask_count={this.mask_count}
                        set_change={this.state.rooms_set_change}


                    />


                    <ListRooms
                        _renderItem={this._renderItem}
                        item_menu={this.state.item_menu}
                        onRefresh={this.onRefresh}
                        refreshing={this.state.isFetching}
                        sep={this.renderSeparator_1}
                    />

                    {/*<Footer_rooms/>*/}
                </ImageBackground>
            </Container>


        );

    }
}


