import {address} from "../components/ChatPortal/config_connect";

async function request_LAST_ROOM(id)  {

    const url = address + `/last/room`;
    try {
       const data = await fetch(url, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',

                'Content-Encoding': 'utf-8',
            },
            body: JSON.stringify({
                user: id,


            }),
        });

        let responseJsonData = await data.json();


        return responseJsonData;


    }

    catch (e) {
        console.log(e)
    }
}

export default request_LAST_ROOM;
