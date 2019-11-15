import React from 'react';
import {createAppContainer} from 'react-navigation';
import {Body, Button, Container, Header, Icon, Left, Title} from "native-base";
import TabNavigator from "./CreateBottomTabNav";

const NavigationApp = createAppContainer(TabNavigator);

export default class NavigationAdmin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            usr_banned_list: [],
            usr_moderator_list: [],
            usr_invisible_list: [],
        }

    }


    Determinate_type = () => {
        if (this.props.type_user === 4) {

            console.log(this.props.type_user + 'moderator or admin')


        } else {

            console.log(this.props.type_user + 'moderator or adfmin')


        }

    };


    render() {




        const {router} = this.props;
        this.Determinate_type();

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
                </Header>
                <NavigationApp
                    screenProps={{

                        nic: this.props.nic,

                    }}
                    style={{backgroundColor: '#3c3e5a'}}>
                </NavigationApp>
            </Container>


        );
    }


}