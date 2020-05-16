import request_GET_PROFILE from "../../../actions/fetch_profile_info";
import request_MY_NICKNAME from "../../../actions/fetch_my_nickname";


export default class SingleTonUpdatePortal {


    zags = null;
    zagsRequestName = null;
    zagsRequest = null;
    zagsName = null;
    balace = null;
    color = null;


    static async PortalUpdates(user_id) {

        try {

            const b = await request_GET_PROFILE(user_id);


            for (let i = 0; i < b.length; i++) {
                let obj = b[i];
                const zags = obj.zags;
                const zagsRequest = obj.zagsRequest;
                const balace = obj.balace;

                if (zags!=null) {
                    this.zags = zags;
                }
                this.zagsRequest = zagsRequest;
                this.balace = balace;



                if (zags !=null) {
                    const chat_nickname_search_id = await request_MY_NICKNAME(zags); //Поиск ника по id браки чат портал
                    this.zagsName = chat_nickname_search_id[0];
                    this.color = chat_nickname_search_id[2]

                } else if (zagsRequest != null && zagsRequest.length >= 1) {

                    const chat_nickname_search_id = await request_MY_NICKNAME(zagsRequest); //та же фигня по запросу на брак
                    this.zagsRequestName = chat_nickname_search_id[0];


                }


            }


            let arr = [this.zags, this.zagsName, this.zagsRequest, this.zagsRequestName, this.balace,this.color];
            this.zags = null;
            this.zagsRequestName = null;
            this.zagsRequest = null;
            this.zagsName = null;
            this.balace = null;
            this.color = null;
            return arr
        } catch (error) {
            console.log('Error SingleTonUpdate', error);
        }
    }


}

