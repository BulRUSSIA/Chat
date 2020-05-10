import {address} from "../config_connect";

async function fetch_users_in_room(room)  {

    const url = address +`/usersinroom/${room}`;
    console.log(room);

    try {
        let response = await fetch(url);
        let responseJsonData = await response.json();
        let user_now = responseJsonData;

        return user_now
    } catch (e) {
        console.log(e)
    }
}

export default fetch_users_in_room
