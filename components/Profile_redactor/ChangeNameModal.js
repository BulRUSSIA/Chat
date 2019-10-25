import Modal from "react-native-modal";
import {Button,  Text, TextInput} from "react-native";
import React from "react";



export default class ChangeNameModal extends React.Component {




    render() {


        return (


            <Modal
                useNativeDriver={true}
                coverScreen={true}
                animationIn='slideInUp'
                animationOut='slideOutDown'
                onBackdropPress={this.props.hideModalNick}
                style={{
                    height: 134,
                    width: 170,
                    backgroundColor: '#e8f6ff',
                    position: 'absolute',
                    left: 70,
                    top: 200,
                    bottom: 0,
                    right: 0,
                    borderRadius: 4,
                    justifyContent: 'center',
                }}
                isVisible={this.props.isVisible}
            >

                <Text style={{fontWeight: 'bold', color: '#010101', fontSize: 24, marginBottom: 32,}}>   Cмена
                    ника</Text>
                <TextInput

                    underlineColorAndroid="#00bfff"
                    placeholder='Ник             '
                    keyboardType='email'
                    onChangeText={(nic) => this.props.ChangeNickModal(nic)}
                    value={this.props.nic}


                    maxLength={16}

                />


                <Button title='Ок' color="#25566e" onPress={this.props.Change_nick}/>


            </Modal>

        );
    }
}
