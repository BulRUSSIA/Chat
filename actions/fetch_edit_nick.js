import {address} from "../config_connect";

async function request_EDIT_NICK(nic,change_nic)  {


    const url = address + `/edit/profile/nickname/${nic}/${change_nic}`;



    try {
        await    fetch(url);
    } catch (e) {
        console.log(e)
    }
}

export default request_EDIT_NICK