
import React from "react";
import {Button,  View} from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";

export default class DateTimePickerAction extends React.Component {




    render() {


        return (


            <View >
                <Button color="#25566e" title="Выбрать дату" onPress={this.props.showDateTimePicker}/>
                <DateTimePicker
                    datePickerModeAndroid='default'
                    isVisible={this.props.isDateTimePickerVisible}
                    onConfirm={this.props.handleDatePicked}
                    onCancel={this.props.hideDateTimePicker}
                />
            </View>

        );
    }
}