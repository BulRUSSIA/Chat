import {
    Text,
    View,
    TextInput, TouchableOpacity, Dimensions, Picker, FlatList, Alert
} from "react-native";

const {height, width} = Dimensions.get('window');
import React from "react";
import colors from "../const/colors";
import styles from "../../styles"
import FastImage from "react-native-fast-image";
import Modal_change_password from "./Modal_change_password";
import Toast from "react-native-whc-toast";
import set_new_password from "./fetch_function/change_password";
import set_new_nickname from "./fetch_function/change_nickname";
import Modal_change_nickname from "./Modal_change_nickname";

export class TextInputView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisible: false,
            isVisible_nic:false,
            old_password: null,
            new_password: null,
            repeat_password: null,
            new_nic:null,
        };
    }

    change_visible_password = () => {
        this.setState({isVisible: !this.state.isVisible})
    };

    change_visible_nickname = () => {
        this.setState({isVisible_nic: !this.state.isVisible_nic})
    };

    change_nickname_new = (nic)=> {
      this.setState({new_nic:nic})

    };

    change_password_old = (password) => {
        this.setState({old_password: password})
    };

    change_password_new = (password) => {
        this.setState({new_password: password})
    };

    repeat_password_new = (password) => {
        this.setState({repeat_password: password})
    };

    fetch_and_validate_nickname = async ()=>{
        this.setState({isVisible_nic: false});
        let validate = await set_new_nickname(this.props.user_id,this.state.new_nic);
        if (validate["status"]){
            return  this.refs.toast.show("Ник успешно сменен")
        }
        else {
            return this.refs.toast.show("Ник занят,либо содержит недопустимое значение")
        }
    };

    fetch_and_validate_password = async () => {
        this.setState({isVisible: false});
        if (this.state.new_password !== this.state.repeat_password) {
            this.refs.toast.show("Пароли должны совпадать");
        }
        else if (this.state.new_password.length<3) {
            this.refs.toast.show("Пароль должен содержать от 3 и более символов");
            }
         else {
            let validate = await set_new_password(this.props.user_id,this.state.old_password,this.state.new_password);
            if (validate["status"]){
               return  this.refs.toast.show("Пароль успешно сменен")
            }
             else {
                 return this.refs.toast.show("Введен неверный пароль")
            }

        }

    };


    render() {
        this.showDatePicker = this.props.showDatePicker;
        let bday = new Date(this.props.bday);
        let year = bday.getFullYear().toString();
        let mounth = bday.getMonth().toString();
        let day = bday.getDate().toString();

        return (<View style={{flex: 1}}>


                <View style={{flexDirection: 'column'}}>


                    <Text style={{color: 'black', marginLeft: '6%',}}>Имя:</Text>
                    <TextInput style={{
                        borderRadius: 4,
                        borderColor: '#868686',
                        borderWidth: 1,
                        marginTop: 5,
                        backgroundColor: '#ffffff',
                        height: height / 17,
                        marginLeft: '5%',
                        marginRight: '5%'
                    }}
                               placeholderTextColor="#5C6A6E"

                               keyboardType='default'
                               multiline={true}
                               value={this.props.firstName}
                               onChangeText={(text) => this.props.selector_data("firstName", text)}
                               maxLength={16}/>
                    <Text style={{color: 'black', marginLeft: '6%',}}>Фамилия:</Text>

                    <TextInput style={{
                        borderRadius: 4,
                        borderColor: '#868686',
                        borderWidth: 1,
                        marginTop: 5,
                        backgroundColor: '#ffffff',
                        height: height / 17,
                        marginLeft: '5%',
                        marginRight: '5%'
                    }}
                               placeholderTextColor="#5C6A6E"
                               onChangeText={(text) => this.props.selector_data("lastName", text)}
                               keyboardType='default'
                               value={this.props.lastName}
                               maxLength={16}/>


                    <Text style={{color: 'black', marginLeft: '6%',}}>Пол:</Text>

                    <Picker
                        selectedValue={this.props.sex}
                        onValueChange={(sex) => this.props.selector_data("sex", sex)}
                        style={{
                            marginLeft: '5%',
                            height: 45,
                            width: width * 0.9,
                            backgroundColor: "#ffffff",
                            borderRadius: 4,
                            borderColor: '#868686',
                            borderWidth: 1,
                            marginRight: '5%',
                        }}
                    >
                        <Picker.Item label="Мужской" value={1}/>
                        <Picker.Item label="Женский" value={2}/>
                        <Picker.Item label="Не определен" value={0}/>
                    </Picker>
                    <Text style={{color: 'black', marginLeft: '6%',}}>Выберите цвет:</Text>
                    <FlatList horizontal
                              style={{

                                  marginRight: '5%', marginLeft: '5%'
                              }}

                              data={colors}


                              renderItem={(({item}) =>


                                      <TouchableOpacity onPress={() => this.props.selector_data("color", item)}>

                                          <View style={{
                                              flex: 1,
                                              flexDirection: 'column',
                                              width: 30,
                                              height: 35,
                                              margin: 5,
                                          }}>

                                              <Text
                                                  style={[styles.prices1,
                                                      {backgroundColor: "#" + ((item) >>> 0).toString(16).slice(-6),}]}
                                              >
                                              </Text>
                                          </View>
                                      </TouchableOpacity>
                              )
                              }

                              numColumns={1}
                              keyExtractor={(item, index) => index.toString()}


                    />
                    <Text
                        style={[styles.prices1, {backgroundColor: "#" + ((this.props.color) >>> 0).toString(16).slice(-6)}]}


                    >


                    </Text>
                    <Text style={{color: 'black', marginLeft: '6%',}}>День Рождения:</Text>

                    <Text

                        onPress={this.showDatePicker}
                        style={{
                            backgroundColor: '#ffffff',
                            marginRight: '5%',
                            marginLeft: '5%',
                            borderRadius: 4,
                            paddingBottom: 10,
                            paddingTop: 10,
                            textAlign: 'center',
                            fontSize: 16,
                            color: '#3862c0',
                            fontWeight: 'bold'
                        }}>
                        {`${year}-${mounth}-${day}`}
                    </Text>


                    <Text style={{color: 'black', marginLeft: '6%',}}>Город:</Text>
                    <TextInput style={{
                        borderRadius: 4,
                        borderColor: '#868686',
                        borderWidth: 1,
                        marginTop: 5,
                        backgroundColor: '#ffffff',
                        height: height / 17,
                        marginLeft: '5%',
                        marginRight: '5%'
                    }}
                               placeholderTextColor="#5C6A6E"
                               onChangeText={(text) => this.props.selector_data("city", text)}
                               keyboardType='default'
                               multiline={true}
                               value={this.props.city}
                               maxLength={16}/>
                    <Text style={{color: 'black', marginLeft: '6%',}}>О себе:</Text>
                    <TextInput style={{
                        borderRadius: 4,
                        borderColor: '#868686',
                        borderWidth: 1,
                        marginTop: 5,
                        backgroundColor: '#ffffff',
                        height: height / 17,
                        marginLeft: '5%',
                        marginRight: '5%'
                    }}
                               placeholderTextColor="#5C6A6E"
                               onChangeText={(text) => this.props.selector_data("about", text)}
                               keyboardType='default'
                               multiline={true}
                               value={this.props.about}
                               maxLength={80}/>

                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        borderWidth: 1,
                        borderColor: '#707070',
                        marginTop: 10,
                        backgroundColor: 'white',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 5,
                        marginLeft: '1%',
                        marginRight: '1%'
                    }}>
                        <TouchableOpacity onPress={() => this.props.my_photo()} style={{flexDirection: 'row'}}>
                            <FastImage source={{uri: "add_photo"}} style={styles.imageViewProfile_icon}
                                       resizeMode={FastImage.resizeMode.contain}/>
                            <Text style={styles.Profile_List_text}
                            >

                                {'\t'}Мои фото

                            </Text>
                        </TouchableOpacity>


                    </View>

                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        borderWidth: 1,
                        borderColor: '#707070',
                        marginTop: 5,
                        marginBottom: 5,
                        backgroundColor: 'white',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 5,
                        marginLeft: '1%',
                        marginRight: '1%'
                    }}>
                        <TouchableOpacity onPress={() => this.change_visible_password()} style={{flexDirection: 'row'}}>
                            <FastImage source={{uri: "change_password"}} style={styles.imageViewProfile_icon}
                                       resizeMode={FastImage.resizeMode.contain}/>
                            <Text style={styles.Profile_List_text}
                            >

                                {'\t'}Сменить пароль

                            </Text>
                        </TouchableOpacity>

                        <Modal_change_password
                            isVisible={this.state.isVisible}
                            change_visible_password={this.change_visible_password}
                            change_password_old={this.change_password_old}
                            change_password_new = {this.change_password_new}
                            repeat_password_new={this.repeat_password_new}
                            password_old={this.state.old_password}
                            password_new={this.state.new_password}
                            password_repeat={this.state.repeat_password}
                            fetch_and_validate_password={this.fetch_and_validate_password}
                        />

                        <Modal_change_nickname
                            isVisible_nic={this.state.isVisible_nic}
                            change_visible_nickname={this.change_visible_nickname}
                            fetch_and_validate_nickname={this.fetch_and_validate_nickname}
                            new_nic = {this.state.new_nic}
                            change_nickname_new={this.change_nickname_new}
                        />

                    </View>

                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        borderWidth: 1,
                        borderColor: '#707070',
                        backgroundColor: 'white',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 5,
                        marginLeft: '1%',
                        marginRight: '1%'
                    }}>
                        <TouchableOpacity onPress={() => this.change_visible_nickname()} style={{flexDirection: 'row'}}>
                            <FastImage source={{uri: "change_password"}} style={styles.imageViewProfile_icon}
                                       resizeMode={FastImage.resizeMode.contain}/>
                            <Text style={styles.Profile_List_text}
                            >

                                {'\t'}Cменить ник

                            </Text>
                        </TouchableOpacity>


                    </View>

                </View>
                <Toast ref="toast"
                       style={{borderRadius: 14}}

                />

            </View>


        )

    }
}
