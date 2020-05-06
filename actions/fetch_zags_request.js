import {address} from "../components/ChatPortal/config_connect";

async function request_ZAGS_REQUEST(user_request,user_from)  {

    const url = address + `/sending/zags/request/`;
    try {
        const data = await fetch(url, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',

                'Content-Encoding': 'utf-8',
            },
            body: JSON.stringify({
                user_request: user_request,
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

export default request_ZAGS_REQUEST;
