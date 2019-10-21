import {address} from "../config_connect";

async function request_GET_USER_PHOTO(nick)  {

    const url = address +`/users/photos/${nick}`;


    try {
        let response = await fetch(url);
        let responseJsonData = await response.json();
        let user_now = responseJsonData.data;
        console.log(user_now);
        return user_now

    } catch (e) {
        console.log(e)
    }
}

export default request_GET_USER_PHOTO;
