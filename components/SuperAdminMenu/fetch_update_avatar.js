import {address} from '../../config_connect'

async function request_EDIT_AVATAR(creator,name,price,avatar_id)  {

    const url = address + `/update/avatar/admin`;
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
                avatar_id:avatar_id



            }),
        });

        let responseJsonData = await data.json();


        return responseJsonData;


    }

    catch (e) {
        console.log(e)
    }
}

export default request_EDIT_AVATAR;
