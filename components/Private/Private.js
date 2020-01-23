import React from 'react';
import {
    ActivityIndicator,
    Alert, CheckBox,
    Dimensions, FlatList,
    Image,
    Keyboard,
    Modal, TextInput, TouchableOpacity,
    View
} from 'react-native';
import private_menu from '../const/private_menu'
import styles from '../../styles'
import ImagePicker from "react-native-image-picker";
import {Body, Button, Header, Left, Right, Text, Title,} from 'native-base';
import Icon from "react-native-vector-icons/AntDesign";
import PRIVATE_ACTIONS from '../const/PRIVATE_ACTIONS'
import {Private_Flatlist} from "./Private_Flatlist";
import emoticons from "../const/EmojiObject";
import {TextInput_Chatting} from "../Chatting/TextInput_Chatting";
import SEND_PHOTO_request from "../../actions/fetch_upload_image";
import {Attachments_preview} from "../Chatting/Attachments_preview";
import NavigationApp from "../Chatting/NavigationSmiles";
import PopupMenu from "../Rooms/PopupMenu";
import request_GET_MESSAGES from "../../actions/fetch_get_messages";
import request_SEND_MESSAGES from "../../actions/fetch_send_message";
import AudioExample from "../Chatting/AudioRecorder";
import SEND_AUDIO_request from "../../actions/fetch_upload_audio";

const {width, height} = Dimensions.get('window');


export default class Private extends React.Component {


    constructor(props) {
        super(props);


        this.state = {
            color: [],

            room: this.props.private_room,
            private: this.props.private_data,
            private_chatter: this.props.private_chatter,
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
            photo: null,
            attachments: [],
            ShowSmiles: false,
            modal_indicator: false,
            audio_preview: false,


        };


    }


    update_msg = async () => {


        const message = await request_GET_MESSAGES(this.props.nic, this.state.room);
        this.setState({
                private: message,


            }
        );


    };

    componentWillUnmount() {

        clearInterval(this.interval);
        console.log('i am unmount chatting')
    }

    componentDidMount = () => {


        this.interval = setInterval(() => this.update_msg(), 2000);


    };


    onActionSelected = async (position) => {


        const {navigator} = this.props;


        switch (position) {

            case 0:
                await this.handleChoosePhoto();
                break;

            case 1:
                break;


            case 3:
                navigator.pop({
                    room: this.props.room,
                    nic: this.props.nic,
                    chat_name: this.props.chat_name,
                    DataSource: this.props.list_data,


                });


                this.componentWillUnmount();


        }
    };

    handleChoosePhoto = () => {
        const options = {
            noData: true,
        };

        ImagePicker.launchImageLibrary(options, response => {
            if (response.uri) {
                this.setState({photo_attachments: response});
                Alert.alert("фото успешно загружено!", "\nЖмите кнопку отправить");

                this.componentWillUnmount();

                this.componentDidMount()


            }


        });


    };
    close_attach = () => {

        this.setState({photo_attachments: false,})

    };

    view = () => {

        if (this.state.photo_attachments) {

            return (
                <Attachments_preview
                    color='#3C3E5A'
                    photo={this.state.photo_attachments}
                    close_attach={this.close_attach}

                />
            )
        }
    };


    send_photo = async () => {
        this.setState({modal_indicator: true});
        const attach = await SEND_PHOTO_request(this.state.photo_attachments);
        this.setState({attachments: attach[0]});
        this.setState({modal_indicator: false});


    };

    send_msg = async () => {

        if (this.state.photo_attachments) {

            await Keyboard.dismiss();
            await this.send_photo();
            await request_SEND_MESSAGES(this.props.nic, 'Вложения', this.state.room, this.state.attachments, 2);
            await this.setState({
                text: '', attachments: [], photo_attachments: false
            });


        } else {

            await Keyboard.dismiss();

            const res = await request_SEND_MESSAGES(this.props.nic, this.state.text, this.state.room, this.state.attachments, 2);

            let validate_send = res['send'];
            if (!validate_send) {

                Alert.alert('Ошибка', 'Невозможно отправить сообщение')

            }

            this.setState({
                text: '', attachments: []
            });

        }
    };


    add_text = async (text) => {


        await this.setState({text: text})


    };

    add_emoji = async (emoji) => {              //add emoji to  text
        await this.setState({text: this.state.text + emoji});
    };


    View_full_photo = async (attach) => {

        const {navigator} = this.props;

        await navigator.push('PHOTO_VIEWER', {
            room: this.props.room,
            nic: this.props.nic,
            chat_name: this.props.chat_name,
            photo_attachments: attach,
            private_room: this.props.private_room,
            private_chatter: this.props.private_chatter,
            private_data: this.props.private_data,
        });


    };


    Modal_Activity = () => {

        if (this.state.modal_indicator) {

            return (


                <ActivityIndicator
                    size='large'
                    animating={this.state.modal_indicator}/>


            )
        }

    };

    ParsedText = (text, user) => {

        return text.split(/([\u00a9|\u00ae[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff]])/g).map(elem => {
            if (!elem) return null;
            if ((emoticons[elem]))
                return (

                    <Image style={{width: 20, height: 20,}}
                           source={emoticons[elem]}/>


                );
            else {

                if (user === this.props.private_chatter) {
                    return (

                        <Text style={styles.private2}


                        >{elem}</Text>


                    )

                }

                return (

                    <Text style={styles.private1}


                    >{elem}</Text>

                )


            }


        });
    };
    audio_screen = async () => {

        this.setState({audio_preview: !this.state.audio_preview,attachments:[]})
    };


    choice_type_attach = (attach, user, attach_name) => {


        switch (attach_name) {

            case 0:
                return this.attachments_sound_view(attach,user);

            case 1:
                return this.attachments_view(attach, user);

        }

    };

    listening_sound = async (attach) => { //# переход на страницу просмотра фото целиком передаем туда attach с телефона
        const {navigator} = this.props;
        console.log('auido file', attach);
        await navigator.push('PlayerScreen', {title: 'Аудио', filepath: attach});
    };
    attachments_view = (attach, username) => {


        let me = this.props.chat_name;
        if (attach.length > 1) {
            console.log('me:' + me);


            if (me === username) {

                return (
                    <TouchableOpacity onPress={() => this.View_full_photo(attach)}>

                        <View style={{


                            alignItems: 'center',
                        }}>
                            <Image source={{uri: attach}} style={styles.imageAttachPrivate}/>

                        </View>
                    </TouchableOpacity>


                );
            } else {

                return (
                    <TouchableOpacity onPress={() => this.View_full_photo(attach)}>

                        <View style={{

                            alignItems: 'center',
                        }}>
                            <Image source={{uri: attach}} style={styles.imageAttachPrivate}/>
                        </View>
                    </TouchableOpacity>


                );


            }


        }
    };

    attachments_sound_view = (attach, username) => {


        let me = this.props.chat_name;
        if (attach.length > 1) {
            console.log('me:' + me);


            if (me === username) {

                return (
                    <TouchableOpacity onPress={() => this.listening_sound(attach)}>

                        <View style={{


                            alignItems: 'center',
                        }}>

                            <Text style={{fontSize:25,color:'#ffffff',fontWeight:'bold'}}>
                                Аудио файл
                            </Text>

                        </View>
                    </TouchableOpacity>


                );
            } else {

                return (
                    <TouchableOpacity onPress={() => this.listening_sound(attach)}>

                        <View style={{


                            alignItems: 'center',
                        }}>

                            <Text style={{fontSize:25,color:'#ffffff',fontWeight:'bold'}}>
                                Аудио файл
                            </Text>

                        </View>
                    </TouchableOpacity>


                );


            }


        }
    };


    _renderItem = ({item}) => { //render листа с чат сообще ниями

        let user = item.user; //имя пользователя
        let attch = item.attachments;//аттач-
        let attch_name = item.name_attachments;

        let message = item.message; //сообшение
        let user_id = item.user_id; //id поль зователя


        let user_privete = this.props.private_chatter;


        if (item.user === user_privete) {


            return (


                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    marginRight: width / 2,
                    backgroundColor: 'rgba(53,55,81,0.94)',
                    marginTop: '2%',
                    marginBottom: '2%',
                    marginLeft: '2%',
                    borderRadius: 14,
                    paddingLeft: '2%',
                    paddingBottom: '1%'
                }}>
                    <View style={{position: 'relative'}}>
                        <Text style={{justifyContent: 'center', color: 'white'}}>  {item.createdAt}</Text>
                        <Text style={{color: '#3e5d84'}}

                        >


                            {this.ParsedText(item.message, item.user)}

                        </Text>
                        {this.choice_type_attach(attch, user, attch_name)}
                    </View>


                </View>


            )


        } else {

            return (


                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    marginLeft: width / 2,
                    backgroundColor: 'rgba(37,86,110,0.9)',
                    marginTop: '2%',
                    marginBottom: '2%',
                    marginRight: '2%',
                    borderRadius: 14,
                    paddingLeft: '2%',
                    paddingBottom: '1%'
                }}>
                    <View style={{position: 'relative'}}>
                        <Text style={{justifyContent: 'center', color: 'white'}}>  {item.createdAt}</Text>
                        <Text style={{color: 'rgba(37,86,110,0.96)', paddingBottom: '5%', marginTop: '1%'}}

                        >


                            {this.ParsedText(item.message, item.user)}


                        </Text>
                        {this.choice_type_attach(attch, user, attch_name)}
                    </View>


                </View>


            )


        }
    };

    ShowSmiles = () => {


        this.setState({


            ShowSmiles: !this.state.ShowSmiles
        });

    };
    send_audio_file = async (audio) => {  //отправляем фото в  mong oDb

        const attach = await SEND_AUDIO_request(audio);
        this.setState({attachments: attach[0], text: attach[1]});


    };

    render() {
        const Smiles = this.state.ShowSmiles;
        const attachments_audio = this.state.audio_preview;

        return (

            <View style={{backgroundColor: '#21212f', flex: 1}}

            >


                <Header style={{backgroundColor: '#0D5E96',}}
                        androidStatusBarColor="#0D5E96"

                >

                    <Left style={{flex: 1}}>
                        <Button transparent

                                onPress={() => this.onActionSelected(3)}>
                            <Icon
                                style={{color: 'white'}}
                                size={25}
                                name="arrowleft"/>
                        </Button>

                    </Left>
                    <Body>

                        <Title>{this.props.private_chatter}</Title>
                    </Body>
                    <Right>

                        <PopupMenu


                            actions={PRIVATE_ACTIONS}
                            onPress={(e, i) => this.onActionSelected(i)}
                        />
                    </Right>

                </Header>
                {this.Modal_Activity()}

                <Private_Flatlist

                    private={this.state.private}
                    render={this._renderItem}


                />

                {this.view()}



                {
                    attachments_audio &&

                        <View style={{

                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center'


                        }}>

                            <View style={{
                                width: width,
                                height: height / 6,
                                backgroundColor: '#3C3E5A',
                                paddingLeft: '5%',
                                paddingRight: '5%',
                                borderRadius: 4,

                            }}>

                                <AudioExample

                                              send_audio_file={this.send_audio_file}

                                />




                            </View>
                        </View>




                }

                <TextInput_Chatting
                    key_color='#3C3E5A'
                    show={this.ShowSmiles}
                    add_text={this.add_text}
                    send_msg={this.send_msg}
                    text={this.state.text}
                    active={this.state.ShowSmiles}
                    send_audio_screen={this.audio_screen}


                />


                {Smiles &&


                <View style={{
                    width: width, height: height * 0.4,

                    backgroundColor: '#6d6d6d',
                }}>
                    <NavigationApp
                        screenProps={{
                            add_emoji: this.add_emoji

                        }}


                    />
                </View>

                }




            </View>

        );


    }
}

