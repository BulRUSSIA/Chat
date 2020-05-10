import {PermissionsAndroid,Alert} from 'react-native';




 function request_READ_PHONE_STATE() {

    try {
        const granted =  PermissionsAndroid.request(
           PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE ,
            {
                'title': 'Пожалуйсте включите доступ к устройству!',
                'message': 'Данное приложение очень нуждается в этом. '
            }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {

            Alert.alert("Права предоставлены");
        }
        else {



        }
    } catch (err) {
        console.warn(err)
    }
}
export default request_READ_PHONE_STATE
