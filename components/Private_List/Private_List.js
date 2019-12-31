import {

    BackHandler,
    ActivityIndicator,
    View,
    ImageBackground,
} from "react-native";
import React from "react";
import Chatting from '../../components/Chatting/Chatting'
import request_GET_MESSAGES_PRIVATE from "../../actions/fetch_private_message";
import styles from './styles'
import request_DELETE_PERSONALROOMS_ALL from "../../actions/fetch_delete_personalrooms_all";
import {Private_List_flatlist} from "./Private_List_flatlist";
import {Header_private_list} from "./Header_private_list";
import request_GET_PRIVATE_LIST from "../../actions/fetch_private_list";
const menuitem = [{title: 'Удалить все чаты', show: 'never', eventkey: 1},];


export default class Private_List extends React.Component {
    constructor(props) {
        super(props);


        this.state = {

            DataSource: [],
            item_menu: menuitem,
            selected: undefined,
            animating:false,


        };


    }

    componentDidMount= async ()=> {
        const get_list = await request_GET_PRIVATE_LIST(this.props.nic);
        this.setState({DataSource:get_list})



    };


    onValueChange = async (value: string) => {


        if (value === 'key1') {

            await request_DELETE_PERSONALROOMS_ALL(this.props.nic);
            this.props.select(0);
            this.componentWillUnmount();


        }
    };


    onActionSelected = async (position) => {


        if (position === 0) {
            console.log("loыl");


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
        this.setState({animating:true});
        const get_private = await request_GET_MESSAGES_PRIVATE(event);
        this.setState({animating:false});
        const {navigator} = this.props;

        await    navigator.push('Private',{
            room: this.props.room,
            nic: this.props.nic,
            chat_name: this.props.chat_name,
            private_room: event,
            private_chatter: chatter,
            private_data: get_private,
            list_data: this.state.DataSource


        });



    };


    back =  () => {




        const {navigator} = this.props;
        navigator.pop()


    };








    render() {
        if (this.state.animating) {

            return (

                <View style={{flex:1,backgroundColor:'#3c3e5a'}}>
                    <ActivityIndicator
                        style={{marginTop:'50%'}}
                        size="large" color="#3E8CB4"
                        animating={this.state.animating}/>
                </View>

            )


        }

        return (


            <View style={styles.container1}>
                <ImageBackground
                    style={{resizeMode: 'contain',height:'100%',width:'100%'}}
                    source={{uri:'default_background'}}>

                <Header_private_list

                    item_menu={this.state.item_menu}
                    onValueChange={this.onValueChange}
                    selectedValue={this.state.selected}
                    back={this.back}
                    onActionSelected={this.onActionSelected}

                />



                <Private_List_flatlist


                    DataSource={this.state.DataSource}
                    get_chat={this.Get_Chat}


                />


</ImageBackground>


            </View>


        );

    }
}





