import {Alert} from "react-native";

async function request_MY_NICKNAME(nick)  {

    const url = `http://185.231.154.198:5000/check/login/${nick}`;
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
