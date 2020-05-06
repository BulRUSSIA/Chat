import {address} from "../components/ChatPortal/config_connect";



async function  createFormData(photo) {
    const data = new FormData();

    data.append("photo", {

        name: photo.fileName,
        type: photo.type,
        uri:
            Platform.OS === "android" ? photo.uri : photo.uri.replace("file://", "")
    });
    return data;
}


async function SEND_PHOTO_request(photo) {
   const a =  await fetch(address + `/uploads`, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        method: "POST",

        body: await createFormData(photo)

    });

    let responseJsonData = await a.json();
    let attach = responseJsonData['attach'];
    let name = responseJsonData['name'];
    console.log('my attach' + attach +'name' + name);
    return [attach,name]

}

export default SEND_PHOTO_request
