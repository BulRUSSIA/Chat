import {address} from "../config_connect";

async function request_SEND_MESSAGES(nic,msg,place,attachments)  {

    const url = address + `/sending/room`;

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
    });
    }

    catch (e) {
        console.log(e)
    }
}

export default request_SEND_MESSAGES
