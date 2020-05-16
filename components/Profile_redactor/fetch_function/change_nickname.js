import {address} from "../../../config_connect";

async function set_new_nickname(user_id,nic)  {
    const url = address + `/update/nickname/`;
    try {
        const data = await fetch(url, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Content-Encoding': 'utf-8',
            },
            body: JSON.stringify({
                user_id: user_id,
                nic:nic,


            }),
        });


        return await data.json();


    }

    catch (e) {
        console.log(e)
    }
}

export default set_new_nickname;
