import {BackHandler, View, Alert} from "react-native";
import React from "react";
import Chatting from '../../components/Chatting/Chatting'
import request_ENTRY_USER_ROOM from '../../actions/fetch_entry_user'
import request_MY_NICKNAME from '../../actions/fetch_my_nickname'
import Rooms_list from '../const/Room_List'
import Rooms_banned from '../const/Room_list_banned'
import request_GET_ROOMS from "../../actions/fetch_get_rooms";
import {
    Container,
    Body,
    Badge,
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


export default class Rooms extends React.Component {
    constructor(props) {
        super(props);


        this.state = {

            DataSource: [],
            item_menu: this.props.roomlist, //item_menu ==9 2сп4ис12ок0 ко0мнат-
            categories_list: this.props.categorieslist,
            room: '',
            name: this.props.name,
            rooms_Unbanned: Rooms_list,
            rooms_Banned: Rooms_banned,
            isFetching: false,
            all_users_online: this.props.count,
            category_name_toolbar: this.props.category_name_toolbar,
            category_update: this.props.category_update,
            isVisible: false,
            text_change: '',
            name_create: this.props.category_name_toolbar,
            update_root:'',
            previous_category:this.props.previous_category,
            mask: 0,
            rooms_set_change:null,
            list: [{checked: false, id: 0, name: 'Пользователь', disable_item: false, mask: 1},
                {checked: true, id: 1, name: 'Администратор', disable_item: true, mask: 2},
                {checked: false, id: 2, name: 'Невидимка', disable_item: false, mask: 16},
                {checked: false, id: 3, name: 'Забаненный', disable_item: false, mask: 8},
                {checked: false, id: 4, name: 'Модератор', disable_item: false, mask: 4}],


        };


    }

    checkThisBox =  (itemID) => {
        let list = this.state.list;
        list[itemID].checked = !list[itemID].checked;
        this.setState({list: list});
        console.log(this.state.list)
    };

    ChangeNameCreateRooms = (name) => {



        this.setState({name_create: name});




};

    hideRoomsMenu =  () => {

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

                    this.setState({text_change: 'Изменение категории',rooms_set_change:0});
                     this.hideRoomsMenu();

                }
                break;

            case 1:
                this.setState({text_change: 'Добавление категории',rooms_set_change:1});
                this.hideRoomsMenu();


                break;


            case 2:
                this.setState({text_change: 'Добавление комнаты',rooms_set_change:2});
                 this.hideRoomsMenu();
                break;

            case 3:
                if (this.state.category_update === '-1') {

                    Alert.alert('Удаление категории', 'Эту категорию невозможно удалить')


                } else {

                    this.setState({text_change: 'Удаление категории'});
                 await   this.Delete_dialog('Вы хотите действительно хотите удалить категорию');

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

    Create_category = async ()=> {
        await request_CREATE_CATEGORIES(this.props.name,this.state.name_create,this.state.category_update,this.state.mask);

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


    _renderItem = ({item}) => {

        if (item.parent) {


            return (

                <ListItem
                    onPress={(event) => this.Get_category(item.name, item.parent, item._id.$oid)}>
                    <Thumbnail source={{uri: 'go_folder'}} style={{width: 20, height: 20, resizeMode: 'contain'}}/>
                    <Body>
                        <Text style={{color: 'white', fontSize: 20}}>
                            {item.name}


                        </Text>
                    </Body>


                </ListItem>
            )
        }


        return (


            <ListItem
                onPress={(event) => this.Get_room(item.name, item.category, item.count)}>
                <Thumbnail source={{uri: 'room_arrow'}} style={{width: 20, height: 20}}/>
                <Body>
                    <Text style={{color: 'white', fontSize: 20}}>
                        {item.name}


                    </Text>
                </Body>
                <Right>
                    <Badge style={{backgroundColor: '#a5a5a5'}}>
                        <Text style={{color: '#ff0112'}}>{item.count}</Text>
                    </Badge>
                </Right>

            </ListItem>


        )


    };

    Get_category = async (name, parent, category_id) => {


        const Nick_chats = await request_MY_NICKNAME(this.props.name);

        console.log(Nick_chats);
        const rooms = await request_GET_ROOMS(category_id);
        const {router} = this.props;



        router.push.Rooms({
            name: this.props.name,
            category_update: category_id,
            previous_category:this.state.category_update,
            chat_name: Nick_chats[0],
            type_user: Nick_chats[1],
            roomlist: rooms,
            count: this.props.count,
            category_name_toolbar: name

        },{type: 'fade', duration: 100, easing: 'ease' });


    };





    Get_room = async (event, category, parent) => {


        const Nick_chats = await request_MY_NICKNAME(this.props.name);

        console.log(Nick_chats);

        const a = this.props.name;
        await request_ENTRY_USER_ROOM(event, a);


        const {router} = this.props;
        router.push.Chatting({

            nic: this.props.name,
            room: event,
            chat_name: Nick_chats[0],
            type_user: Nick_chats[1],
            item_menu: this.state.item_menu,

        },{type: 'fade', duration: 100, easing: 'ease' });


    };


    back_room = async () => {

        const {router} = this.props;

        router.pop();



    };


    render() {


        return (


            <Container style={{backgroundColor: '#3c3e5e',}}>

                <Header_rooms
                    back_room={this.back_room}
                    count={this.state.all_users_online}
                    Rooms_menu_selected={this.Rooms_menu_selected}
                    category_name_toolbar={this.state.category_name_toolbar}
                    type_user={this.props.type_user}

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

                <Footer_rooms/>

            </Container>


        );

    }
}


