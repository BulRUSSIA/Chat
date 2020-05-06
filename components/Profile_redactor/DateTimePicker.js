import React from "react";
import DateTimePickerModal from "react-native-modal-datetime-picker";
export default class DateTimePicker extends React.Component  {
    render() {
        return (
                <DateTimePickerModal
                    isVisible={this.props.isDatePickerVisible}
                    mode="date"
                    onConfirm={this.props.handleConfirm}
                    onCancel={this.props.hideDatePicker}
                />
        );
    }
};

