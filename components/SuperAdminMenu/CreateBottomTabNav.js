
import React from 'react'
import {createBottomTabNavigator} from "react-navigation-tabs";
import ModeratorList from "./ModeratorList";
import {Image} from "react-native";
import NewsList from "./NewsList";

const TabNavigator = createBottomTabNavigator({



        Новости: NewsList,
        Администраторы: ModeratorList,
    },

    {
        defaultNavigationOptions: ({navigation}) => ({
            tabBarIcon: () => {
                const {routeName} = navigation.state;

                  if (routeName === 'Новости') {
                    return (
                        <Image
                            source={require('../Image/news.png')}
                            style={{width: 20, height: 20}}/>
                    );
                } else if (routeName === 'Администраторы') {
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