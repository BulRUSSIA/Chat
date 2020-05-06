import {address} from "../components/ChatPortal/config_connect";

async function fetch_REQUEST_USERS_TYPE_LIST(type)  {

    const url = address +`/get/users/type/${type}`;


    try {
        let response = await fetch(url);
        let responseJsonData = await response.json();
        let user_now = responseJsonData;

        return user_now
    } catch (e) {
        console.log(e)
    }
}

export default fetch_REQUEST_USERS_TYPE_LIST
