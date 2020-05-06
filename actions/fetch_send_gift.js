import {address} from "../components/ChatPortal/config_connect";

async function request_SEND_GIFT(user_id,from_id,gift_id,price)  {

    const url = address + `/Gift/send/`;
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
                gift_id:gift_id,
                from_id:from_id,


            }),
        });




        return   await data.json();


    }

    catch (e) {
        console.log(e)
    }
}

export default request_SEND_GIFT;
