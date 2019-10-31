import {address} from "../config_connect";

async function request_UNBAN_USER(user_id,banner_id,name_admin,id_document)  {

    const url = address + `/Unban/User`;
    try {
        const data = await fetch(url, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',

                'Content-Encoding': 'utf-8',
            },
            body: JSON.stringify({
                id_user: user_id,
                id_banner:banner_id,
                name_admin:name_admin,
                id_document:id_document


            }),
        });

        let responseJsonData = await data.json();


        return responseJsonData;


    }

    catch (e) {
        console.log(e)
    }
}

export default request_UNBAN_USER;
