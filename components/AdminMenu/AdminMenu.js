import React from 'react';
import {Text, View, ImageBackground, Image} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {Body, Button, Container, Header, Icon, Left, Title} from "native-base";
import HomeScreen from './BannedList'
import ModeratorList from "./ModeratorList";
import InvisibleList from "./InvisibleList";



class News extends React.Component {


    render() {


        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>

                <ImageBackground source={require('../Image/whatsap.png')}
                                 style={{width: '100%', height: '100%'}}>
                    <Text>В данном разделе будут публиковаться новости </Text>
                </ImageBackground>
            </View>
        );
    }
}


const TabNavigator =  createBottomTabNavigator({


        Забаненные: HomeScreen,
        Невидимки: InvisibleList,
        Новости: News,
        Модераторы:ModeratorList,
    },

    {
        defaultNavigationOptions: ({navigation}) => ({
            tabBarIcon: () => {
                const {routeName} = navigation.state;
                if (routeName === 'Забаненные') {
                    return (
                        <Image
                            source={require('../Image/block-user-icon-25.jpg')}
                            style={{width: 20, height: 20,}}/>
                    );
                } else if (routeName === 'Невидимки') {
                    return (
                        <Image
                            source={require('../Image/invisible.png')}
                            style={{width: 20, height: 20}}/>
                    );
                } else if (routeName === 'Новости') {
                    return (
                        <Image
                            source={require('../Image/news.png')}
                            style={{width: 20, height: 20}}/>
                    );
                } else if (routeName === 'Модераторы') {
                    return (
                        <Image
                            source={require('../Image/Users-Moderator-icon.png')}
                            style={{width: 20, height: 20}}/>
                    );
                }
            },
        }),
        tabBarOptions: {
            activeTintColor: '#2a9a4e',
            inactiveTintColor: '#ffffff',
            style: {
                backgroundColor: '#25566e',
            }
        },

    }
);

const NavigationApp = createAppContainer(TabNavigator);


export default class NavigationAdmin extends React.Component {
    Determinate_type = ()=> {
      if(this.props.type_user ===4) {

          console.log(this.props.type_user + 'moderator or admin')


      }


      else {

          console.log(this.props.type_user + 'moderator or admin')


      }

    };



    render() {

        const {router} = this.props;
        this.Determinate_type();

        return (


            <Container>
                <Header style={{backgroundColor: '#25566e',}}
                        androidStatusBarColor="#25566e"
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
                        banned_list: this.props.banned_list,
                        moderator_list: this.props.moderator_list,
                        invisible_list: this.props.invisible_list,
                        nic:this.props.nic,

                    }}
                    style={{backgroundColor: '#2d657f'}}>
                </NavigationApp>
            </Container>


        );
    }


}