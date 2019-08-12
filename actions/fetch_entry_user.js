import {address} from "../config_connect";

async function request_ENTRY_USER_ROOM(nic,room)  {


    const url = address + `/entry/${nic}/${room}`;



    try {
        fetch(url);
    } catch (e) {
        console.log(e)
    }
}

export default request_ENTRY_USER_ROOM
