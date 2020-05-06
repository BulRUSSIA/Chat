import {address} from "../components/ChatPortal/config_connect";

async function request_DELETE_CATEGORIES(admin_id,category_id)  {

    const url = address + `/room/rooms/delete/`;
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
                category_id:category_id,



            }),
        });

        let responseJsonData = await data.json();


        return responseJsonData;


    }

    catch (e) {
        console.log(e)
    }
}

export default request_DELETE_CATEGORIES;
