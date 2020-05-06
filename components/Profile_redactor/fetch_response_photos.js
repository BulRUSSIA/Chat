import {address} from '../ChatPortal/config_connect'

async function  createFormData(user_id,privated,description,photo) {
    const data = new FormData();

    data.append("photo", {
        type: photo.type,
        name:user_id,
        uri:
            Platform.OS === "android" ? photo.uri : photo.uri.replace("file://", "")
    });
    data.append("id_nick",
        user_id,

    );
    data.append("privated",
        privated,

    );

    data.append("description",
        description,

    );

    return data;
}

async function request_ADD_PHOTO(user_id,privated,description,photo)  {

    const url = address + `/add/photo/`;
    try {
        const data = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            body:await createFormData(user_id,privated,description,photo)
        });

        let responseJsonData = await data.json();


        return responseJsonData;


    }

    catch (e) {
        console.log(e)
    }
}

export default request_ADD_PHOTO;
