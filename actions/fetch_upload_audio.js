import {address} from "../config_connect";


async function SEND_AUDIO_request(audio) {


    const url = address + `/add/audio`;
   const a = await fetch(url, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            method: "POST",

            body: audio

        }
    );
    let responseJsonData = await a.json();
    let attach = responseJsonData['attach'];
    let name = responseJsonData['name'];
    console.log('my attach' + attach +'name' + name);
    return [attach,name]


}

export default SEND_AUDIO_request;
