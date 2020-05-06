import {address} from "../config_connect";

async  function request_all_users() {

    try {



        const url = address + `/all/users/`;
        const response =  await fetch(url);
        let responseJsonData = await response.json();


        return responseJsonData;


    } catch (err) {
        console.warn(err)
    }
}
export default request_all_users
