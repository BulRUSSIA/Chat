import {
    ActivityIndicator,
    BackHandler,
    ImageBackground,
    ToolbarAndroid,
    View
} from "react-native";
import React from "react";
import Chatting from '../../components/Chatting/Chatting'
import request_GET_MESSAGES_PRIVATE from "../../actions/fetch_private_message";
import styles from './styles'
import request_DELETE_PERSONALROOMS_ALL from "../../actions/fetch_delete_personalrooms_all";
import {Private_List_flatlist} from "./Private_List_flatlist";
import {Header_private_list} from "./Header_private_list";

const menuitem = [{title: 'Удалить все чаты', show: 'never', eventkey: 1},];


export default class Private_List extends React.Component {
    constructor(props) {
        super(props);


        this.state = {

            DataSource: this.props.private_user_list,
            item_menu: menuitem,
            selected: undefined,
            animating:true,


        };

        console.log('userslist' + this.state.DataSource)
    }

    onValueChange = async (value: string) => {


        if (value === 'key1') {

             await request_DELETE_PERSONALROOMS_ALL(this.props.nic);
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

        this.componentWillUnmount()

    };


    back = async () => {

        await this.props.mount();

        const {router} = this.props;
      await  router.pop({
            room: this.props.room,
            nic: this.props.nic,
            chat_name: this.props.chat_name,
        })


    };



 View_Avtivity = () => {
     return(

         <ActivityIndicator size="large" color="#3E8CB4"
                            animating={this.state.animating}/>

     )



 };

    render() {


        return (


            <View style={styles.container1}>
                <ImageBackground source={require('../Image/fon_private.webp')} style={{width: '100%', height: '100%'}}>

                    <Header_private_list

                        item_menu={this.state.item_menu}
                        onValueChange={this.onValueChange}
                        selectedValue={this.state.selected}
                        back={this.back}
                        onActionSelected={this.onActionSelected}

                    />

                    {this.View_Avtivity}

                    <Private_List_flatlist


                        DataSource={this.state.DataSource}
                        get_chat={this.Get_Chat}


                    />

                    <ToolbarAndroid style={styles.containerToolbardown}>


                    </ToolbarAndroid>

                </ImageBackground>

            </View>


        );

    }
}





