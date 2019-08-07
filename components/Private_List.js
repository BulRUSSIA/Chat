import {
    BackHandler,
    FlatList,
    Image,
    ImageBackground,
    StyleSheet,
    Text,
    ToolbarAndroid,
    TouchableOpacity,
    View
} from "react-native";
import React from "react";
import Chatting from '../components/Chatting'
import {SwipeListView} from 'react-native-swipe-list-view';

const menuitem = [{title: 'Удалить все чаты', show: 'never', eventkey: 1},


];
export default class Private_List extends React.Component {
    constructor(props) {
        super(props);


        this.state = {

            DataSource: this.props.private_user_list,
            item_menu: menuitem


        };

        console.log('userslist' + this.state.DataSource)
    }


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


    Get_Chat = async (event) => {
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
                <ImageBackground source={require('./Image/e1.jpg')} style={{width: '100%', height: '100%'}}>

                    <ToolbarAndroid style={styles.containerToolbar}
                                    onActionSelected={this.onActionSelected.bind(this)}


                                    actions={this.state.item_menu}>


                        <View>
                            <Text style={styles.instructions}>Чаты </Text>
                        </View>


                    </ToolbarAndroid>


                    <SwipeListView inverted


                        data={this.state.DataSource}
                        extraData={this.state}


                        ItemSeparatorComponent={this.renderSeparator_1}
                                   renderHiddenItem={ (item, rowMap) => (

                                       <View style={{position: 'relative',top:0,bottom:0}}>
                                           <Image source={require('./Image/rabbish.png')} style={styles.imageViewDelete}/>
                                       </View>

                                   )}

                                   rightOpenValue={-70}

                        renderItem={(({item}) =>


                                <TouchableOpacity onPress={(event) => this.Get_Chat(item.Chat_id)}>
                                    <View style={{ flexDirection: 'row',flex:1}}>

                                        <Image source={require('./Image/email.png')} style={styles.imageView}/>


                                        <Text style={styles.rooms}>
                                            {item.Private_Chatters}


                                        </Text>
                                        <Text style={styles.time_msg}>

                                            {item.last_data}


                                        </Text>


                                        <Text style={styles.time}>

                                            {item.last_msg}


                                        </Text>


                                    </View>
                                </TouchableOpacity>
                        )
                        }




                        keyExtractor={(item, index) => index.toString()}
                        // contentContainerStyle={{paddingTop: 10}}


                    />

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
        fontSize: 18,
        flex: 1,
        color: 'rgba(0,0,0,0.98)',
        marginTop: 14,


    },

    time: {
        fontSize: 15,
        flex: 1,
        color: 'rgba(87,87,87,0.98)',
        marginRight: 5,
        marginTop: 2


    },
    time_msg: {
        fontSize: 15,
        flex: 1,
        color: 'rgba(25,53,87,0.98)',

        marginTop: 48,
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
        marginTop: 5,
        borderRadius: 7,



    },
    imageViewDelete: {

        width: 25,
        height: 25,
        paddingBottom: 1,
        marginBottom: 12,
        marginTop: 16,
        paddingLeft:10,
        marginLeft:290,
        resizeMode:"contain"



    },

    instructions: {

        textAlign: 'left',

        color: '#e5e5e5',
        fontSize: 30,
        flex: 1,
        paddingLeft: 120,
        alignSelf: 'center',


    },

    containerToolbar: {

        flexDirection: 'column',
        height: 50,
        width: "100%",


        backgroundColor: '#06b3e9',
    },


});




