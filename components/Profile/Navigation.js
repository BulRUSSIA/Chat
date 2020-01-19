import React from 'react';
import {createAppContainer} from 'react-navigation';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import ActionsList from "./ActionsList";
import {PhotosAll} from "./PhotosAll";



const AppNavigator = createMaterialTopTabNavigator(
    {
        Услуги: ActionsList,
        фото: PhotosAll,

    },
    {
        tabBarOptions: {
            indicatorStyle:{
              color:'white'


            },
            tabStyle: {
                height: 60,
            },
            labelStyle: {
                fontSize: 15,
                fontWeight:'bold',
            },
            activeTintColor: 'rgba(0,0,0,0.91)',
            showIcon: true,

            style: {
                backgroundColor:'#0D5E96'
            }
        },
    }
);

const NavigationApp = createAppContainer(AppNavigator);
export default NavigationApp;

