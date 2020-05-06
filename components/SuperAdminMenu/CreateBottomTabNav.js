
import React from 'react'
import {createBottomTabNavigator} from "react-navigation-tabs";
import ModeratorList from "./ModeratorList";
import {Image} from "react-native";
import NewsList from "./NewsList";
import {Aavatar_Service} from "./Aavatar_Service";
import Icon from "react-native-vector-icons/AntDesign";
import {Button} from "native-base";
import {Gift_Service} from "./Gift_Service";

const TabNavigator = createBottomTabNavigator({



        Новости: NewsList,
        Администраторы: ModeratorList,
        Аватары:Aavatar_Service,
        Подарки:Gift_Service,
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

                  else if (routeName === 'Аватары') {
                      return (
                          <Icon
                              size={20}

                              name="heart"/>
                      );
                  }

                  else if (routeName === 'Подарки') {
                      return (
                          <Icon
                              size={20}

                              name="android"/>
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
