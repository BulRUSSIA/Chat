async function request_GET_ROOMS(categories)  {

    const url = `http://185.231.154.198:5000/rooms/list/${categories}`;


    try {
        let response = await fetch(url);
        let responseJsonData = await response.json();
        let rooms = responseJsonData.data;

        return rooms
    } catch (e) {
        console.log(e)
    }
}

export default request_GET_ROOMS
