import {address} from "../components/ChatPortal/config_connect";

async function request_UPDATE_CATEGORIES(admin_id,change_name,category_id,mask)  {

    const url = address + `/room/rooms/update/`;
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
                change_name:change_name,
                category_id:category_id,
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

export default request_UPDATE_CATEGORIES;
