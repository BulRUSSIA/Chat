import {address} from "../components/ChatPortal/config_connect";

async function request_GET_WeddingList()  {

    const url = address +`/get/WeddingList`;


    try {
        let response = await fetch(url);
        let responseJsonData = await response.json();


        return responseJsonData

    } catch (e) {
        console.log(e)
    }
}

export default request_GET_WeddingList;
