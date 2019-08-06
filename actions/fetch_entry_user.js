async function request_ENTRY_USER_ROOM(nic,room)  {


    const url = `http://185.231.154.198:5000/entry/${nic}/${room}`;



    try {
        fetch(url);
    } catch (e) {
        console.log(e)
    }
}

export default request_ENTRY_USER_ROOM
