import {address} from "../../../config_connect";


async function check_avatar(user)  {

    const url = address + `/avatar/check/${user}`;
    console.log(url);
    try {
        const data = await fetch(url);
        return  data.json();


    }

    catch (e) {
        console.log(e)
    }
}

export default check_avatar;
