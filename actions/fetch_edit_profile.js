import {address} from "../config_connect";

async function request_EDIT_PROFILE(nic,bday,firsName,lastName,city,email,sex,color,about)  {


    const url = address + `/edit/profile/${nic}/${bday}/${firsName}/${lastName}/${city}/${email}/${sex}/${color}/${about}`;



    try {
    await    fetch(url);
    } catch (e) {
        console.log(e)
    }
}

export default request_EDIT_PROFILE
