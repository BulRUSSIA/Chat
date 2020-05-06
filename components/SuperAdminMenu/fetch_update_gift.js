import {address} from '../ChatPortal/config_connect'

async function request_EDIT_GIFT(creator,name,price,gift_id,description)  {

    const url = address + `/update/gift/admin`;
    try {
        const data = await fetch(url, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',

                'Content-Encoding': 'utf-8',
            },
            body: JSON.stringify({
                creator: creator, //так как массив из заявок на брак
                name:name,
                price:price,
                gift_id:gift_id,
                description:description,



            }),
        });

        let responseJsonData = await data.json();


        return responseJsonData;


    }

    catch (e) {
        console.log(e)
    }
}

export default request_EDIT_GIFT;
