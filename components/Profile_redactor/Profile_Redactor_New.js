import {
    ImageBackground, Alert, ScrollView
} from "react-native";
import React from "react";
import Toolbar_redactor from "./Toolbar_redactor";
import request_GET_PROFILE from "../../actions/fetch_profile_info";
import {TextInputView} from "./TextInputView"
import DateTimePicker from "./DateTimePicker";
import request_EDIT_PROFILE from "../../actions/fetch_edit_profile";

const pre_data =
    {
        data: [{
            "nic": "Загрузка данных...",
            "photo": 'image_exist'
        }]
    };
export default class Profile_redactor_New extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user_info: pre_data,
            showPicker: false,
            sex: null,
            bday: null,
            firstName: null,
            lastName: null,
            nic: null,
            email: null,
            photo: null,
            city: null,
            color: null,
            about: null,

        };


    }

    Change_date_selector = (field, item) => {

        switch (field) {


            case "nic":

                this.setState({nic: item});
                break;
            case "firstName":

                this.setState({firstName: item});
                break;
            case "lastName":

                this.setState({lastName: item});
                break;
            case "sex":

                this.setState({sex: item});
                break;
            case "color":

                this.setState({color: item});
                break;

            case "city":

                this.setState({city: item});
                break;

            case "about":

                this.setState({about: item});
                break;
        }


    };


    componentDidMount = async () => {
        const profile_info = await request_GET_PROFILE(this.props.nic_id);
        let a = profile_info;
        this.setState({user_info: a});
        for (let i = 0; i < a.length; i++) {
            let obj = a[i];
            this.setState({
                sex: obj.sex,
                bday: obj.bday,
                firstName: obj.firstName,
                lastName: obj.lastName,
                nic: obj.nic,
                about: obj.about,
                email: obj.email,
                photo: obj.photo,
                city: obj.city,
                color: obj.color,
            })
        }


    };
//todo НЕКОРРЕКТНО СОХРАНЯЕТ ДАННЫЕ ПРОБЛЕМА В ЦВЕТЕ ВОЗРАСТЕ И ТД БЭК ТАК ЖЕ ПРОВЕРИТЬ
    save_and_pop = async () => {

        console.log('save_and_pop');

        await request_EDIT_PROFILE(this.props.nic_id,
            this.state.bday,
            this.state.firstName,
            this.state.lastName,
            this.state.city,
            this.state.email,
            this.state.sex,
            this.state.color,
            this.state.about);

        Alert.alert("Готово!", "данные успешно сохранены");

        this.Get_pop();


    };

    Get_pop = () => {
        const {navigator} = this.props;
        navigator.pop();
    };

    showDatePicker = () => {
        this.setState({showPicker: true});
    };

    hideDatePicker = () => {
        this.setState({showPicker: false});
    };
    handleConfirmPicker = (date) => {
        this.setState({bday: date});
        console.log('date bday:', date);
        this.hideDatePicker();
    };


    my_photo = async () => {

        const {navigator} = this.props;
        navigator.push('PhotosAll', {
            get_pop: this.Get_pop, nic_id: this.props.nic_id
        });

    };

    render() {


        return (<ImageBackground source={{uri: 'background_airwaychat'}}
                                 style={{width: '100%', height: '100%'}}>
                <Toolbar_redactor
                    backs={this.Get_pop}
                    save_change={this.save_and_pop.bind(this)}
                />
                <ScrollView>

                    <TextInputView

                        sex={this.state.sex}
                        bday={this.state.bday}
                        firstName={this.state.firstName}
                        lastName={this.state.lastName}
                        nic={this.state.nic}
                        email={this.state.email}
                        photo={this.state.photo}
                        city={this.state.city}
                        color={this.state.color}
                        about={this.state.about}
                        my_photo={this.my_photo}
                        showDatePicker={this.showDatePicker.bind(this)}
                        selector_data={this.Change_date_selector.bind(this)}

                    />

                    <DateTimePicker

                        handleConfirm={this.handleConfirmPicker.bind(this)}
                        hideDatePicker={this.hideDatePicker.bind(this)}
                        isDatePickerVisible={this.state.showPicker}
                        Change_date_selector={this.Change_date_selector}

                    />

                </ScrollView>

            </ImageBackground>

        )

    }
}

