
import React from "react";
import {Picker,View} from "react-native";
import Modal from "react-native-modal";

export default class ChangeBirthday extends React.Component {




    render() {


        return (


            <Modal
                useNativeDriver={true}
                coverScreen={true}
                animationIn='slideInUp'
                animationOut='slideOutDown'
                onBackdropPress={this.props.hideModal}
                style={{
                    height: 50,
                    width: 120,
                    backgroundColor: '#e8f6ff',
                    position: 'absolute',
                    left: 70,
                    top: 200,
                    bottom: 0,
                    right: 0,
                    borderRadius: 4,
                    justifyContent: 'center',
                }}
                isVisible={this.props.enabled}
            >
                <View>
                    <Picker
                        enabled={this.props.enabled}
                        selectedValue={this.props.language}
                        style={{height: 50, width: 100}}
                        onValueChange={(itemValue, itemIndex) => {this.props.ChangeBirthdayState(itemValue,itemIndex)}

                        }>
                        <Picker.Item label="Мужской" value='Мужской'/>
                        <Picker.Item label="Женский" value='Женский'/>
                        <Picker.Item label="Не определен" value='Не определен'/>
                    </Picker>

                </View>
            </Modal>

        );
    }
}