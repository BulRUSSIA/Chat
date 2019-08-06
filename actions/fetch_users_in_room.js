async function fetch_users_in_room(room)  {

    const url = `http://185.231.154.198:5000/usersinroom/${room}`;
    console.log(room);

    try {
        let response = await fetch(url);
        let responseJsonData = await response.json();
        let user_now = responseJsonData.data;

        return user_now
    } catch (e) {
        console.log(e)
    }
}

export default fetch_users_in_room
