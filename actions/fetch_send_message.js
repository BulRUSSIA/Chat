 function request_SEND_MESSAGES(nic,msg,place)  {

    const url = `http://185.231.154.198:5000/sending`;

    try {
   fetch(url, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',

            'Content-Encoding': 'utf-8',
        },
        body: JSON.stringify({
            Nic: nic,
            Msg: msg,
            Place:place,
        }),
    });
    }

    catch (e) {
        console.log(e)
    }
}

export default request_SEND_MESSAGES
