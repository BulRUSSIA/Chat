import {
    Image, ImageBackground, Text,


    TextInput, ToolbarAndroid,

    Picker,
    View, Button, TouchableOpacity, Animated, FlatList, Alert
} from "react-native";

import React from "react";
import styles from "../../styles";
import DateTimePicker from "react-native-modal-datetime-picker";
import Modal from "react-native-modal";
import colors from "../const/colors";
import menusmiles from '../const/colors_id'
import request_EDIT_PROFILE from "../../actions/fetch_edit_profile";
import request_EDIT_NICK from "../../actions/fetch_edit_nick";
import ChangeName from "./ChangeName";
import Toolbar_redactor from "./Toolbar_redactor";
import ChangeColor from "./ChangeColor";
import ChangeBirthday from "./ChangeBirthday";
import DateTimePickerAction from "./DateTimePickerAction";
import ChangeNameModal from "./ChangeNameModal";

export class Profile_redactor extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isDateTimePickerVisible: false,
            bday: '',
            enabled: false,
            isVisible: false,
            nic: this.props.chat_name,
            user_info: this.props.user_data.data,
            firstName:this.props.firstName,
            lastName:this.props.lastName,
            city:this.props.city,
            about:this.props.about,
            color:this.props.color,
            photo:this.props.photo,
            sex:this.props.sex,
            sm: menusmiles,
            clr: '#010101',
            item_smiles: colors,




        };
        this.animatedVal = new Animated.Value(-350);




    }

    SerializeSex = ()=> {

        switch(this.state.sex) {

            case 'Мужской':
                this.setState({sex:1});
                break;
            case 'Женский':
                this.setState({sex:2});
                console.log(this.state.sex+'state')
                break;
            case 'Не определен':
                this.setState({sex:3});
                break;



        }


    };



    Profile_Edit = async () => {
        console.log(this.state.sex+'sex:::')

        this.SerializeSex();
        await request_EDIT_PROFILE(
            this.props.chat_name,
            this.state.bday,
            this.state.firstName,
            this.state.lastName,
            this.state.city,
            this.state.email,
            this.state.sex,
            this.state.color,
            this.state.about,




        );



        const {navigator} = this.props;
        navigator.pop({

            room: this.props.room,
            nic: this.props.nic,
            chat_name: this.props.chat_name,
        });




    };


    Change_nick = async () => {


        await request_EDIT_NICK(this.props.chat_name,this.state.nic);
        this.hideModalNick()






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


        Animated.timing(                  // Animate over time
            this.animatedVal,            // The animated value to drive
            {
                toValue: -350,                   // Animate to opacity: 1 (opaque)
                duration: 350,

            }
        ).start();
        console.log(this.state.color);
        this.setState({color: evt, clr: clr});
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

    ChangeBirthdayState = (itemValue,itemIndex)=> {

        this.setState({language: itemValue, sex: itemValue})


    };

    ChangeNickModal = (nic)=> {

        this.setState({nic:nic})


    };


    Get_pop = () => {

        const {navigator} = this.props;
        navigator.pop({

            room: this.props.room,
            nic: this.props.nic,
            chat_name: this.props.chat_name,
        });


    };

    render() {


        return <View style={styles.container2}>


            <ImageBackground source={require('../Image/background_redactor.webp')}
                             style={{width: '100%', height: '100%'}}>
<Toolbar_redactor/>


               <ChangeName
                   hideModalNick={this.hideModalNick}
               />

            <ChangeColor
                Change_color={this.Change_color}
                clr={this.state.clr}
                photo={this.state.photo}
                chat_name={this.props.chat_name}

            />

            <ChangeBirthday
                ChangeBirthdayState={this.ChangeBirthdayState}
                hideModal={this.hideModal}
                enabled={this.state.enabled}
                language={this.state.language}

            />



                <TextInput
                    style={
                        styles.TextInput_Redactor
                    }

                    placeholder='Пол             '
                    keyboardType='default'
                    pointerEvents="none"

                    ref='                          Сообщение...'
                    onChangeText={() => this.setState({enabled: true})}
                    value={this.state.sex}


                />

                <Text style={{
                    backgroundColor: 'rgba(107,215,155,0.31)',
                    marginTop: 5,
                    marginBottom: 5,
                    color: 'rgba(13,11,63,0.95)',
                    fontWeight: 'bold',
                    height: 40,
                    fontSize: 19,
                    textAlign: 'center',
                    borderWidth: 0.5,
                    borderRadius: 4,
                }}>
                    {JSON.stringify(this.state.bday).replace(/['"]+/g, '').replace(/T.*Z/g, '')}
                </Text>
                <DateTimePickerAction
                    isDateTimePickerVisible={this.state.isDateTimePickerVisible}
                    handleDatePicked={this.handleDatePicked}
                    hideDateTimePicker={this.hideDateTimePicker}
                    showDateTimePicker={this.showDateTimePicker}
                />

                <ChangeNameModal
                    hideModalNick={this.hideModalNick}
                    isVisible={this.state.isVisible}
                    ChangeNickModal={this.ChangeNickModal}
                    Change_nick={this.Change_nick}
                    nic={this.state.nic}


                />

                <TextInput
                    style={
                        styles.TextInput_Redactor
                    }

                    placeholder='Имя             '
                    keyboardType='default'

                    ref='                          Сообщение...'
                    onChangeText={(firstName) => this.setState({firstName})}
                    value={this.state.firstName}


                    maxLength={16}

                />

                <TextInput
                    style={
                        styles.TextInput_Redactor
                    }

                    placeholder='Фамилия             '
                    keyboardType='default'

                    ref='                          Сообщение...'
                    onChangeText={(lastName) => this.setState({lastName})}
                    value={this.state.lastName}

                    maxLength={16}

                />
                <TextInput
                    style={
                        styles.TextInput_Redactor
                    }

                    placeholder='О себе             '
                    keyboardType='default'

                    ref='                          Сообщение...'
                    onChangeText={(about) => this.setState({about})}
                    value={this.state.about}


                    maxLength={78}

                />

                <TextInput
                    style={
                        styles.TextInput_Redactor
                    }

                    placeholder='Город             '
                    keyboardType='default'

                    ref='                          Сообщение...'
                    onChangeText={(city) => this.setState({city})}
                    value={this.state.city}


                    maxLength={19}

                />
                <ToolbarAndroid style={styles.containerToolbarRedactor1}


                >
                    <View>

                        <Text style={styles.Profile_redactor_Toolbar_text_down_right}  onPress={this.Profile_Edit}


                        >Сохранить</Text>
                    </View>


                    <View>

                        <Text style={styles.Profile_redactor_Toolbar_text_down} onPress={this.Get_pop}


                        > Назад</Text>
                    </View>

                </ToolbarAndroid>



            </ImageBackground>

            <Animated.View style={{
                transform: [{translateY: this.animatedVal}],
                height: 220,
                width: 100,
                backgroundColor: '#e8f6ff',
                position: 'absolute',
                left: 140,
                top: 0,
                bottom: 30,
                right: 0,
                justifyContent: 'center'
            }}>


                <FlatList inverted


                          data={this.state.sm}
                          extraData={this.state}


                          renderItem={(({item, index}) =>


                                  //       <TouchableOpacity onPress={() => this.check_nick(item.user)}>

                                  <View style={{flex: 1, flexDirection: 'column', margin: 1}}>


                                      <TouchableOpacity onPress={(event) => this.close_color(item.clr, item.rclr)}>

                                          <Text
                                              style={[styles.prices1, {backgroundColor: colors[index % colors.length]}]}
                                              onChangeText={(color) => this.setState({color})}
                                              value={item.clr}

                                          >


                                          </Text>


                                      </TouchableOpacity>

                                  </View>
                              //
                          )
                          }

                          numColumns={1}
                          keyExtractor={(item, index) => index.toString()}


                />


            </Animated.View>


        </View>

    }
}


