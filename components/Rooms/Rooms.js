import {BackHandler, FlatList,  StyleSheet, View} from "react-native";
import React from "react";
import Chatting from '../../components/Chatting/Chatting'
import request_ENTRY_USER_ROOM from '../../actions/fetch_entry_user'
import request_MY_NICKNAME from '../../actions/fetch_my_nickname'
import Rooms_list from '../const/Room_List'
import Rooms_banned from '../const/Room_list_banned'
import request_GET_ROOMS from "../../actions/fetch_get_rooms";
import {
    Container,
    Header,
    Footer,
    Title,
    Button,
    Icon,
    Left,
    Body,
    Badge,
    Text,
    ListItem,
    Thumbnail,
    Right
} from 'native-base';


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
                borderColor: '#2c5577'

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

        console.log('roooooms')


        if ((item.category === '5c9a60fd0a975a14c67bcd7c')
            || (item.category === '5c9a61080a975a14c67bcdab')
            // (item.category === '5c9a62560a975a168bff8a8f')
            || (item.room === '\u041a\u0411\u0420')
            || (item.room === 'Украина 🇺🇦 ')
            || (item.room === 'Регионы')
            || (item.room === 'Секс')
            || (item.category==='5da58e010a975a3ece27314a')
        // || (item.category === '5d0342090a975a0b991e6b0d')


        ) {


            return (


                <ListItem
                    onPress={(event) => this.Get_room(item.room, item.category, item.parent_category, item.count)}>
                    <Thumbnail square source={require('../Image/go_folder.png')}/>
                    <Body>
                        <Text style={{color: 'white', fontSize: 20}}>
                            {item.room}


                        </Text>
                    </Body>


                </ListItem>


            )
        } else {


            return (


                <ListItem
                    onPress={(event) => this.Get_room(item.room, item.category, item.parent_category, item.count)}>
                    <Thumbnail source={require('../Image/go_room.png')}/>
                    <Body>
                        <Text style={{color: 'white', fontSize: 20}}>
                            {item.room}


                        </Text>
                    </Body>
                    <Right>
                        <Badge>
                            <Text>{item.count}</Text>
                        </Badge>
                    </Right>

                </ListItem>


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
            || (parent ==='5da58e010a975a3ece27314a')
            || (parent === '5ca287980a975a5cf7ca1f4d')
            || (event === '\u041c\u0427\u0421')
            || (event === '\u0413\u0443\u0434\u0435\u0440\u043c\u0435\u0441')
            || (event === '\u0410\u0440\u0433\u0443\u043d')
            || (event === '\u0421\u0438\u043d\u043a\u044a\u0435\u0440\u0430\u043c')
            || (event === 'Sex.\u041e\u0431\u0449\u0430\u044f')
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
                    chat_name: Nick_chats[0],
                    type_user: Nick_chats[1],
                    item_menu: this.state.item_menu,

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
                    chat_name: Nick_chats[0],
                    type_user: Nick_chats[1],
                    item_menu: this.state.item_menu,

                });
            }
        } else {
            const Nick_chats = await request_MY_NICKNAME(this.props.name);
            console.log('category' + category);
            console.log(Nick_chats);
            const rooms = await request_GET_ROOMS(category);
            const {router} = this.props;

                router.push.Rooms({
                    name: this.props.name,

                    chat_name: Nick_chats[0],
                    type_user: Nick_chats[1],
                    roomlist: rooms,
                    count: this.props.count
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

//<Text style={styles.instructions}>Комнаты</Text>   <Text style={styles.all_user_chat}>онлайн:{this.props.count}</Text>
//
//                             <Image source={require('./Image/dot_green.png')}
//                                    style={styles.imageViewToolbarDot}/>

    render() {


        return (


            <Container style={{backgroundColor: '#88a8b6',}}>

                <Header style={{backgroundColor: '#25566e',}}
                 androidStatusBarColor="#25566e"
                >
                    <Left style={{flex: 1}}>
                        <Button transparent

                                onPress={this.back_room}>
                            <Icon

                                name="ios-arrow-back"/>
                        </Button>
                    </Left>
                    <Body style={{flex: 4, justifyContent: 'center', alignItems: 'center',}}>
                        <Title
                            style={{fontSize: 25}}>Комнаты</Title>
                    </Body>
                    <Body style={{flex: 3, justifyContent: 'center', alignItems: 'center'}}>
                        <Title> онлайн:{this.props.count}</Title>

                    </Body>
                    <Badge primary style={{backgroundColor: '#50d36e', width: 24, marginTop: 10,}}>

                    </Badge>
                </Header>


                <FlatList


                    data={this.state.item_menu}
                    extraData={this.state}


                    ItemSeparatorComponent={this.renderSeparator_1}


                    renderItem={this._renderItem}


                    keyExtractor={(item, index) => index.toString()}


                />
                <Footer style={{backgroundColor: '#25566e', height: '5%'}}>

                </Footer>

            </Container>


        );

    }
}


