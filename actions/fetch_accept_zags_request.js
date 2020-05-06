import {address} from "../config_connect";

async function request_ACCEPT_ZAGS_REQUEST(user_request,user_from)  {

    const url = address + `/sending/zags/accept/`;
    try {
        const data = await fetch(url, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',

                'Content-Encoding': 'utf-8',
            },
            body: JSON.stringify({
                user_request: user_request[0], //так как массив из заявок на брак
                user_from:user_from,



            }),
        });

        let responseJsonData = await data.json();


        return responseJsonData;


    }

    catch (e) {
        console.log(e)
    }
}

export default request_ACCEPT_ZAGS_REQUEST;
