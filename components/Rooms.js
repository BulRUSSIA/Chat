import {BackHandler, FlatList, Image, StyleSheet, Text, ToolbarAndroid, TouchableOpacity, View} from "react-native";
import React from "react";
import Chatting from '../components/Chatting'
import request_ENTRY_USER_ROOM from '../actions/fetch_entry_user'
import request_MY_NICKNAME from '../actions/fetch_my_nickname'
import Rooms_list from './const/Room_List'
import Rooms_banned from './const/Room_list_banned'
import request_GET_ROOMS from "../actions/fetch_get_rooms";
import request_GET_MESSAGES from "../actions/fetch_get_messages";


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
                backgroundColor: '#2c5577',
                height: 1,
                borderWidth: 1,
                borderColor:'#2c5577'

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

    _renderItem = ({item}) => {


        if ((item.category === '5c9a60fd0a975a14c67bcd7c')
            || (item.category === '5c9a61080a975a14c67bcdab')
            // (item.category === '5c9a62560a975a168bff8a8f')
            || (item.room === '\u041a\u0411\u0420')
            || (item.room === 'Украина 🇺🇦 ')
            || (item.room === 'Регионы')
            || (item.room === 'Секс')
        // || (item.category === '5d0342090a975a0b991e6b0d')


        ) {


            return (


                <TouchableOpacity
                    onPress={(event) => this.Get_room(item.room, item.category, item.parent_category, item.count)}>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <Image source={require('./Image/go_folder.png')} style={styles.imageView}/>

                        <Text style={styles.rooms}>
                            {item.room}


                        </Text>


                    </View>
                </TouchableOpacity>


            )
        } else {


            return (


                <TouchableOpacity
                    onPress={(event) => this.Get_room(item.room, item.category, item.parent_category, item.count)}>
                    <View style={{flex: 1, flexDirection: 'row'}}>

                        <Image source={require('./Image/go_room.png')} style={styles.imageView}/>


                        <Text style={styles.rooms}>
                            {item.room}


                        </Text>
<View style={{flex:1,flexDirection:'row',marginTop:5,marginLeft:320,position:'absolute'}}>
    <Image source={require('./Image/circle.png')} style={styles.imageView1}/>
                        <Text style={styles.count_radius}>
                            {item.count}
                        </Text>
</View >

                    </View>
                </TouchableOpacity>


            )


        }

    };


    Get_room = async (event, category, parent, count) => {


        if ((parent === '-1')
            || (parent === '5c9a61080a975a14c67bcdab')
            // (parent === '5c9a62560a975a168bff8a8f')
            || (parent === '5c9a60fd0a975a14c67bcd7c')
            || (parent === '5d12088c0a975a06b5c3483b')
            || (parent === '5d0694370a975a1fec7eaba0')
            || (parent === '5ca287980a975a5cf7ca1f4d')
            || (event === '\u041c\u0427\u0421')
            || (event === '\u0413\u0443\u0434\u0435\u0440\u043c\u0435\u0441')
            || (event === '\u0410\u0440\u0433\u0443\u043d')
            || (event === '\u0421\u0438\u043d\u043a\u044a\u0435\u0440\u0430\u043c')
            || (event==='Sex.\u041e\u0431\u0449\u0430\u044f')
            || (parent === '5d5061490a975a4d4467fa52')

        ) {
            let prison = this.props.prison;



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
                roomlist: rooms,
                count:this.props.count
            });

        }


    };


    back_room = () => {

        const {router} = this.props;
        router.pop({
            name: this.props.name,

            chat_name: this.props.chat_name,
            roomlist: this.state.item_menu
        });


    };

//<Text style={styles.instructions}>Комнаты</Text>

    render() {


        return (


            <View style={styles.container1}>


                <ToolbarAndroid style={styles.containerToolbar}
                >


                    <TouchableOpacity onPress={this.back_room}>
                        <View style={styles.container2}>


                            <Image source={require('./Image/android-back-icon-20.jpg')}
                                   style={styles.imageViewToolbarArrow}/>


                            <Text style={styles.instructions}>Комнаты</Text>
                            <Text style={styles.all_user_chat}>онлайн:{this.props.count}</Text>

                            <Image source={require('./Image/dot_green.png')}
                                   style={styles.imageViewToolbarDot}/>


                        </View>
                    </TouchableOpacity>

                    <View style={styles.container2}>
                    </View>


                </ToolbarAndroid>


                <FlatList


                    data={this.state.item_menu}
                    extraData={this.state}


                    ItemSeparatorComponent={this.renderSeparator_1}


                    renderItem={this._renderItem}


                    keyExtractor={(item, index) => index.toString()}


                />
                <ToolbarAndroid style={styles.containerToolbar1}
                >


                </ToolbarAndroid>

            </View>


        );

    }
}


const styles = StyleSheet.create({


    container1: {

        backgroundColor: '#88a8b6',
        width: '100%',
        height: '100%'

    },

    container2: {

        backgroundColor:'transparent',
        width: '100%',
        height: '100%',
        borderRadius: 10,
        paddingTop:10,


    },

    count_radius: {





        marginTop:12,
        marginBottom:6,
        fontSize:15,
        color:'#fefcfe',
        position:'relative',
        marginLeft: 9,






    },
    rooms: {
        fontSize: 22,

        color: '#f7f7f7',
        paddingRight: 5,
        padding: 9,

        marginTop:5,
        paddingBottom: 10,




    },

    prices: {
        fontSize: 23,

        flex: 1,


        color: '#05077a',
        marginLeft: 1,
        padding: 9


    },
    imageView: {

        width: 30,
        height: 30,
        paddingBottom: 1,
        marginTop: 14,
        marginLeft: 5,
        backgroundColor:'transparent',



    },

    imageView1: {

        width: 34,
        height: 34,
        paddingBottom: 1,
        marginTop: 6,
        marginRight: 10,
        backgroundColor:'transparent',
        position:'absolute'



    },

    imageViewToolbarArrow: {

        width: 25,
        height: 25,
        marginTop: 11,
        position: 'absolute',

        flex: 1,
        paddingLeft: 20,


    },

    imageViewToolbarDot: {

        width: 15,
        height: 15,
        marginTop: 11,
        position: 'absolute',

        flex: 1,
        marginLeft: 320,


    },

    instructions: {


        color: '#FFF',
        fontSize: 30,
        flex: 1,
        position: 'absolute',
        marginLeft: 93,
        marginTop: 2,


        textAlign: 'center'


    },
    all_user_chat: {


        color: '#c0bec0',
        fontSize: 16,
        flex: 1,
        position: 'absolute',

        marginLeft: 240,
        marginTop: 14,


        textAlign: 'center'


    },

    containerToolbar: {


        flexDirection: 'row',
        height: 45,
        width: "100%",


        backgroundColor: '#25566e',
    },

    containerToolbar1: {


        flexDirection: 'column',
        height: 31,
        width: "100%",
        marginTop: 590,
        position: 'absolute',


        backgroundColor: '#25566e',
    },
});




