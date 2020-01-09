import {address} from "../config_connect";
import {Alert} from "react-native";

async function request_SEND_MESSAGES(nic,msg,place,attachments)  {

    const url = address + `/sending/messages/room`;

    try {
 await fetch(url, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',

            'Content-Encoding': 'utf-8',
        },
        body: JSON.stringify({
            Nic: nic,
            Msg: msg,
            Place:place,
            attachments:attachments,
        }),
    }).then((response) => {


       if (!response.ok) {


          (Alert.alert('Предупреждение','не флуди черт'))
       }



     }).done();






    }

    catch (e) {
       console.log(e)
    }
}

export default request_SEND_MESSAGES
