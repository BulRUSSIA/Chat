function message_api(props) {

    return {
        "_id": {"$oid": "5e1eb2cf0a975a5421793e21"},
        "message": props.message,
        "type": 1,
        "place": props.room_now,
        "system": false,
        "createdAt": {"$date": new Date()},
        "user_id": props.nic,
        "user": props.user,
        "key": "5e1eb2cf0a975a5421793e21",
        "_class": "#c60915",
        "readed": true,
        "user_type": 1,
        "attachments": [],
        "avatars": false,
        "hideNic": false
    };


}

export default message_api;