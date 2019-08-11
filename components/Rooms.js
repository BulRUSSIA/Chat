import {BackHandler, FlatList, Image, StyleSheet, Text, ToolbarAndroid, TouchableOpacity, View} from "react-native";
import React from "react";
import Chatting from '../components/Chatting'
import request_ENTRY_USER_ROOM from '../actions/fetch_entry_user'
import request_MY_NICKNAME from '../actions/fetch_my_nickname'
import Rooms_list from './const/Room_List'
import Rooms_banned from './const/Room_list_banned'
import request_GET_ROOMS from "../actions/fetch_get_rooms";

export default class Rooms extends React.Component {
    constructor(props) {
        super(props);


        this.state = {

            DataSource: [],
            item_menu: this.props.roomlist,
            room: '',
            name: this.props.name,
            rooms_Unbanned: Rooms_list,
            rooms_Banned: Rooms_banned,


        };


    }

    componentWillUnmount() {

        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
        clearInterval(Chatting.interval);
    }

    handleBackButton = () => {


        return true

    };

    renderSeparator_1 = () => (
        <View
            style={{
                backgroundColor: '#129af9',
                height: 1

            }}
        />
    );

    checking = () => {

        let prison = this.props.prison;
        if (prison === true) {


            this.setState({item_menu: this.state.rooms_Banned})


        } else {


            this.setState({item_menu: this.state.item_menu})

        }


    };


    Get_room = async (event, category, parent) => {


        if ((parent === '-1') || (parent === '5c9a61080a975a14c67bcdab') ||
            (parent === '5c9a62560a975a168bff8a8f')
            || (parent === '5c9a60fd0a975a14c67bcd7c')
            || (parent === '5d12088c0a975a06b5c3483b')
            || (parent === '5d0694370a975a1fec7eaba0')
            || (parent === '5ca287980a975a5cf7ca1f4d')
            || (event === '\u041c\u0427\u0421')
            || (event === '\u0413\u0443\u0434\u0435\u0440\u043c\u0435\u0441')
            || (event === '\u0410\u0440\u0433\u0443\u043d')
            || (event === '\u0421\u0438\u043d\u043a\u044a\u0435\u0440\u0430\u043c')
            || (parent==='5d0342090a975a0b991e6b0d')

        ) {
            let prison = this.props.prison;


            console.log('CHECKING' + prison);
            if (prison === true) {

                const a = this.props.name;
                const Nick_chats = await request_MY_NICKNAME(this.props.name);
                await request_ENTRY_USER_ROOM(event, a);


                const {router} = this.props;
                router.push.Chatting({
                    nic: this.props.name,
                    room: event,
                    chat_name: Nick_chats,
                    item_menu: this.state.item_menu
                });

            } else {
                const Nick_chats = await request_MY_NICKNAME(this.props.name);

                console.log(Nick_chats);

                const a = this.props.name;
                await request_ENTRY_USER_ROOM(event, a);


                const {router} = this.props;
                router.push.Chatting({
                    nic: this.props.name,
                    room: event,
                    chat_name: Nick_chats,
                    item_menu: this.state.item_menu
                });
            }
        } else {
            const Nick_chats = await request_MY_NICKNAME(this.props.name);
            console.log('category' + category);

            const rooms = await request_GET_ROOMS(category);
            const {router} = this.props;
            router.push.Rooms({
                name: this.props.name,

                chat_name: Nick_chats,
                roomlist: rooms
            });

        }


    };


    render() {


        return (


            <View style={styles.container1}>


                <ToolbarAndroid style={styles.containerToolbar}
                >


                    <View>
                        <Text style={styles.instructions}>Комнаты</Text>
                    </View>


                </ToolbarAndroid>


                <FlatList


                    data={this.state.item_menu}
                    extraData={this.state}


                    ItemSeparatorComponent={this.renderSeparator_1}


                    renderItem={(({item}) =>


                            <TouchableOpacity
                                onPress={(event) => this.Get_room(item.room, item.category, item.parent_category)}>
                                <View style={{flex: 1, flexDirection: 'row'}}>

                                    <Image source={require('./Image/room1.jpeg')} style={styles.imageView}/>


                                    <Text style={styles.rooms}>
                                        {item.room}


                                    </Text>


                                </View>
                            </TouchableOpacity>
                    )
                    }


                    keyExtractor={(item, index) => index.toString()}
                    contentContainerStyle={{paddingBottom: 36}}


                />

            </View>


        );

    }
}


const styles = StyleSheet.create({


    container1: {

        backgroundColor: '#E8F6FF',
        width: '100%'

    },
    rooms: {
        fontSize: 20,
        flex: 1,
        color: '#05077a',
        marginLeft: 1,
        padding: 9


    },

    prices: {
        fontSize: 25,

        flex: 1,


        color: '#05077a',
        marginLeft: 1,
        padding: 9


    },
    imageView: {

        width: 25,
        height: 25,
        paddingBottom: 1,
        marginTop: 12,
        borderRadius: 7,


    },

    instructions: {

        textAlign: 'center',

        color: '#FFF',
        fontSize: 30,
        flex: 1,
        paddingLeft: 91,
        alignSelf: 'center',
        marginTop: 10,


    },

    containerToolbar: {


        flexDirection: 'column',
        height: 45,
        width: "100%",


        backgroundColor: '#25566e',
    },


});




