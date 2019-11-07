import {address} from "../config_connect";
import FireSingleTon from "../FireSingleTon";

async function request_SEND_MESSAGES_PRIVATE(nic,msg,place,attachments)  {


    const url = address + `/sending/private`;

    try {
        let token = await FireSingleTon.fetchToken();
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
                FcmToken:token,

            }),
        });
    }

    catch (e) {
        console.log(e)
    }
}

export default request_SEND_MESSAGES_PRIVATE
