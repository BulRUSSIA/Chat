import {address} from '../../config_connect'

async function request_DELETE_GIFT(creator,gift_id)  {

    const url = address + `/delete/gift/admin`;
    try {
        await fetch(url, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',

                'Content-Encoding': 'utf-8',
            },
            body: JSON.stringify({
                creator: creator, //так как массив из заявок на брак
                gift_id:gift_id
            }),
        });




    }

    catch (e) {
        console.log(e)
    }
}

export default request_DELETE_GIFT;
