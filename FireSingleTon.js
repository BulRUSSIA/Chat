import {AsyncStorage} from "react-native";
import firebase from 'react-native-firebase'


export default class FireSingleTon {


    static async askPermission() {
        try {
            await firebase.messaging().requestPermission();
            console.log('Permissions allowed');
            await FireSingleTon.fetchToken();
        } catch (error) {
            console.log('Permissions denied');
        }
    }

    static async fetchToken() {
        let fcmToken = await AsyncStorage.getItem('fcmToken');
        console.log(fcmToken);
        if (!fcmToken) {
            fcmToken = await firebase.messaging().getToken();
            if (fcmToken) {
                await AsyncStorage.setItem('fcmToken', fcmToken);
                console.log(fcmToken)
            }
        }

        return fcmToken
    }


}

