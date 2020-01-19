import React from 'react';
import {createAppContainer} from 'react-navigation';
import {Body, Button, Container, Header, Icon, Left, Title} from "native-base";
import TabNavigator from "./CreateBottomTabNav";

const NavigationApp = createAppContainer(TabNavigator);

export default class NavigationSuperAdmin extends React.Component {





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





    render() {

        const {navigator} = this.props;






        return (


            <Container>
                <Header style={{backgroundColor: '#0D5E96',}}
                        androidStatusBarColor="#0D5E96"
                >

                    <Left style={{flex: 1}}>
                        <Button transparent

                                onPress={() => navigator.pop()}>
                            <Icon

                                name="ios-arrow-back"/>
                        </Button>


                    </Left>
                    <Body style={{flex: 4, justifyContent: 'center', alignItems: 'center',}}>
                        <Title
                            style={{fontSize: 20}}>Меню Администраторов</Title>
                    </Body>


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