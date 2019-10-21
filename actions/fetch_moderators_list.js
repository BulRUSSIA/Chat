import {address} from "../config_connect";

async function fetch_REQUEST_MODERATOR_LIST()  {

    const url = address +`/moderator/list`;


    try {
        let response = await fetch(url);
        let responseJsonData = await response.json();
        let user_now = responseJsonData.data;

        return user_now
    } catch (e) {
        console.log(e)
    }
}

export default fetch_REQUEST_MODERATOR_LIST
