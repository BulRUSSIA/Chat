import {address} from "../config_connect";

async function request_GET_PRIVATE_ROOM(my_id,id_guest) {

    const url = address + `/rooms/create/${my_id}/${id_guest}`;


    try {


        let response = await fetch(url);
        let responseJsonData = await response.json();
        let userdate = responseJsonData;

        console.log(userdate['room']);


        return userdate['room']




    } catch (e) {
        console.log(e)
    }

}

export default request_GET_PRIVATE_ROOM
