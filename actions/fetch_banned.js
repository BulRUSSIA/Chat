import {address} from "../config_connect";

async  function request_banned(nic) {

    try {




        const response =  await fetch(address + `/banned/room/${nic}`);
        let responseJsonData = await response.json();



        return responseJsonData;


    } catch (err) {
        console.warn(err)
    }
}
export default request_banned