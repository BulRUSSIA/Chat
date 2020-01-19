import React from 'react';
import {createAppContainer} from 'react-navigation';
import {Body, Button, Container, Header, Left, Title,Right} from "native-base";
import Icon from "react-native-vector-icons/AntDesign";

import TabNavigator from "./CreateBottomTabNav";
import {Image,TouchableOpacity} from "react-native";

const NavigationApp = createAppContainer(TabNavigator);

export default class NavigationAdmin extends React.Component {



    Determinate_type = () => {
        if (this.props.type_user === 2) {

            console.log(this.props.type_user + 'admin');

            return true


        } else {

            return false


        }

    };

    Go_Profile = (user_id,chat_name,)=> {

        this.props.Change_User_id(user_id,chat_name);

        const {navigator} = this.props;
        navigator.push('Profile',{


            chat_name:chat_name,
            user_id: user_id,
            from_id:this.props.nic,
            go_private:this.props.go_private

        });

    };


    Go_Admin = ()=> {

        const {navigator} = this.props;
        navigator.push('NavigationSuperAdmin',{
            type_user: this.props.type_user,
            nic: this.props.nic,
            Change_User_id: this.props.Change_User_id,
            go_private: this.props.go_private,
        });

    };

    Admin_screen = (admin)=> {
        if (admin) {



            return (
<TouchableOpacity onPress={()=> this.Go_Admin()}>

    <Image
        source={require('../Image/Users-Moderator-icon.png')}
        style={{width: 20, height: 20}}/>

</TouchableOpacity>

            )

        }

    };



    render() {

        const {navigator} = this.props;



        const admin = this.Determinate_type();


        return (


            <Container>
                <Header style={{backgroundColor: '#0D5E96',}}
                        androidStatusBarColor="#0D5E96"
                >

                    <Left style={{flex: 1}}>
                        <Button transparent

                                onPress={() => navigator.pop()}>
                            <Icon style={{color:'white'}}
                                size={25}
                                name="arrowleft"/>
                        </Button>


                    </Left>
                    <Body style={{flex: 4, justifyContent: 'center', alignItems: 'center',}}>
                        <Title
                            style={{fontSize: 20}}>Меню Модераторов</Title>
                    </Body>

                    <Right>
                        {this.Admin_screen(admin)}

                    </Right>
                </Header>
                <NavigationApp
                    screenProps={{

                        nic: this.props.nic,
                        Go_Profile:this.Go_Profile,

                    }}
                    style={{backgroundColor: '#0D5E96'}}>
                </NavigationApp>
            </Container>


        );
    }


}