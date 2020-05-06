import {address} from "../config_connect";

function request_DELETE_PERSONALROOMS_ALL(id)  {


    const url = address + `/delete/personalrooms/${id}`;



    try {
        fetch(url);
    } catch (e) {
        console.log(e)
    }
}

export default request_DELETE_PERSONALROOMS_ALL
