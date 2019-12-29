import React from 'react';
import {createAppContainer} from 'react-navigation';
import {Body, Button, Container, Header, Icon, Left, Title,Right} from "native-base";
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

        const {router} = this.props;
        router.push.Profile({


            chat_name:chat_name,
            user_id: user_id,
            from_id:this.props.nic,
            go_private:this.props.go_private

        });

    };


    Go_Admin = ()=> {

        const {router} = this.props;
        router.push.NavigationSuperAdmin({
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

        const {router} = this.props;



        const admin = this.Determinate_type();


        return (


            <Container>
                <Header style={{backgroundColor: '#3c3e5a',}}
                        androidStatusBarColor="#3c3e5a"
                >

                    <Left style={{flex: 1}}>
                        <Button transparent

                                onPress={() => router.pop()}>
                            <Icon

                                name="ios-arrow-back"/>
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
                    style={{backgroundColor: '#3c3e5a'}}>
                </NavigationApp>
            </Container>


        );
    }


}