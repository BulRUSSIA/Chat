import {Alert, Animated, CheckBox, FlatList, ImageBackground, ScrollView, Text, TextInput, View,} from "react-native";

import React from "react";
import colors from "../const/colors";
import menusmiles from '../const/colors_id'
import request_EDIT_PROFILE from "../../actions/fetch_edit_profile";
import request_EDIT_NICK from "../../actions/fetch_edit_nick";
import Toolbar_redactor from "./Toolbar_redactor";
import ChangeColor from "./ChangeColor";
import ModalColor from "./ModalColor";

const checkbox = [{
     checked: false, id: 0, name: 'Пользователь',type:1},
    {checked: false, id: 1, name: 'Администратор',type:2},
    {checked: false, id: 2, name: 'Невидимка',type:16},
    {checked: false, id: 3, name: 'Забаненный',type:8},
    {checked: false, id: 4, name: 'Модератор',type:4

    }];
export default class Profile_redactor_New extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isDateTimePickerVisible: false,
            bday: '',
            enabled: false,
            isVisible: false,
            isVisibleColor: false,
            nic: this.props.chat_name,
            user_info: this.props.user_data.data,
            firstName: this.props.firstName,
            lastName: this.props.lastName,
            city: this.props.city,
            about: this.props.about,
            color: this.props.color,
            photo: this.props.photo,
            sex: this.props.sex,
            sm: menusmiles,
            clr: '#010101',
            item_smiles: colors,
            type:null,
            list: checkbox,


        };
        this.animatedVal = new Animated.Value(-350);


    }

    SerializeSex = () => {

        switch (this.state.sex) {

            case 'Мужской':
                this.setState({sex: 1});
                break;
            case 'Женский':
                this.setState({sex: 2});
                console.log(this.state.sex + 'state')
                break;
            case 'Не определен':
                this.setState({sex: 3});
                break;


        }


    };










    Change_color = () => {

        Animated.timing(                  // Animate over time
            this.animatedVal,            // The animated value to drive
            {
                toValue: 50,                   // Animate to opacity: 1 (opaque)
                duration: 350,

            }
        ).start();

    };

    close_color = (evt, clr) => {


        this.setState({color: evt, clr: clr, isVisibleColor: !this.state.isVisibleColor});
        Alert.alert('Цвет успешно выбран!')


    };

    showDateTimePicker = () => {
        this.setState({isDateTimePickerVisible: true});
    };

    hideDateTimePicker = () => {
        this.setState({isDateTimePickerVisible: false});
    };

    handleDatePicked = date => {
        this.setState({bday: date});
        console.log(date);
        this.hideDateTimePicker();
    };


    hideModal = () => {
        this.setState({enabled: !this.state.enabled});
    };

    hideModalNick = () => {

        this.setState({isVisible: !this.state.isVisible});

    };

    ChangeBirthdayState = (itemValue, itemIndex) => {

        this.setState({language: itemValue, sex: itemValue})


    };

    ChangeNickModal = (nic) => {

        this.setState({nic: nic})


    };


    Get_pop = () => {

        const {navigator} = this.props;
        navigator.pop({

            room: this.props.room,
            nic: this.props.nic,
            chat_name: this.props.chat_name,
        });


    };

    Change_color = () => {

        this.setState({isVisibleColor: !this.state.isVisibleColor})
    };
    hideColorModalMenu = () => {

        this.setState({isVisible: !this.state.isVisible});


    };
    checkThisBox = (itemID) => {
        let list = this.state.list;
        list.checked = false;
        list[itemID].checked = !list[itemID].checked;

        this.setState({list: list,type:list[itemID].type});
        console.log('User-type-',this.state.list)

    };

    render() {


        return (<ImageBackground source={{uri: 'default_background'}}
                                 style={{width: '100%', height: '100%'}}>
                <Toolbar_redactor
                    backs={this.Get_pop}
                />
                <ScrollView>


                    <ChangeColor
                        Change_color={this.Change_color}
                        clr={this.state.clr}
                        photo={this.state.photo}
                        chat_name={this.props.chat_name}


                    />

                    <View style={{backgroundColor: 'rgba(216,216,216,0.47)'}}>


                        <Text style={{color: 'black', marginLeft: '8%',}}>Имя,Фамилия</Text>
                        <TextInput style={{
                            borderRadius: 13,
                            borderColor: '#f61800',
                            borderWidth: 1,
                            marginTop: 10,
                            marginLeft: '8%',
                            marginRight: '8%'

                        }}

                                   placeholderTextColor="#5C6A6E"
                                   placeholder='Имя'
                                   keyboardType='default'
                                   multiline={true}
                                   maxLength={16}/>
                        <TextInput style={{
                            borderRadius: 13,
                            borderColor: '#f61800',
                            borderWidth: 1,
                            marginTop: 10,
                            marginLeft: '8%',
                            marginRight: '8%'

                        }}

                                   placeholderTextColor="#5C6A6E"
                                   placeholder='фамилия'
                                   keyboardType='default'
                                   multiline={true}
                                   maxLength={16}/>
                    </View>
                    <View style={{
                        backgroundColor: 'rgba(175,175,175,0.06)',
                        marginTop: '2%',
                        borderRadius: 14,
                        borderWidth: 1,
                        borderColor: 'rgba(17,149,233,1)',
                        marginLeft: '2%',
                        marginRight: '2%',
                        paddingBottom: '5%'

                    }}>
                        <Text style={{color: 'black', marginLeft: '8%',}}>Немного о себе</Text>

                        <TextInput style={{
                            borderRadius: 13,
                            borderColor: '#f61800',
                            borderWidth: 1,
                            marginTop: 10,
                            marginLeft: '8%',
                            marginRight: '8%'

                        }}

                                   onChangeText={() => this.setState({enabled: true})}
                                   value={this.state.sex}


                                   placeholderTextColor="#5C6A6E"
                                   placeholder='Пол'
                                   keyboardType='default'

                                   maxLength={12}/>


                        <TextInput style={{
                            borderRadius: 13,
                            borderColor: '#f61800',
                            borderWidth: 1,
                            marginTop: 10,
                            marginLeft: '8%',
                            marginRight: '8%'

                        }}

                                   placeholderTextColor="#5C6A6E"
                                   placeholder='Город'
                                   keyboardType='default'
                                   multiline={true}
                                   maxLength={19}/>
                        <TextInput style={{
                            borderRadius: 13,
                            borderColor: '#f61800',
                            borderWidth: 1,
                            marginTop: 10,
                            marginLeft: '8%',
                            marginRight: '8%'

                        }}

                                   placeholderTextColor="#5C6A6E"
                                   placeholder='О себе'
                                   keyboardType='default'
                                   multiline={true}
                                   maxLength={120}/>
                    </View>

                    <View style={{
                        backgroundColor: 'rgba(175,175,175,0.06)',
                        marginTop: '2%',
                        borderRadius: 14,
                        borderWidth: 1,
                        borderColor: 'rgba(17,149,233,1)',
                        marginLeft: '2%',
                        marginRight: '2%',
                        paddingBottom: '5%',
                        paddingTop: '2%',
                        marginBottom:'2%'

                    }}>
                        <Text style={{color: 'black', marginLeft: '8%',}}>Группа</Text>
                        <FlatList


                            data={this.state.list}
                            extraData={this.state}


                            renderItem={(({item}) =>


                                    <View style={{flexDirection: 'row', flex: 1}}>

                                        <CheckBox
                                            value={this.state.list[item.id].checked}
                                            disabled={item[1]}
                                            onValueChange={() => this.checkThisBox(item.id)}
                                        />

                                        <Text style={{marginTop: 5}}> {item.name}</Text>


                                    </View>
                            )
                            }


                            keyExtractor={(item, index) => index.toString()

                            }


                        />

                    </View>

                    <ModalColor
                        hideColorModalMenu={this.hideColorModalMenu}
                        isVisibleColor={this.state.isVisibleColor}
                        sm={this.state.sm}
                        close_color={this.close_color}

                    />


                    <View>


                    </View>
                </ScrollView>
            </ImageBackground>

        )

    }
}

