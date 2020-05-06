import {address} from '../ChatPortal/config_connect'

async function request_DELETE_AVATAR(creator,avatar_id)  {

    const url = address + `/delete/avatar/admin`;
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
                avatar_id:avatar_id
            }),
        });




    }

    catch (e) {
        console.log(e)
    }
}

export default request_DELETE_AVATAR;
