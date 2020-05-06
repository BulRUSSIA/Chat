import {address} from "../components/ChatPortal/config_connect";

async function request_GET_PROFILE(nic) {

    const url = address + `/users/profile/${nic}`;
    console.log(url);

    try {


        const response = await fetch(url);
        const responseJsonData = await response.json();
        const data = JSON.parse(JSON.stringify(responseJsonData));

        return data;
    } catch (e) {
        console.log(e)
    }

}

export default request_GET_PROFILE
