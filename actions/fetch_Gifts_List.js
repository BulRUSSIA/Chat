import {address} from "../config_connect";

async function request_GET_GiftsList()  {

    const url = address +`/get/GiftsList`;


    try {
        let response = await fetch(url);
        let responseJsonData = await response.json();
        let user_now = responseJsonData.data;

        return user_now

    } catch (e) {
        console.log(e)
    }
}

export default request_GET_GiftsList;
