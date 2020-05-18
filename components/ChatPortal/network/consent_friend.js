import {address} from "../../../config_connect";

async function consent_friend(user,consent,friend)  {
    const url = address + `/friend`;
    try {
        await fetch(url, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Content-Encoding': 'utf-8',
            },
            body: JSON.stringify({
                user: user,
                consent:consent,
                friend:friend
            }),
        });
    }
    catch (e) {
        console.log(e)
    }
}

export default consent_friend;
