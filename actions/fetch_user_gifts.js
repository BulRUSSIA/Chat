import {address} from "../components/ChatPortal/config_connect";

async function request_GET_GIFTS(nick)  {

    const url = address +`/users/gift/${nick}`;


    try {
        let response = await fetch(url);
        let responseJsonData = await response.json();
        let user_now = responseJsonData.data;

        return user_now
    } catch (e) {
        console.log(e)
    }
}

export default request_GET_GIFTS
