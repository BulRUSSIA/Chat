import {address} from "../components/ChatPortal/config_connect";

async function request_SEND_BANNED_ACTION(hour,user_id,moder_id)  {
     console.log('bannned now');
    const url = address + `/banned/action/user`;

    try {
        await fetch(url, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',

                'Content-Encoding': 'utf-8',
            },
            body: JSON.stringify({
                hour: hour,
                userId: user_id,
                moderId:moder_id,


            }),
        });
    }

    catch (e) {
        console.log(e)
    }
}

export default request_SEND_BANNED_ACTION
