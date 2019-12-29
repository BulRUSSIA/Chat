import request_GET_PROFILE from "../../actions/fetch_profile_info";
import request_MY_NICKNAME from "../../actions/fetch_my_nickname";


export default class SingleTonUpdatePortal {


    zags = null;
    zagsRequestName = null;
    zagsRequest = null;
    zagsName = null;
    balace = null;


    static async PortalUpdates(user_id) {

        try {
            const profile = await request_GET_PROFILE(user_id);
            const b = profile.data;


            for (let i = 0; i < b.length; i++) {
                let obj = b[i];

                const zags = obj.zags;
                const zagsRequest = obj.zagsRequest;
                const balace = obj.balace;
                this.zags = zags;
                this.zagsRequest = zagsRequest;
                this.balace = balace;


                if (zags.length > 1) {
                    const chat_nickname_search_id = await request_MY_NICKNAME(zags); //Поиск ника по id браки чат портал
                    this.zagsName = chat_nickname_search_id[0]

                } else if (zagsRequest.length >= 1) {

                    const chat_nickname_search_id = await request_MY_NICKNAME(zagsRequest); //та же фигня по запросу на брак
                    this.zagsRequestName = chat_nickname_search_id[0];


                }


            }

            return [this.zags, this.zagsName, this.zagsRequest, this.zagsRequestName, this.balace]

        } catch (error) {
            console.log('Error SingleTonUpdate', error);
        }
    }


}

