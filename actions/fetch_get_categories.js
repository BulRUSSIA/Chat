import {address} from "../config_connect";

async function request_GET_CATEGORIES(parent)  {

    const url = address + `/get/categories/${parent}`;


    try {
        let response = await fetch(url);
        let responseJsonData = await response.json();
        let categories = responseJsonData;

        return categories
    } catch (e) {
        console.log(e)
    }
}

export default request_GET_CATEGORIES;
