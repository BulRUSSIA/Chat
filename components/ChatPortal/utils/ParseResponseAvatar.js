
export default class ParseResponseAvatar {


    avatar_id = null;
    avatar_image = null;
    name_sender = null;
    sender_id = null;
    sender_color = null;

    static async parse_avatar_send(data) {
        console.log(data);

        try {

            if (data.length>0) {

                for (let i = 0; i < data.length; i++) {
                    let obj = data[i];
                    this.avatar_id = obj.avatar.id;
                    this.avatar_image = obj.avatar.image;
                    this.name_sender = obj.sender.nic;
                    this.sender_id = obj.sender.id;
                    this.sender_color = obj.sender.color;


                }
            }
            let a = {
                "avatar_id": this.avatar_id,
                "avatar_image": this.avatar_image,
                "name_sender": this.name_sender,
                "sender_id": this.sender_id,
                "sender_color": this.sender_color
            };
            this.avatar_id = null;
            this.avatar_image = null;
            this.name_sender = null;
            this.sender_id = null;
            this.sender_color = null;
            return  a;




            // return data
        } catch (error) {
            console.log('parse_avatar_send', error);
        }
    }


}

