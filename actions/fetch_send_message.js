import {address} from "../config_connect";
import {Alert} from "react-native";

async function request_SEND_MESSAGES(nic,msg,place,attachments,type)  {

    const url = address + `/sending/messages/room`;

    // try {
let response = await fetch(url, {
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
            type:type
        }),

    });
    if (!response.ok) {
        Alert.alert('Предупреждение','Нельзя так часто отправлять сообщение ' + "("+ msg+ ")")

    }
    else {

        let json = await response.json();


        return json;
    }
    //}
    //  .then ( (respons e )=>{1
    //
    //
    //    if (!response.ok) {
    //
    //
    //       (Alert.alert('Предупреждение','не флуди черт'))
    //    }
    //
    //
    //
    //
    //
    //  }).then((response) => response.json());
    //
    //
    //
    // }
    //
    // catch (e) {
    //    console.log(e)
    // }
}

export default request_SEND_MESSAGES
