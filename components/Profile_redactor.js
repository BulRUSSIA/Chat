import {
    Image, ImageBackground, Text,


    TextInput, ToolbarAndroid,

    Picker,
    View, Button, TouchableOpacity
} from "react-native";

import React from "react";
import styles from "../styles";
import DateTimePicker from "react-native-modal-datetime-picker";
import Modal from "react-native-modal";

export class Profile_redactor extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isDateTimePickerVisible: false,
            date: 'Дата Рождения',
            enabled: false,
            isVisible:false,


        };
    }


    showDateTimePicker = () => {
        this.setState({isDateTimePickerVisible: true});
    };

    hideDateTimePicker = () => {
        this.setState({isDateTimePickerVisible: false});
    };

    handleDatePicked = date => {
        this.setState({date: date});
        console.log(date);
        this.hideDateTimePicker();
    };


    hideModal = () => {
        this.setState({enabled: !this.state.enabled});
    };

    hideModalNick = () => {

        this.setState({isVisible: !this.state.isVisible});

    };


    Get_pop =() => {

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
                                this.setState({language: itemValue})
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
                    {JSON.stringify(this.state.date).replace(/['"]+/g, '').replace(/T.*Z/g, '')}
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
                    onChangeText={(text) => this.props.add_text(text)}
                    value={this.props.text}
                    onSubmitEditing={(event) => this.props.send_msg(event.nativeEvent.text)}

                    maxLength={119}

                />

                <TextInput
                    style={
                        styles.TextInput_Redactor
                    }

                    placeholder='Фамилия             '
                    keyboardType='default'

                    ref='                          Сообщение...'
                    onChangeText={(text) => this.props.add_text(text)}
                    value={this.props.text}
                    onSubmitEditing={(event) => this.props.send_msg(event.nativeEvent.text)}

                    maxLength={119}

                />
                <TextInput
                    style={
                        styles.TextInput_Redactor
                    }

                    placeholder='О себе             '
                    keyboardType='default'

                    ref='                          Сообщение...'
                    onChangeText={(text) => this.props.add_text(text)}
                    value={this.props.text}
                    onSubmitEditing={(event) => this.props.send_msg(event.nativeEvent.text)}

                    maxLength={119}

                />

                <TextInput
                    style={
                        styles.TextInput_Redactor
                    }

                    placeholder='Город             '
                    keyboardType='default'

                    ref='                          Сообщение...'
                    onChangeText={(text) => this.props.add_text(text)}
                    value={this.props.text}
                    onSubmitEditing={(event) => this.props.send_msg(event.nativeEvent.text)}

                    maxLength={119}

                />
                <ToolbarAndroid style={styles.containerToolbarRedactor1}


                >
                    <View>

                        <Text style={styles.Profile_redactor_Toolbar_text_down_right}


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

                    <Text style={{fontWeight:'bold',color:'#010101',fontSize:24,marginBottom:32,}}>   Cмена ника</Text>
                    <TextInput

                        underlineColorAndroid = "#00bfff"
                        placeholder='Ник             '
                        keyboardType='email'



                        maxLength={16}

                    />



                    <Button title='Ок' color="#25566e"  />


                </Modal>
            </ImageBackground>

        </View>

    }
}


