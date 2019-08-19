import {
    Image, ImageBackground, Text,


    TextInput, ToolbarAndroid,

    Picker,
    View, Button, TouchableOpacity, Animated, FlatList, Alert
} from "react-native";

import React from "react";
import styles from "../styles";
import DateTimePicker from "react-native-modal-datetime-picker";
import Modal from "react-native-modal";
import colors from "./const/colors";
import menusmiles from './const/colors_id'
import request_EDIT_PROFILE from "../actions/fetch_edit_profile";
import request_EDIT_NICK from "../actions/fetch_edit_nick";

export class Profile_redactor extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isDateTimePickerVisible: false,
            bday: 'Дата Рождения',
            enabled: false,
            isVisible: false,
            nic: this.props.chat_name,
            user_info: this.props.user_data.data,
            firstName: "-",
            lastName: "-",
            city: "-",
            email: "-",
            sex: 3,
            about: "-",
            color: -100,
            sm: menusmiles,
            clr: '#010101',
            item_smiles: colors,


        };
        this.animatedVal = new Animated.Value(-350);


    }



    Profile_Edit = async () => {


        const send = await request_EDIT_PROFILE(
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



        const {router} = this.props;
        router.pop({

            room: this.props.room,
            nic: this.props.nic,
            chat_name: this.props.chat_name,
        });




    };


    Change_nick = async () => {


        const send = await request_EDIT_NICK(this.props.chat_name,this.state.nic);
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


    Get_pop = () => {

        const {router} = this.props;
        router.pop({

            room: this.props.room,
            nic: this.props.nic,
            chat_name: this.props.chat_name,
        });


    };

    render() {


        return <View style={styles.container2}>


            <ImageBackground source={require('./Image/background_redactor.jpg')}
                             style={{width: '100%', height: '100%'}}>

                <ToolbarAndroid style={styles.containerToolbar}

                >


                    <View>
                        <Text style={styles.instructions}>Мой профиль </Text>

                    </View>


                </ToolbarAndroid>
                <TouchableOpacity onPress={this.hideModalNick}>
                    <View style={{
                        backgroundColor: 'rgba(194,191,215,0.78)',
                    }}>
                        <Image source={require('./Image/pen_edit.png')}
                               style={styles.imageAvatar_redactor}/>
                        <Text style={{

                            marginTop: 5,
                            color: 'white',
                            fontWeight: 'bold',
                            marginLeft: 20,
                            fontSize: 20,
                            borderRadius: 8,

                        }}>
                            Cменить ник
                        </Text>

                    </View>
                </TouchableOpacity>

                <View style={{marginLeft: 34,}}>
                    <Image source={{uri: 'https://facebook.github.io/react-native/img/tiny_logo.png'}}
                           style={styles.imageAvatarProfile}/>
                    <TouchableOpacity style={{
                        backgroundColor: this.state.clr,

                        height: 40,
                        width: 40,

                        position: 'absolute',
                        marginLeft: 240,
                        marginBottom: 20,
                        paddingHorizontal: 10,
                        borderRadius: 14,
                        marginTop: 25,

                    }}

                                      onPress={this.Change_color}


                    />
                </View>
                <Modal
                    useNativeDriver={true}
                    coverScreen={true}
                    animationIn='slideInUp'
                    animationOut='slideOutDown'
                    onBackdropPress={this.hideModal}
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
                    isVisible={this.state.enabled}
                >
                    <View>
                        <Picker
                            enabled={this.state.enabled}
                            selectedValue={this.state.language}
                            style={{height: 50, width: 100}}
                            onValueChange={(itemValue, itemIndex) =>
                                this.setState({language: itemValue, sex: itemIndex})
                            }>
                            <Picker.Item label="Мужской" value='Мужской'/>
                            <Picker.Item label="Женский" value='Женский'/>
                            <Picker.Item label="Не определен" value='Не определен'/>
                        </Picker>

                    </View>
                </Modal>

                <TextInput
                    style={
                        styles.TextInput_Redactor
                    }

                    placeholder='Пол             '
                    keyboardType='default'
                    pointerEvents="none"
                    value={this.state.language}
                    ref='                          Сообщение...'
                    onChangeText={() => this.setState({enabled: true})}


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
                <Button color="#25566e" title="Выбрать дату" onPress={this.showDateTimePicker}/>
                <DateTimePicker
                    datePickerModeAndroid='default'
                    isVisible={this.state.isDateTimePickerVisible}
                    onConfirm={this.handleDatePicked}
                    onCancel={this.hideDateTimePicker}
                />
                <TextInput
                    style={
                        styles.TextInput_Redactor
                    }

                    placeholder='Имя             '
                    keyboardType='default'

                    ref='                          Сообщение...'
                    onChangeText={(firstName) => this.setState({firstName})}
                    value={this.props.text}


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
                    value={this.props.text}

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
                    value={this.props.text}


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
                    value={this.props.text}


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


                <Modal
                    useNativeDriver={true}
                    coverScreen={true}
                    animationIn='slideInUp'
                    animationOut='slideOutDown'
                    onBackdropPress={this.hideModalNick}
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
                    isVisible={this.state.isVisible}
                >

                    <Text style={{fontWeight: 'bold', color: '#010101', fontSize: 24, marginBottom: 32,}}>   Cмена
                        ника</Text>
                    <TextInput

                        underlineColorAndroid="#00bfff"
                        placeholder='Ник             '
                        keyboardType='email'
                        onChangeText={(nic) => this.setState({nic})}
                        value={this.state.nic}


                        maxLength={16}

                    />


                    <Button title='Ок' color="#25566e" onPress={this.Change_nick}/>


                </Modal>
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


