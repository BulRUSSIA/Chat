async function request_GET_GIFTS(nick)  {

    const url = `http://185.231.154.198:5000/users/gift/${nick}`;


    try {
        let response = await fetch(url);
        let responseJsonData = await response.json();
        let user_now = responseJsonData.data;

        return user_now
    } catch (e) {
        console.log(e)
    }
}

export default request_GET_GIFTS
