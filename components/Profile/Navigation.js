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
            activeTintColor: 'rgba(45,157,70,0.91)',
            showIcon: true,

            style: {
                backgroundColor:'rgba(10,0,14,0.26)'
            }
        },
    }
);

const NavigationApp = createAppContainer(AppNavigator);
export default NavigationApp;

