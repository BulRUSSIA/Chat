import {address} from "../components/ChatPortal/config_connect";

function request_DELETE_GIFT(gift)  {


    const url = address + `/delete/gift/${gift}`;



    try {
      return   fetch(url);
    } catch (e) {
        console.log(e)
    }
}

export default request_DELETE_GIFT
