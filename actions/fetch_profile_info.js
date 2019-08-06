 async function request_GET_PROFILE(nic) {

    const url = `http://185.231.154.198:5000/users/profile/${nic}`;
    console.log(url)

    try {


        let response = await fetch(url);
        let responseJsonData = await response.json();
        let userdate = JSON.parse(JSON.stringify(responseJsonData));


        return userdate;
    } catch (e) {
        console.log(e)
    }

}

export default request_GET_PROFILE
