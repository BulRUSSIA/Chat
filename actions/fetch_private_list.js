async function request_GET_PRIVATE_LIST(nic) {

    const url = `http://185.231.154.198:5000/personalrooms/${nic}`;
    console.log(url);

    try {


        let response = await fetch(url);
        let responseJsonData = await response.json();
        let userdate = responseJsonData.data;


        return userdate;
    } catch (e) {
        console.log(e)
    }

}

export default request_GET_PRIVATE_LIST
