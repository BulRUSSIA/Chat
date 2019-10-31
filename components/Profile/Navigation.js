import React from 'react';
import {createAppContainer} from 'react-navigation';
import { Text, View} from "react-native";
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import {PhotosAll} from "../PhotosAll";
class HomeScreen extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
               <PhotosAll

                   photos_list={this.props.screenProps.photos_list}
                   View_full_photo={this.props.screenProps.View_full_photo}
                   View_all_photo={this.props.screenProps.View_all_photo}


               />
            </View>
        );
    }
}

class SettingsScreen extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Settings!</Text>
            </View>
        );
    }
}

const AppNavigator = createMaterialTopTabNavigator(
    {
        фото: HomeScreen,
        Услуги: SettingsScreen,
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
                backgroundColor:'#216C86'
            }
        },
    }
);

const NavigationApp = createAppContainer(AppNavigator);
export default NavigationApp;

