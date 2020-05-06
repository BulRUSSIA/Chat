import React, {Component} from 'react';
import {
    Text,
    View,
    KeyboardAvoidingView,
    ImageBackground,
    Alert,
    TouchableOpacity,
    Keyboard, Image, AsyncStorage, Dimensions
} from 'react-native';
import SocketIOClient from 'socket.io-client';
import FastImage from "react-native-fast-image";
import {address, address_attach} from "../ChatPortal/config_connect";
import emoticons from "../const/EmojiObject";
import styles from "../../styles";
import {RecyclerListView, DataProvider, LayoutProvider} from 'recyclerlistview'
import {TextInput_Chatting} from "../Chatting/TextInput_Chatting";
import {Modal_Chatting_Smiles} from "../Chatting/Modal_Chatting_Smiles";
import {Body, Button, Header, Left, Right, Title} from "native-base";
import Icon from "react-native-vector-icons/AntDesign";
import PopupMenu from "../Rooms/PopupMenu";
import action_private_list from "../const/private_list_actions";
import moment from 'moment';
import PRIVATE_ACTIONS from "../const/PRIVATE_ACTIONS";
import request_DELETE_PERSONALROOMS_ALL from "../../actions/fetch_delete_personalrooms_all";

const {width, height} = Dimensions.get('window');
const Winlayout = Dimensions.get('window');
const ViewTypes = {
    FULL: 0,

};

export default class Private extends Component {

    constructor(props) {

        super(props);

        let dataProvider = new DataProvider(() => {
            return true;
        });

        this.state = {

            room: this.props.private_room,
            user: this.props.nic,
            message: '',
            system: false,
            hideNic: false,
            itemsCount: -20,
            readed: false,
            isVisible: false,
            active: false,
            color: '#010101',
            avatar: false,
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
            user: this.state.user,
            message: this.state.message,
            system: this.state.system,
            hideNic: this.state.hideNic,
            attachments: [],
            readed: this.state.readed,
            nic: this.props.chat_name,
            color: this.state.color,
            avatar: this.state.avatar,
            createdAt: new Date(),
            type: 2,
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
        await this.socket.on("message", msg => {

            console.log('MESSSAGE_RPIVATE:', msg);
            this.setState({
                list: this.state.list.cloneWithRows(
                    // this.reverse(this.state.chatMessages.concat(msg))
                    this.state.chatMessages.concat(msg).reverse()
                ),
                chatMessages: this.state.chatMessages.concat(msg),
            });
        });


        this.socket.on('last_message', (data) => {
            this.setState({
                list: this.state.list.cloneWithRows(
                    this.state.chatMessages.concat(data).reverse()
                ),
                chatMessages: this.state.chatMessages.concat(data),
            });
        });


    };

    onValueChange = async (select) => {


        switch (select) {
            case 0:
                alert('фото');
                break;

            case 1:
                break;


        }


    };

    submitChatMessage = async () => {
        await Keyboard.dismiss();
        const message = await this.message_object();


        await this.socket.emit('text', message);
        this.setState({
            message: ''

        });
        // if (this.props.attachments_url.length > 0) {
        //     this.props.close_attach()
        //
        //
        // }


    };


    ParsedText = (text, color) => {
        return text.split(/([\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff]])/g).map((elem, index) => {
            if (!elem) return null;
            if ((emoticons[elem]))
                return (
                    <Image style={{
                        width: this.state.size_msg,
                        height: this.state.size_msg,
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
                            fontSize: this.state.size_msg,
                            flex: 1,
                            color: color,
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
        let background = 'rgb(184,196,203)';
        let marginleft = 1;
        let marginright = width / 2;
        let color = '#252525';
        if (data.user === this.props.nic) {

            background = 'rgb(87,120,116)';
            marginleft = width / 2;
            marginright = 1;
            color = 'white';

        }


        return (<View style={{flexDirection: 'row', flex: 1, transform: [{scaleY: -1}]}}>


                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    marginLeft: marginleft,
                    marginRight: marginright,
                    backgroundColor: background,
                    borderRadius: 14,
                    marginTop: '2%',
                    paddingLeft: '2%',
                    marginBottom: '2%'
                }}>

                    <View style={{position: 'relative'}}>
                        <Text style={{
                            justifyContent: 'center',
                            color: color
                        }}> {moment(data.createdAt).format('YYYY-MM-DD HH:mm:ss')}</Text>
                        <Text style={{color: 'rgba(37,86,110,0.96)', paddingBottom: '5%', marginTop: '1%'}}

                        >


                            {this.ParsedText(data.message, color)}


                        </Text>

                    </View>


                </View>


                {data.attachments.length > 0 &&

                <FastImage source={{uri: `${address_attach}${data.attachments[0]}`}}
                           style={styles.imageAttachRoom}/>


                }

            </View>

        )


    };

    pop_router = () => {
        const {navigator} = this.props;
        navigator.pop({nic: this.state.user});
        this.props.update_list_pm();

    };

    render() {


        const Smiles = this.state.ShowSmiles;

        return (


            <ImageBackground
                style={{width: '100%', height: '100%'}}

                source={{uri: 'background_airwaychat'}}
            >
                <Header style={{backgroundColor: 'rgba(212,212,212,0.96)',}}
                        androidStatusBarColor="#A9A9A9"


                >

                    <Left style={{flex: 1}}>
                        <Button transparent

                                onPress={() => this.pop_router()}>
                            <Icon
                                style={{color: 'black'}}
                                size={25}
                                name="arrowleft"/>
                        </Button>

                    </Left>
                    <Body>
                        <Title style={{color: 'black'}}>Приват</Title>
                    </Body>

                    <Right>
                        <PopupMenu


                            actions={PRIVATE_ACTIONS}
                            onPress={(e, i) => this.onValueChange(i)}
                        />
                    </Right>

                </Header>
                <View style={{width: '100%', height: height / 6, flex: 1}}>


                    <RecyclerListView
                        style={{transform: [{scaleY: -1}]}}
                        dataProvider={this.state.list}
                        layoutProvider={this._layoutProvider}
                        rowRenderer={this._rowRender}
                        forceNonDeterministicRendering={true}

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
            </ImageBackground>


        );

    }


}
