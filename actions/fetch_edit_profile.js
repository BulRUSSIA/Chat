import {address} from "../config_connect";


async function request_EDIT_PROFILE(user_id,bday,firstName,lastName,city,email,sex,color,about)  {

    const url = address + `/edit/profile/`;
    try {
        const data = await fetch(url, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',

                'Content-Encoding': 'utf-8',
            },
            body: JSON.stringify({
                user_id:user_id,
                bday:bday,
                firstName:firstName,
                lastName:lastName,
                city:city,
                email:email,
                sex:sex,
                color:color,
                about:about



            }),
        });

        let responseJsonData = await data.json();
        console.log(responseJsonData);

        return responseJsonData;


    }

    catch (e) {
        console.log(e)
    }
}

export default request_EDIT_PROFILE
