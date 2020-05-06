import React, {Component} from 'react';
import {
    Text,
    View,
    KeyboardAvoidingView,
    Alert,
    TouchableOpacity,
    Keyboard, Image, AsyncStorage, Dimensions
} from 'react-native';
import SocketIOClient from 'socket.io-client';
import {TextInput_Chatting} from "./TextInput_Chatting";
import FastImage from "react-native-fast-image";
import {address, address_attach} from "../../config_connect";
import emoticons from "../const/EmojiObject";
import styles from "../../styles";
import {RecyclerListView, DataProvider, LayoutProvider} from 'recyclerlistview'
import {Modal_Chatting_Smiles} from "./Modal_Chatting_Smiles";
import TextTicker from 'react-native-text-ticker'

const {width, height} = Dimensions.get('window');
const Winlayout = Dimensions.get('window');
const ViewTypes = {
    FULL: 0,

};

export default class Flatlist_Chatting_Messaging extends Component {

    constructor(props) {

        super(props);

        let dataProvider = new DataProvider(() => {
            return true;
        });

        this.state = {

            room: this.props.room_now,
            user: this.props.nic,
            message: '',
            system: false,
            hideNic: false,
            itemsCount: -20,
            readed: false,
            isVisible: false,
            active: false,
            color: this.props.color,
            avatar: this.props.avatar,
            ShowSmiles: false,
            isFetching: false,
            editable_txt_smiles: true,
            photo_attachments: false,
            size_av: 18,
            size_msg: 25,
            chatMessages: [],
            list: dataProvider,
            marque_text: '',


        };


        this._layoutProvider = new LayoutProvider(
            index => {


                return ViewTypes.FULL;

            },
            (type, dim) => {

                dim.width = width * 1;
                dim.height = this.state.size_msg * this.state.size_av * 0.2 / Winlayout.scale


            }
        );
    }


    _retrieveData_Settings = async () => {
        try {


            const size_av = await AsyncStorage.getItem('size_avatar');
            const size_msg = await AsyncStorage.getItem('size_message');


            // We have d ata!!
            this.setState({
                size_av: Number(size_av),
                size_msg: Number(size_msg),

            });


        } catch (error) {
            console.log('error -asyncstore', error)
        }
    };
    add_text = async (text) => { // a dd   tex t  to      t e           xti   n  p  u t


        await this.setState({message: text});


    };

    message_object() {

        return {
            room: this.state.room,
            user: this.props.nic,
            message: this.state.message,
            system: this.state.system,
            hideNic: this.state.hideNic,
            attachments: this.props.attachments_url,
            readed: this.state.readed,
            nic: this.props.chat_name,
            color: this.state.color,
            avatar: this.state.avatar,
            createdAt: new Date(),
            type: 1,
        }


    }

    smiles_visible_state = () => {
        this.setState({isVisible: !this.state.isVisible, ShowSmiles: !this.state.ShowSmiles,})

    };
    socket_con = () => {
        this.socket.on('connect', () => {
            this.socket.emit('joined', this.message_object());

        });

    };


    componentWillUnmount() {

        this.socket.on('disconnect', () => {
            this.socket.emit('disconnected', this.message_object());
        });

        this.socket.close()


    };

    componentDidMount = async () => {
        console.log('chaaaaaaaaaaaat_name', this.props.chat_name);

        await this._retrieveData_Settings();

        this.socket = SocketIOClient(`${address}/chat`, {
            jsonp: false,
            reconnection: true,
            reconnectionDelay: 100,
            reconnectionAttempts: 100,
            pingTimeout: 300,
            transport: ['websocket'],
            query: 'b64=1'
        });
        this.socket_con();

        this.socket.on('last_message', (data) => {
            this.setState({
                list: this.state.list.cloneWithRows(
                    this.state.chatMessages.concat(data).reverse()
                ),
                chatMessages: this.state.chatMessages.concat(data),
            });
        });

        this.socket.on('status', (data) => {
            this.setState({
                list: this.state.list.cloneWithRows(
                    this.state.chatMessages.concat(data).reverse()
                ),
                chatMessages: this.state.chatMessages.concat(data),
            });
        });


        await this.socket.on("message", msg => {


            this.setState({
                list: this.state.list.cloneWithRows(
                    this.state.chatMessages.concat(msg).reverse()
                ),
                chatMessages: this.state.chatMessages.concat(msg),
            });


        });

        this.socket.on('run_text', (data) => {
            this.setState({marque_text: data});
        });

    };

    submitChatMessage = async () => {
        await Keyboard.dismiss();
        const message = await this.message_object();


        await this.socket.emit('text', message);
        this.setState({
            message: ''

        });
        if (this.props.attachments_url.length > 0) {
            this.props.close_attach()


        }


    };


    ParsedText = (text, color) => {
        return text.split(/([\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff]])/g).map((elem, index) => {
            if (!elem) return null;
            if ((emoticons[elem]))
                return (
                    <Image style={{
                        width: this.state.size_msg,
                        height: this.state.size_msg,
                        marginTop: '2%',
                        paddingBottom: '1%',
                        resizeMode: 'contain'
                    }} source={emoticons[elem]}
                           key={index * 2}
                    />
                );
            else {

                return (
                    <Text
                        key={index * 7}
                        style={{
                            fontWeight: '200',
                            fontSize: this.state.size_msg,
                            flex: 1,

                            color: color
                        }}>{elem}
                    </Text>

                )
            }


        });
    };


    add_emoji = (emoji) => {              //add emoji  to te xt
        this.setState({
            message: this.state.message + emoji,
            isVisible: !this.state.isVisible,
            ShowSmiles: !this.state.ShowSmiles,
        });
    };


    ShowSmiles = async () => { // логика отображения  смайл   ов    t rue/  1 fal se1 scaleY: -1


        await this.setState({


            ShowSmiles: !this.state.ShowSmiles,
            editable_txt_smiles: !this.state.editable_txt_smiles,
            active: !this.state.active,
            isVisible: !this.state.isVisible,

        });

    };

    action_profile = async (nic, id) => {

        await this.props.actions_profile(nic, id);
        this.setState({message: nic + ','})


    };


    _rowRender = (type, data) => {
        let background = 'rgba(1,1,1,0)';
        let name = data.message.startsWith(this.props.chat_name + ',');
        if (name) {

            background = 'rgba(114,177,238,0.31)'

        }


        return (<View style={{flexDirection: 'row', backgroundColor: background, flex: 1, transform: [{scaleY: -1}]}}>
                {data.avatar && <FastImage source={{uri: data.avatar}} style={{
                    width: this.state.size_av,
                    height: this.state.size_av,
                    borderRadius: 7,
                    marginLeft: 0,
                }} resizeMode={FastImage.resizeMode.contain}/>}
                {data.hideNic &&
                <Text style={{
                    fontSize: this.state.size_msg,
                    marginTop: '2%',
                    color: '#010101',
                    fontWeight: 'bold'
                }}>
                    {data.nic + '\t'} {data.message}
                </Text>}
                {!data.hideNic &&

                <TouchableOpacity style={{flex: 1}}
                                  onPress={() => this.action_profile(data.nic, data.user)}>
                    <Text style={{
                        fontSize: this.state.size_msg,
                        marginTop: '2%',
                        color: data.color,
                        fontWeight: '200',

                    }}>
                        {data.nic}:
                        {this.ParsedText(data.message, data.color)}
                    </Text>
                </TouchableOpacity>
                }

                {data.attachments.length > 0 &&
                <TouchableOpacity
                    style={{

                        alignItems: 'center',
                        flex: 1,
                        flexDirection: 'row',
                        marginTop: '5%',
                        alignSelf: 'center',
                        marginBottom: '5%',
                    }}
                    onPress={() => this.props.View_full_photo(`${address_attach}${data.attachments[0]}`)}>
                    <FastImage source={{uri: `${address_attach}${data.attachments[0]}`}}
                               style={styles.imageAttachRoom}/>
                </TouchableOpacity>
                }
            </View>
        )
    };

    render() {

        const Smiles = this.state.ShowSmiles;
        const running_line = this.state.marque_text;
        return (


            <KeyboardAvoidingView

                style={{flex: 1}}
                behavior="padding">

                <View style={{width: '100%', height: height / 6, flex: 1}}>

                    {running_line.length > 1 &&
                    <TouchableOpacity
                        onLongPress={() => this.setState({marque_text: ''}, Alert.alert('Бегущая строка', 'глаза устали?'))}>
                        <TextTicker
                            style={{fontSize: 20, backgroundColor: 'white'}}

                            scrollSpeed={100}

                        >
                            {this.state.marque_text}
                        </TextTicker>
                    </TouchableOpacity>
                    }
                    <RecyclerListView
                        style={{transform: [{scaleY: -1}]}}
                        dataProvider={this.state.list}
                        layoutProvider={this._layoutProvider}
                        rowRenderer={this._rowRender}
                        // forceNonDeterministicRendering={true}

                    />


                    <TextInput_Chatting
                        key_color='#ffffff'
                        show={this.ShowSmiles}
                        send_msg={this.submitChatMessage}
                        text={this.state.message}
                        active={this.state.active}
                        editable_key={this.state.editable_txt_smiles}
                        add_text={this.add_text}
                        send_audio_screen={this.props.audio_screen}
                    />

                    {Smiles &&


                    <Modal_Chatting_Smiles
                        add_emoji={this.add_emoji}
                        visible={this.smiles_visible_state}
                        isVisible={this.state.isVisible}
                    />


                    }

                </View>
            </KeyboardAvoidingView>

        );

    }


}
