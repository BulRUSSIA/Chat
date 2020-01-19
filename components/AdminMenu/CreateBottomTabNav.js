
import React from 'react'
import {createBottomTabNavigator} from "react-navigation-tabs";
import HomeScreen from "./BannedList";
import InvisibleList from "./InvisibleList";
import ModeratorList from "./ModeratorList";
import {Image} from "react-native";
import NewsList from "./NewsList";

const TabNavigator = createBottomTabNavigator({


        Забаненные: HomeScreen,
        Невидимки: InvisibleList,
        Новости: NewsList,
        Модераторы: ModeratorList,
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
                backgroundColor: '#0D5E96',
            }
        },

    }
);

export default TabNavigator;