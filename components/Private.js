import React from 'react';
import {
    FlatList,

    Text,
    View,
    BackHandler,

    ImageBackground, ToolbarAndroid, TextInput, Alert, Image,Modal
} from 'react-native';
import private_menu from './const/private_menu'
import styles from '../styles'
import request_GET_MESSAGES_PRIVATE from "../actions/fetch_private_message";
import request_SEND_MESSAGES_PRIVATE from "../actions/fetch_send_private";
import data from 'emoji-mart-native/data/apple.json'

import {ModalPicker, NimblePicker} from 'emoji-mart-native'

import {EmojiButton, Picker, Emoji} from 'emoji-mart-native'
import View_stuff from "./View_stuff";

const emojiImage = require('./Image/smile-256x256.png')

export default class Private extends React.Component {


    constructor(props) {
        super(props);


        this.state = {
            color: [],

            room: this.props.private_room,
            private: this.props.private_data,
            users: [],
            item_menu: private_menu,
            text: '',
            smiles: '',
            msg: '',
            pr_inf: '',
            selectedEmoji: '',

            modalVisible: false,
            showEmojiPicker: false,


        };


    }


    renderSeparator = () => (
        <View
            style={{
                backgroundColor: '#042441',
                height: 0.5

            }}
        />
    );


    update_msg = async () => {


        const message = await request_GET_MESSAGES_PRIVATE(this.state.room);
        this.setState({
                private: message,


            }
        );


    };

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
        clearInterval(this.interval);
        console.log('i am unmount chatting')
    }

    componentDidMount = () => {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);

        console.log(this.state.DataSource);
        this.interval = setInterval(() => this.update_msg(), 10000);


    };


    handleBackButton = () => {


        return true

    };

    onActionSelected = async (position) => {


        if (position === 0) {
            console.log("I am in 0");


        }
        if (position === 1) {
            console.log("I am in 1");


        }

        if (position === 2) {

            console.log("I am in 2");
        }
        if (position === 3) {

            const {router} = this.props;
            this.componentWillUnmount();
            router.pop({
                room: this.props.room,
                nic: this.props.nic,
                chat_name: this.props.chat_name,
                DataSource: this.props.list_data,


            });


        }
    };


    send_msg = async (messages) => {


        if (this.state.text !== '' || this.state.smiles !== '') {
            this.setState({
                isLoading: false,
                text: messages,


            });

            await request_SEND_MESSAGES_PRIVATE(this.props.nic, messages, this.state.room);
            console.log('my nicK:' + this.props.nic);


            this.setState({
                isLoading: false,
                text: '',


            });


            await this.update_msg();

        } else {

            Alert.alert('Сообщение не может быть пустым!');


        }


        /*    .catch(error => this.setState({error}));*/
    };


    check_emoji = (emoji) => {


        console.log(emoji);

        if (emoji.match((/:.*:/)) === null) {


            return (

                <Emoji emoji='' size={19}/>


            )


        } else {

            let a = (/:.*:/).exec(emoji).toString();
            console.log(a + 'EMOJION');


            return (

                <Emoji emoji={a} size={19}/>


            )


        }


    };


    check_text_2 = (created, text) => {

        let replacer = text.replace(/:.*:/g, '');

        if (replacer === null) {


            return (
                <Text style={styles.private2}

                >{created + '\t\t\t\n'}
                    {'\t\t\t' + text}


                </Text>


            )


        } else {


            return (
                <Text style={styles.private2}

                >{created + '\t\t\t\n'}
                    {'\t\t\t' + replacer}


                </Text>


            );


        }

    };


    check_text_1 = (created, text) => {

        let replacer = text.replace(/:.*:/g, '');

        if (replacer === null) {


            return (
                <Text style={styles.private1}

                >{created + '\t\t\t\n'}
                    {'\t\t\t' + text}


                </Text>


            )


        } else {


            return (
                <Text style={styles.private1}

                >{created + '\t\t\t\n'}
                    {'\t\t\t' + replacer}


                </Text>


            );


        }

    };


    _renderItem = ({item}) => {


        let user = this.props.private_chatter;

        if (item.user === user) {


            return (


                <View style={{flex: 1, flexDirection: 'row'}}>


                    <View style={{position: 'relative'}}>
                        {this.check_text_2(item.createdAt, item.message)}

                    </View>
                    <View
                        style={{paddingTop: 33, marginBottom: 22, position: 'absolute', marginLeft: 14, flex: 1,}}>
                        {this.check_emoji(item.message)}
                    </View>
                </View>


            )


        } else {

            return (


                <View style={{flex: 1, flexDirection: 'row'}}>


                    <View style={{position: 'relative'}}>
                        {this.check_text_1(item.createdAt, item.message)}

                    </View>
                    <View style={{paddingTop: 40, marginBottom: 20, position: 'absolute', marginLeft: 164,}}>
                        {this.check_emoji(item.message)}
                    </View>
                </View>


            )


        }
    };
    showPickerTrigger = (visible) => {
        this.setState({modalVisible: visible})
    };


    render() {


        return (

            <View style={styles.container}

            >
                <ImageBackground source={require('./Image/privateback.jpg')}
                                 style={{width: '100%', height: '100%'}}>


                    <ToolbarAndroid style={styles.containerToolbar}

                                    onActionSelected={this.onActionSelected.bind(this)}

                                    data={this.props.private_chatter}
                                    actions={this.state.item_menu}>


                        <View>

                            <Image source={require('./Image/android-back-icon-20.jpg')}
                                   style={styles.imageViewToolbarArrow}/>

                            <Text style={styles.Private_Toolbar}> {this.props.private_chatter} </Text>


                        </View>


                    </ToolbarAndroid>


                    <FlatList inverted

                              extraData={this.state}
                              data={this.state.private}


                        //   <TouchableOpacity onPress={this.remove_animate_user.bind(this)} >  {color: colors[index % colors.length]}]  {[styles.symbols, {color: colors[index % colors.length]}]}
                              renderItem={this._renderItem}


                              keyExtractor={(item, index) => index.toString()}
                              contentContainerStyle={{paddingBottom: 20}}

                    />

                    <View style={styles.inputBar}>
                        <ModalPicker
                            isVisible={this.state.modalVisible}
                            showCloseButton={true}
                            onPressClose={() => {
                                this.showPickerTrigger(false)
                            }}
                            set='apple'
                            data={data}

                            onSelect={(emoji) => {
                                this.setState({text: emoji['colons'] + (this.state.text)});
                                this.showPickerTrigger(false);

                            }}
                        />


                        <TextInput
                            style={
                                styles.textBox
                            }

                            placeholder='Введите сообщение...             '
                            keyboardType='facebook'

                            ref='                          Сообщение...'
                            onChangeText={(text) => this.setState({text})}
                            value={this.state.text}
                            onSubmitEditing={(event) => this.send_msg(event.nativeEvent.text)}

                            maxLength={120}

                        />
                        <View style={{width: 30, height: 25, marginTop: 20, marginleft: 10,}}>
                            <EmojiButton
                                buttonImage={emojiImage}
                                style={{marginTop: 30}}
                                onButtonPress={() => {
                                    this.showPickerTrigger(true)
                                }}
                            />
                        </View>
                    </View>


                </ImageBackground>


            </View>

        );


    }
}

