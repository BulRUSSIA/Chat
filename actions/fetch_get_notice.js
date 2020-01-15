import {address} from "../config_connect";

 async function request_GET_NOTICE(user_id)  {

    const url = address + `/get/notice/`;

    // try {
    let response = await fetch(url, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',

            'Content-Encoding': 'utf-8',
        },
        body: JSON.stringify({
            user: user_id,

        }),

    });
    if (!response.ok) {
        console.log('waiting notice status')

    }
    else {

        let json = await response.json();
        console.log(json)


        return json;
    }
    //}

}

export default request_GET_NOTICE;
