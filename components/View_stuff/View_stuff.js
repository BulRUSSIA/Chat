import React from 'react';
import {

    Image,
    Text,
    View,
    ImageBackground,

    Alert, TouchableOpacity, BackHandler
} from 'react-native';
import Chatting from '../../components/Chatting/Chatting'


import styles from '../../styles'
import request_DELETE_GIFT from "../../actions/fetch_delete_gifts";
import HeaderBar from "./HeaderBar";


console.disableYellowBox = true;

export default class View_stuff extends React.Component {


    constructor(props) {
        super(props);


        this.state = {

            toolbar_text: 'Подарок',


            gifts_view: this.props.gift_view,
            gifts_id: this.props.gift_id,
            DataSource: [],
            gifts_description: this.props.gift_description


        };

    }


    delete_gift = async () => {
        await this.pushing();
        console.log(this.state.gifts_id);
        const delete_gift = await request_DELETE_GIFT(this.state.gifts_id);
        Alert.alert('Удаление','подарок успешно удален');



    };


    //  gift_validation = () =>


    //   {
    //      if


    //     }


    componentWillUnmount() {

        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
        clearInterval(Chatting.interval);
    }

    handleBackButton = () => {


        return true

    };


    pushing = async () => {


        const {navigator} = this.props;
        navigator.pop(

        );

        this.componentWillUnmount();
    };


    render() {
        const my_id = this.props.my_id;
        const user_id = this.props.user_id;
        console.log(this.state.gifts_description);

        return (

            <View style={{flex:1}}

            >


                <ImageBackground source={{uri:'background_airwaychat'}} style={{width: '100%', height: '100%',backgroundColor:'#ffffff'}}>


                 <HeaderBar   style={{backgroundColor: 'rgba(212,212,212,0.96)',}}
                              androidStatusBarColor="#010101"
                 pushing={this.pushing}
                 />


                    <Image source={{uri: this.state.gifts_view}} style={styles.imageViewAvatars_stuff}/>


                    <View>
                        <Text style={styles.Gift_Description}>
                            {this.state.gifts_description}
                        </Text>
                    </View>

                    { my_id === user_id &&
                        <TouchableOpacity onPress={this.delete_gift}>
                            <Image source={require('../Image/delete.png')} style={styles.imageViewAvatars_stuff}/>
                        </TouchableOpacity>

                    }


                </ImageBackground>

            </View>
        )


    }
}


