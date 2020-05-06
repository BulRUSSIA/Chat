import {address} from "../components/ChatPortal/config_connect";

async function request_BUY_AVATAR(user_id,price,avatar_id)  {

    const url = address + `/Avatar/buy`;
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
                price:price,
                avatar_id:avatar_id,


            }),
        });

        let responseJsonData = await data.json();


        return responseJsonData;


    }

    catch (e) {
        console.log(e)
    }
}

export default request_BUY_AVATAR;
