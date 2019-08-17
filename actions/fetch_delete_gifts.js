import {address} from "../config_connect";

function request_DELETE_GIFT(gift)  {


    const url = address + `/delete/avatar/${gift}`;



    try {
        fetch(url);
    } catch (e) {
        console.log(e)
    }
}

export default request_DELETE_GIFT
