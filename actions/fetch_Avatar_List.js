import {address} from "../components/ChatPortal/config_connect";

async function request_GET_AvatarList()  {

    const url = address +`/get/AvatarList`;


    try {
        let response = await fetch(url);
        let responseJsonData = await response.json();
        let user_now = responseJsonData;

        return user_now

    } catch (e) {
        console.log(e)
    }
}

export default request_GET_AvatarList;
