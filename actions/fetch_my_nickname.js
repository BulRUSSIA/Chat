import {Alert} from "react-native";
import {address} from "../config_connect";

async function request_MY_NICKNAME(nick)  {

    const url = address + `/check/login/${nick}`;
    return await fetch(url)

        .then((response) => response.json())
        .then( async (responseJson) => {

            return (responseJson['Nickname'])


        })


        .catch((error) => {
            Alert.alert('Что-то пошло не по-плану!');
        });

}

export default request_MY_NICKNAME
