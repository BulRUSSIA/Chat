import {address} from "../config_connect";

async function request_GET_PROFILE(nic) {

    const url = address + `/users/profile/${nic}`;
    console.log(url);

    try {


        const response = await fetch(url);
        const responseJsonData = await response.json();
        console.log('resp js',responseJsonData)

        return responseJsonData;
    } catch (e) {
        console.log(e)
    }

}

export default request_GET_PROFILE
