import {address} from "../../../config_connect";


async function send_avatar(user,sender,avatar)  {

    const url = address + `/avatar/send/`;
    try {
        const data = await fetch(url, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Content-Encoding': 'utf-8',
            },
            body: JSON.stringify({
                sender:sender,
                user:user,
                avatar:avatar
            }),
        });


        return await data.json();


    }

    catch (e) {
        console.log(e)
    }
}

export default send_avatar;
