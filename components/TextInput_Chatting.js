import {
    Image,


    TextInput,

    TouchableWithoutFeedback,
    View
} from "react-native";

import React from "react";
import styles from "../styles";


export class TextInput_Chatting extends React.Component {


    render() {


        return <View style={styles.inputBar}>


            <TextInput
                style={
                    styles.textBox
                }

                placeholder='Введите сообщение...             '
                keyboardType='email-address'

                ref='                          Сообщение...'
                onChangeText={(text) => this.props.add_text(text)}
                value={this.props.text}
                onSubmitEditing={(event) => this.props.send_msg(event.nativeEvent.text)}

                maxLength={120}

            />
            <TouchableWithoutFeedback

            >
                <Image
                    style={{width: 35, height: 35, marginTop: 7,}}
                    source={require('./Image/Smile.png')}
                />


            </TouchableWithoutFeedback>

        </View>

    }
}