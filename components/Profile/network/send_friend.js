import {address} from "../../../config_connect";


async function send_friend(user,friend)  {

    const url = address + `/friend`;
    try {
        const data = await fetch(url, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Content-Encoding': 'utf-8',
            },
            body: JSON.stringify({
                user:user,
               friend:friend
            }),
        });


        return await data.json();


    }

    catch (e) {
        console.log(e)
    }
}

export default send_friend;
