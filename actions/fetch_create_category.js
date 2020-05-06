import {address} from "../config_connect";

async function request_CREATE_CATEGORIES(admin_id,name,parent,mask)  {

    const url = address + `/room/rooms/create/`;
    try {
        const data = await fetch(url, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',

                'Content-Encoding': 'utf-8',
            },
            body: JSON.stringify({
                admin_id:admin_id,
                name:name,
                parent:parent,
                mask:mask


            }),
        });

        let responseJsonData = await data.json();


        return responseJsonData;


    }

    catch (e) {
        console.log(e)
    }
}

export default request_CREATE_CATEGORIES;
