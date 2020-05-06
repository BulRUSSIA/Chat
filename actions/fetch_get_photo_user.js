import {address} from "../components/ChatPortal/config_connect";

async function request_GET_USER_PHOTO(id)  {

    const url = address +`/users/photos/${id}`;


    try {
        let response = await fetch(url);
        let responseJsonData = await response.json();
        let user_now = responseJsonData.data;

        return user_now

    } catch (e) {
        console.log(e)
    }
}

export default request_GET_USER_PHOTO;
