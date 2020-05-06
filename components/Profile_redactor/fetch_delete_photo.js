import {address} from '../../config_connect'

async function request_DELETE_PHOTO(photo_id) {

    const url = address + `/delete/photo/profile/`;
    try {
        const data = await fetch(url, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',

                'Content-Encoding': 'utf-8',
            },
            body: JSON.stringify({
                photo_id: photo_id, //так как массив из заявок на брак



            }),
        });

        let responseJsonData = await data.json();


        return responseJsonData;


    } catch (e) {
        console.log(e)
    }
}

export default request_DELETE_PHOTO;
