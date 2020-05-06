import {address} from '../../config_connect'

async function request_START_LINE(message)  {

    const url = address + `/run/line`;
    try {
        await fetch(url, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',

                'Content-Encoding': 'utf-8',
            },
            body: JSON.stringify({
                message: message, //так как массив из заявок на брак

            }),
        });




    }

    catch (e) {
        console.log(e)
    }
}

export default request_START_LINE;
