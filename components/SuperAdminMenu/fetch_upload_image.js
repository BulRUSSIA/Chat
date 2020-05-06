import {address} from "../ChatPortal/config_connect";



async function  createFormData(photo,name) {
    const data = new FormData();

    data.append("photo", {

        name: name,
        type: photo.type,
        uri:
            Platform.OS === "android" ? photo.uri : photo.uri.replace("file://", "")
    });
    console.log('image data',data);
    return data;
}


async function UPLOAD_IMAGE_request(photo,name) {
    await fetch(address + `/upload/avatar/admin`, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        method: "POST",
        body: await createFormData(photo,name)

    });



}

export default UPLOAD_IMAGE_request;
