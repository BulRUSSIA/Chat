async  function request_login(login,password,imei) {

    try {




       const response =  await fetch(`http://185.231.154.198:5000/auth/${login}/${password}/${imei}`);
       let responseJsonData = await response.json();



        return responseJsonData;


    } catch (err) {
        console.warn(err)
    }
}
export default request_login