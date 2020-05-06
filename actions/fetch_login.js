import {address} from "../components/ChatPortal/config_connect";
import FireSingleTon from "../FireSingleTon";

async  function request_login(login,password,imei) {

    try {


        let token = await FireSingleTon.fetchToken();
       const response =  await fetch(address + `/authChatApp/${login}/${password}/${imei}/${token}`);
       let responseJsonData = await response.json();



        return responseJsonData;


    } catch (err) {
        console.warn(err)
    }
}
export default request_login
