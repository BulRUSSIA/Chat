import React from 'react';
import {


    View,
    BackHandler,

    ImageBackground, Alert, Keyboard
} from 'react-native';
import private_menu from '../const/private_menu'
import styles from '../../styles'
import request_GET_MESSAGES_PRIVATE from "../../actions/fetch_private_message";
import request_SEND_MESSAGES_PRIVATE from "../../actions/fetch_send_private";
import data from 'emoji-mart-native/data/apple.json'

import {ModalPicker,} from 'emoji-mart-native'

import {Emoji} from 'emoji-mart-native'
import {

    Header,

    Title,
    Button,
    Icon,
    Left,
    Body,

    Text,


} from 'native-base';
import {Private_action_picker} from "./Private_action_picker";
import {Private_TextInput} from "./Private_TextInput";
import {Private_Flatlist} from "./Private_Flatlist";


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
            selected: undefined,


        };


    }


    onValueChange = async (value: string) => {
        this.setState({
            selected: value
        });


        if (value === 'key0') {
            alert('photo send');


        }

    };

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


    send_msg = async () => {


        if (this.state.text !== '' || this.state.smiles !== '') {


            await request_SEND_MESSAGES_PRIVATE(this.props.nic, this.state.text, this.state.room);
            console.log('my nicK:' + this.props.nic);


            this.setState({
                isLoading: false,
                text: '',


            });

            await this.update_msg();
            await this.componentDidMount();
            Keyboard.dismiss();

            return this.componentWillUnmount()

        } else {

            Alert.alert('Сообщение не может быть пустым!');


        }


        /*    .catch(error => this.setState({error}));*/
    };


    check_emoji = (emoji) => {


        console.log(emoji);

        if (emoji.match((/:.*:/)) === null) {


            return (

                <Emoji emoji='' size={20}/>


            )


        } else {

            let a = (/:.*:/).exec(emoji).toString();
            console.log(a + 'EMOJION');


            return (

                <Emoji emoji={a} size={20}/>


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

    add_text = (text) => {


        this.setState({text: text})


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
                        style={{
                            position: 'absolute',
                            marginTop: '10%',
                            marginLeft: '2%',
                            top: 0,
                            bottom: 0,
                            left: 0,
                            right: 0
                        }}>
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
                <ImageBackground source={require('../Image/last_back.jpg')}
                                 style={{width: '100%', height: '100%'}}>


                    <Header style={{backgroundColor: '#25566e'}}
                            onActionSelected={this.onActionSelected.bind(this)}
                            actions={this.state.item_menu}>

                        <Left style={{flex: 1}}>
                            <Button transparent

                                    onPress={() => this.onActionSelected(3)}>
                                <Icon
                                    style={{color: 'white'}}
                                    name="ios-arrow-back"/>
                            </Button>

                        </Left>
                        <Body>
                            <Title>{this.props.private_chatter}</Title>
                        </Body>

                        <Private_action_picker
                            selected={this.state.selected}
                            change={this.onValueChange.bind(this)}


                        />


                    </Header>


                    <Private_Flatlist

                        private={this.state.private}
                        render={this._renderItem}


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


                        <Private_TextInput
                            add_text={this.add_text}
                            send_msg={this.send_msg}
                            text={this.state.text}
                            selected={this.showPickerTrigger}

                        />


                    </View>


                </ImageBackground>


            </View>

        );


    }
}

