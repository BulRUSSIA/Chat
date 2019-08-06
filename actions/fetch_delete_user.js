 function request_DELETE_USER_ROOM(room,nic)  {


    const url = `http://185.231.154.198:5000/delroom/${room}/${nic}`;



    try {
        fetch(url);
    } catch (e) {
        console.log(e)
    }
}

export default request_DELETE_USER_ROOM
