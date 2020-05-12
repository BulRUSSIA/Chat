import {address} from "../../../config_connect";


async function set_new_password(user_id,old_password,password)  {

    const url = address + `/update/password/`;
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
                old_password:old_password,
                password:password,


            }),
        });


        return await data.json();


    }

    catch (e) {
        console.log(e)
    }
}

export default set_new_password;
