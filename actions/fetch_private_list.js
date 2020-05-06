import {address} from "../config_connect";

async function request_GET_PRIVATE_LIST(nic) {

    const url = address + `/personalrooms/${nic}`;
    console.log(url);
    try {
        const data = await fetch(url, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Content-Encoding': 'utf-8',
            },});

        let responseJsonData = await data.json();
        console.log(responseJsonData);
        return responseJsonData;


    } catch (e) {
        console.log(e)
    }
}

export default request_GET_PRIVATE_LIST
