import {address} from "../components/ChatPortal/config_connect";

async function request_GET_ROOMS(categories)  {

    const url = address + `/get/rooms/${categories}`;


    try {
        let response = await fetch(url);
        let responseJsonData = await response.json();
        let rooms = responseJsonData

        return rooms
    } catch (e) {
        console.log(e)
    }
}

export default request_GET_ROOMS
