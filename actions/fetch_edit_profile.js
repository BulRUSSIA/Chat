import {address} from "../config_connect";

async function request_EDIT_PROFILE(nic,bday,firstName,lastName,city,email,sex,color,about)  {


    const url = address + `/edit/profile/${nic}/${bday}/${firstName}/${lastName}/${city}/${email}/${sex}/${color}/${about}`;
    console.log(nic);
    console.log(bday);
    console.log(firstName);
    console.log(lastName);
    console.log(city);
    console.log(email);
    console.log(sex);
    console.log(color);
    console.log(about);


    try {
    await    fetch(url);
    } catch (e) {
        console.log(e)
    }
}

export default request_EDIT_PROFILE
