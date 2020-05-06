import {address} from "../config_connect";

async function request_ADD_INVISIBLE(user_id,admin_id)  {

    const url = address + `/add/invisible`;
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
                id_admin:admin_id


            }),
        });

        let responseJsonData = await data.json();


        return responseJsonData;


    }

    catch (e) {
        console.log(e)
    }
}

export default request_ADD_INVISIBLE;
