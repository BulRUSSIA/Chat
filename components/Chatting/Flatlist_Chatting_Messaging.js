import React, {useState, useEffect, useRef} from "react";
import {Alert, FlatList} from "react-native";
import NetInfo from "@react-native-community/netinfo";
import request_GET_MESSAGES from "../../actions/fetch_get_messages";

function Flatlist_Chatting_Messaging (props) {

    let msg = props.obj_msg;

    const [Fetchmessage, updateMessage] = useState([msg]);

    useEffect(() => {


        if (props.showLoading) {

            NetInfo.addEventListener(async state => {
                if (!state.isConnected) {
                    await props.unmount_comp();
                    Alert.alert(
                        'Проверка связи',
                        'Ooops :( похоже с вашим интернетом не все так просто', // <- this part is optional, you can pass an empty string
                        [

                            {
                                text: 'перезайти',
                                style: 'OK',

                                onPress: async () => {
                                    await props.onActionSelected(4);
                                },
                            }
                        ],
                        {cancelable: false},
                    );
                }
            });

            let id = setInterval(async () => {

                const messages = await request_GET_MESSAGES(props.nic, props.room_now);


                if (!messages && props.room_now !== 'Тюрьма') {

                    Alert.alert(
                        'Бан',
                        'Вы были забанены и будете перемещены в тюрьму ', // <- this part is optional, you can pas s an empty string
                        [
                            {
                                text: 'НА ЗОНУ',
                                style: 'OK',

                                onPress: async () => {
                                    await props.Del_user_change()
                                },
                            }
                        ],
                        {cancelable: false},
                    );
                }
                updateMessage(messages);
            }, 3000);
            return () => clearInterval(id);
        }

    }, [Fetchmessage]);







    return (
        <FlatList inverted={true}

                      maxToRenderPerBatch={60}
                      updateCellsBatchingPeriod={300}
                      data={Fetchmessage}
                      extraData={msg}
                      renderItem={props.render}
                      keyExtractor={(item) => item.key}


    />)


}

export default Flatlist_Chatting_Messaging;
