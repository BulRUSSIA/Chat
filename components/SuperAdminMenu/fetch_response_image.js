import {address} from '../ChatPortal/config_connect'

async function  createFormData(creator,name,price,photo) {
    const data = new FormData();

    data.append("photo", {
        type: photo.type,
        name:name,
        uri:
            Platform.OS === "android" ? photo.uri : photo.uri.replace("file://", "")
    });
    data.append("creator",
        creator,

    );
    data.append("price",
        price,

    );

    data.append("name",
        name,

    );


    console.log('image data',data);
    return data;
}
async function request_ADD_IMAGE(creator,name,price,photo)  {

    const url = address + `/add/avatar/admin/`;
    try {
        const data = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            body: await createFormData(creator,name,price,photo)

        });

        let responseJsonData = await data.json();


        return responseJsonData;


    }

    catch (e) {
        console.log(e)
    }
}

export default request_ADD_IMAGE;
