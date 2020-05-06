import {address} from "../components/ChatPortal/config_connect";

async function request_CREATE_ROOM(admin_id,name,category,mask)  {

    const url = address + `/room/rooms/create/room/`;
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
                category:category,
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

export default request_CREATE_ROOM;
