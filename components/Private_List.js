import {BackHandler, FlatList, Image, StyleSheet, Text, ToolbarAndroid, TouchableOpacity, View} from "react-native";
import React from "react";
import Chatting from '../components/Chatting'
import request_ENTRY_USER_ROOM from '../actions/fetch_entry_user'
import request_MY_NICKNAME from '../actions/fetch_my_nickname'
import Rooms_list from './const/Room_List'
import Rooms_banned from './const/Room_list_banned'

export default class Private_List extends React.Component {
    constructor(props) {
        super(props);






        this.state = {

            DataSource: this.props.private_user_list





        };

        console.log('userslist' + this.state.DataSource)
    }

    componentWillUnmount() {

        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
        clearInterval(Chatting.interval);
    }
    handleBackButton = () => {


        return true

    };


    Get_Chat  = async(event) => {
        console.log(event);
        alert('service')
    };





    renderSeparator_1 = () => (
        <View
            style={{
                backgroundColor: '#129af9',
                height: 1

            }}
        />
    );





    render() {




        return (


            <View style={styles.container1}>


                <ToolbarAndroid style={styles.containerToolbar}
                >


                    <View>
                        <Text style={styles.instructions}>Чаты           </Text>
                    </View>


                </ToolbarAndroid>


                <FlatList inverted


                    data={this.state.DataSource}
                    extraData={this.state}


                    ItemSeparatorComponent={this.renderSeparator_1}


                    renderItem={(({item}) =>






                            <TouchableOpacity   onPress={(event)=>this.Get_Chat(item.Chat_id)} >
                                <View style={{flex: 1, flexDirection: 'row'}}>

                                    <Image source={require('./Image/email.png')} style={styles.imageView}/>

                                    <Text style={styles.time_msg}>

                                        { item.last_data}


                                    </Text>

                                    <Text style={styles.rooms}>
                                       {item.Private_Chatters}


                                    </Text>

                                    <Text style={styles.time}>

                                        {  item.last_msg}


                                    </Text>



                                </View>
                            </TouchableOpacity>
                    )
                    }


                    keyExtractor={(item, index) => index.toString()}
                          contentContainerStyle={{paddingTop: 40}}




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
        fontSize: 18,
        flex:1,
        color: 'rgba(0,0,0,0.98)',
        marginLeft: 10,



    },

    time: {
        fontSize: 15,
        flex: 1,
        color: 'rgba(87,87,87,0.98)',
        marginRight: 5,
        marginTop:2



    },
    time_msg: {
        fontSize: 15,
        flex:1,
        color: 'rgba(25,53,87,0.98)',

        marginTop:40,
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

        width: 45,
        height: 45,
        paddingBottom: 1,
        marginBottom: 12,
        marginTop:5,
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




