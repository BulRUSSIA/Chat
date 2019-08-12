import {address} from "../config_connect";

async function request_GET_MESSAGES_PRIVATE(chat_id) {

    const url = address + `/${chat_id}/message/private`;


    try {


        let response = await fetch(url);
        let responseJsonData = await response.json();
        let userdate = JSON.parse(JSON.stringify(responseJsonData));


        return userdate;
    } catch (e) {
        console.log(e)
    }

}

export default request_GET_MESSAGES_PRIVATE
