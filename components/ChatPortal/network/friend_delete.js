import {address} from "../../../config_connect";

async function delete_friend(user,friend)  {
    const url = address + `/friend`;
    try {
        await fetch(url, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Content-Encoding': 'utf-8',
            },
            body: JSON.stringify({
                user: user,
                friend:friend
            }),
        });
    }
    catch (e) {
        console.log(e)
    }
}

export default delete_friend;
