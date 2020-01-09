
async  function request_IMEI() {

    try {

        const IMEI = require('react-native-imei');


        let imei = await IMEI.getImei();
        return imei[0];


    } catch (err) {
        return imei
    }
}
export default request_IMEI
