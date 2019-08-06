function request_DELETE_GIFT(gift)  {


    const url = `http://185.231.154.198:5000/delete/avatar/${gift}`;



    try {
        fetch(url);
    } catch (e) {
        console.log(e)
    }
}

export default request_DELETE_GIFT
