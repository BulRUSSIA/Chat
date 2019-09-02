import {
    BackHandler,
    FlatList,
    Image,
    ImageBackground,
    StyleSheet,

    ToolbarAndroid,
    TouchableOpacity,
    View
} from "react-native";
import React from "react";
import Chatting from '../../components/Chatting/Chatting'
import request_GET_MESSAGES_PRIVATE from "../../actions/fetch_private_message";
import {

    Header,

    Title,
    Button,
    Icon,
    Left,
    Body,

    Text,

    Right,
    Picker
} from 'native-base';
import request_DELETE_PERSONALROOMS_ALL from "../../actions/fetch_delete_personalrooms_all";

const menuitem = [{title: 'Удалить все чаты', show: 'never', eventkey: 1},];


export default class Private_List extends React.Component {
    constructor(props) {
        super(props);


        this.state = {

            DataSource: this.props.private_user_list,
            item_menu: menuitem,
            selected: undefined,
            animating: true,


        };

        console.log('userslist' + this.state.DataSource)
    }

    onValueChange = async (value: string) => {




        if (value === 'key1') {

            const delete_personal = await request_DELETE_PERSONALROOMS_ALL(this.props.nic);
            this.props.select(0);
            this.componentWillUnmount();




        }
    };




    onActionSelected = async (position) => {


        if (position === 0) {
            console.log("lol");


        }


    };

    componentWillUnmount() {

        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
        clearInterval(Chatting.interval);
    }

    handleBackButton = () => {


        return true

    };


    Get_Chat = async (event, chatter) => {
        const get_private = await request_GET_MESSAGES_PRIVATE(event);

        const {router} = this.props;

        router.push.Private({
            room: this.props.room,
            nic: this.props.nic,
            chat_name: this.props.chat_name,
            private_room: event,
            private_chatter: chatter,
            private_data: get_private,
            list_data: this.state.DataSource


        });

    };


    render() {


        const {router} = this.props;


        return (


            <View style={styles.container1}>
                <ImageBackground source={require('../Image/fon_private.webp')} style={{width: '100%', height: '100%'}}>


                    <Header style={{backgroundColor: '#25566e'}}
                            onActionSelected={this.onActionSelected.bind(this)}
                            actions={this.state.item_menu}>

                        <Left style={{flex: 1}}>
                            <Button transparent

                                    onPress={() => router.pop({
                                        room: this.props.room,
                                        nic: this.props.nic,
                                        chat_name: this.props.chat_name,
                                    })}>
                                <Icon
                                    style={{color: 'white'}}
                                    name="ios-arrow-back"/>
                            </Button>

                        </Left>
                        <Body>
                            <Title>Приват</Title>
                        </Body>

                        <Right>


                            <Picker
                                mode="dropdown"
                                iosIcon={<Icon name="Stop"/>}


                                placeholderStyle={{color: "#bfc6ea"}}
                                placeholderIconColor="#ffffff"
                                style={{color: 'white'}}
                                selectedValue={this.state.selected}
                                onValueChange={this.onValueChange.bind(this)}
                            >

                                <Picker.Item label="Платные опции" value="key0"/>
                                <Picker.Item label="Удалить диалоги" value="key1"/>
                            </Picker>
                        </Right>


                    </Header>


                    <FlatList


                        data={this.state.DataSource}
                        extraData={this.state}


                        renderItem={(({item}) =>


                                <TouchableOpacity
                                    onPress={(event) => this.Get_Chat(item.Chat_id, item.Private_Chatters)}>
                                    <View style={{
                                        flexDirection: 'row',
                                        flex: 1,
                                        backgroundColor: '#92b4bb',
                                        marginTop: 5,
                                        borderRadius: 14
                                    }}>

                                        <Image source={require('../Image/people_private.png')}
                                               style={styles.imageView}/>


                                        <Text style={styles.rooms}>
                                            {item.Private_Chatters}


                                        </Text>
                                        <Text style={styles.time_msg}>

                                            {item.last_data}


                                        </Text>


                                        <Text style={styles.time}>

                                            {item.last_msg}


                                        </Text>
                                        <Image source={require('../Image/private_msg.png')}
                                               style={styles.imageViewmsg}/>


                                    </View>
                                </TouchableOpacity>
                        )
                        }


                        keyExtractor={(item, index) => index.toString()}
                        // contentContainerStyle={{paddingTop: 10}}


                    />
                    <ToolbarAndroid style={styles.containerToolbardown}>


                    </ToolbarAndroid>

                </ImageBackground>

            </View>


        );

    }
}


const styles = StyleSheet.create({


    container1: {

        backgroundColor: '#E8F6FF',
        width: '100%',


    },
    rooms: {
        fontSize: 14,
        flex: 1,
        color: 'rgba(0,0,0,0.98)',
        marginTop: 2,
        fontWeight: 'bold'


    },

    time: {
        fontSize: 10,
        flex: 1,
        color: 'rgba(255,255,255,0.98)',
        marginRight: 2,
        marginTop: 2


    },
    time_msg: {
        fontSize: 14,
        flex: 1,
        color: 'rgba(2,4,6,0.98)',

        marginTop: 25,
        textAlign: 'left',
        //  paddingTop: 5,


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
        marginBottom: 12,
        marginTop: 25,
        borderRadius: 7,


    },
    imageViewmsg: {

        width: 20,
        height: 20,
        paddingBottom: 1,
        marginBottom: 12,
        marginTop: 30,
        marginRight: 20,


    },
    imageViewmsg1: {

        width: 20,
        height: 20,
        paddingBottom: 1,
        marginBottom: 8,
        marginTop: 10,

        marginRight: 20,


    },

    instructions: {

        textAlign: 'left',

        color: '#e5e5e5',
        fontSize: 30,
        flex: 1,
        paddingLeft: 120,
        alignSelf: 'center',
        fontWeight: 'bold',


    },

    instructions1: {


        color: '#e5e5e5',
        fontSize: 25,

        paddingLeft: 262,
        marginTop: 10,

        paddingBottom: 30,
        marginBottom: 20,
        fontWeight: 'bold'


    },

    containerToolbar: {

        flexDirection: 'column',
        height: 50,
        width: "100%",


        backgroundColor: '#25566e',
    },

    containerToolbardown: {


        marginTop: 5,
        flexDirection: 'column',
        height: 30,
        width: "100%",


        backgroundColor: '#25566e',
    },


});




