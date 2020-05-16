import {address} from "../../../config_connect";

async function consent_avatar(user,consent,avatar,sender)  {

    const url = address + `/avatar/accept/`;

    try {
        await fetch(url, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',

                'Content-Encoding': 'utf-8',
            },
            body: JSON.stringify({
                user: user,
                consent: consent,
                avatar:avatar,
                sender:sender


            }),
        });
    }

    catch (e) {
        console.log(e)
    }
}

export default consent_avatar
