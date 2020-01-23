import React from 'react';
import {createAppContainer} from 'react-navigation';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import {Flatlist_smiles_chatting} from "./Flatlist_smiles_chatting";
import {Flatlist_Stickers} from "./ListStickers";
import FastImage from "react-native-fast-image";



const AppNavigator = createMaterialTopTabNavigator(
    {
        '1': Flatlist_smiles_chatting,
        '2': Flatlist_Stickers,

    },
    {
        defaultNavigationOptions: ({navigation}) => ({
            tabBarIcon: () => {
                const {routeName} = navigation.state;

                 if (routeName === '1') {
                    return (
                        <FastImage
                            source={{uri:'ic_insert_emoticon_light_blue_500_24dp'}}
                            style={{width: 20, height: 20}}/>
                    );
                } else if (routeName === '2') {
                    return (
                        <FastImage
                            source={{uri:'stickers'}}
                            style={{width: 20, height: 20}}/>
                    );
                }
            },
        }),
        tabBarOptions: {
            indicatorStyle:{
                color:'white'


            },
            tabStyle: {
                height: 30,
            },
            labelStyle: {
                fontSize: 0,
                fontWeight:'bold',
            },
            activeTintColor: '#2f2f2f',
            showIcon: true,

            style: {
                backgroundColor:'#2f2f2f'
            }
        },


    }



);

const NavigationApp = createAppContainer(AppNavigator);
export default NavigationApp;

