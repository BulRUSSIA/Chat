
async  function request_IMEI() {

    try {

        const IMEI = require('react-native-imei');


        let hyeta = await IMEI.getImei();
        return hyeta[0];


    } catch (err) {
        console.warn(err)
    }
}
export default request_IMEI
