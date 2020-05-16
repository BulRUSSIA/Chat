import {address} from "../../../config_connect";


async function check_avatar(user)  {

    const url = address + `/avatar/check/${user}`;
    try {
        const data = await fetch(url);
        return await data.json();


    }

    catch (e) {
        console.log(e)
    }
}

export default check_avatar;
