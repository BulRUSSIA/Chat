import {BackHandler, FlatList, Image, StyleSheet, Text, ToolbarAndroid, TouchableOpacity, View} from "react-native";
import React from "react";
import Chatting from '../components/Chatting'
import request_ENTRY_USER_ROOM from '../actions/fetch_entry_user'
import request_MY_NICKNAME from '../actions/fetch_my_nickname'
import Rooms_list from './const/Room_List'
import Rooms_banned from './const/Room_list_banned'

export default class Rooms extends React.Component {
    constructor(props) {
        super(props);






        this.state = {

            DataSource: [],
            item_menu: this.props.roomlist,
            room:'',
            name:this.props.name,
            rooms_Unbanned: Rooms_list,
            rooms_Banned:Rooms_banned,




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
        if (prison === true)



        {


            this.setState({item_menu:this.state.rooms_Banned})


       }

        else

            {



                this.setState({item_menu:this.state.rooms_Unbanned})

        }





    };


    Get_room  = async(event) => {
        let prison = this.props.prison;


        console.log('CHECKING' + prison);
        if (prison === true)

        {

            const a = this.props.name;
            const Nick_chats = await request_MY_NICKNAME(this.props.name);
           await request_ENTRY_USER_ROOM(event,a);




            const {router} = this.props;
            router.push.Chatting({nic: this.props.name, room: event,chat_name:Nick_chats});

        }

        else {
            const Nick_chats = await request_MY_NICKNAME(this.props.name);

            console.log(Nick_chats);

            const a = this.props.name;
            await request_ENTRY_USER_ROOM(event,a);


            const {router} = this.props;
            router.push.Chatting({nic: this.props.name, room: event, chat_name:Nick_chats});
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






                            <TouchableOpacity   onPress={(event)=>this.Get_room(item)} >
                            <View style={{flex: 1, flexDirection: 'row'}}>

                                <Image source={require('./Image/room1.jpeg')} style={styles.imageView}/>


                                <Text style={styles.rooms}>
                                    {item}


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
        width:'100%'

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


    },

    containerToolbar: {

        flexDirection: 'column',
        height: 50,
        width: "100%",


        backgroundColor: '#06b3e9',
    },


});




