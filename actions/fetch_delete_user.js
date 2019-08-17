import {address} from "../config_connect";

function request_DELETE_USER_ROOM(room, nic) {


    const url = address + `/delroom/${room}/${nic}`;


    try {
        fetch(url);
    } catch (e) {
        console.log(e)
    }
}

export default request_DELETE_USER_ROOM
