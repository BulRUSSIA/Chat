import {address} from "../config_connect";

async  function request_login(login,password,imei) {

    try {




       const response =  await fetch(address + `/auth/${login}/${password}/${imei}`);
       let responseJsonData = await response.json();



        return responseJsonData;


    } catch (err) {
        console.warn(err)
    }
}
export default request_login