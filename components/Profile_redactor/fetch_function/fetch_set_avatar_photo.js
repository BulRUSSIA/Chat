import {address} from '../../../config_connect'

async function request_SET_AVATAR_PHOTO(user_id,photo_id)  {

    const url = address + `/set/photo/profile/`;
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
                photo_id: photo_id



            }),
        });

        let responseJsonData = await data.json();


        return responseJsonData;


    }

    catch (e) {
        console.log(e)
    }
}

export default request_SET_AVATAR_PHOTO;
