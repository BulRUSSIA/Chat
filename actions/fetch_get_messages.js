import {address} from "../config_connect";

async function request_GET_MESSAGES(user_id,room) {

    const url = address + `/${user_id}/${room}/message`;


    try {


        let response = await fetch(url);
        let responseJsonData = await response.json();
        let userdate = JSON.parse(JSON.stringify(responseJsonData));


        if (userdate.length>=1) {
            return userdate;
        }



        return false
    } catch (e) {
        console.log(e)
    }

}

export default request_GET_MESSAGES
