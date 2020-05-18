import {address} from "../../../config_connect";


async function get_friends_list(user_id) {

    try {
        const url = address + `/friend/${user_id}`;
        const response = await fetch(url,{
            method: 'GET'});
        return   await response.json();

    } catch (err) {
        console.warn(err)
    }
}

export default get_friends_list
