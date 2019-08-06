async  function request_banned(nic) {

    try {




        const response =  await fetch(`http://185.231.154.198:5000/banned/room/${nic}`);
        let responseJsonData = await response.json();



        return responseJsonData;


    } catch (err) {
        console.warn(err)
    }
}
export default request_banned