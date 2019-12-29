import React from 'react';
import {ActivityIndicator, Alert, Dimensions, Image, Keyboard, TouchableOpacity, View} from 'react-native';
import private_menu from '../const/private_menu'
import styles from '../../styles'
import request_GET_MESSAGES_PRIVATE from "../../actions/fetch_private_message";
import request_SEND_MESSAGES_PRIVATE from "../../actions/fetch_send_private";
import ImagePicker from "react-native-image-picker";
import {Body, Button, Header, Icon, Left, Text, Title,} from 'native-base';
import {Private_action_picker} from "./Private_action_picker";
import {Private_Flatlist} from "./Private_Flatlist";
import emoticons from "../const/EmojiObject";
import {TextInput_Chatting} from "../Chatting/TextInput_Chatting";
import {Flatlist_smiles_chatting} from "../Chatting/Flatlist_smiles_chatting";
import SEND_PHOTO_request from "../../actions/fetch_upload_image";
import {Attachments_preview} from "../Chatting/Attachments_preview";

const screenWidth = Math.round(Dimensions.get('window').width);


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
            attachments: 'Not',
            ShowSmiles: false,
            modal_indicator: false,


        };


    }


    onValueChange = async (value: string) => {
        this.setState({
            selected: value
        });


        if (value === 'key0') {
            await this.handleChoosePhoto()

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

        clearInterval(this.interval);
        console.log('i am unmount chatting')
    }

    componentDidMount = () => {


        this.interval = setInterval(() => this.update_msg(), 7000);


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

            router.pop({
                room: this.props.room,
                nic: this.props.nic,
                chat_name: this.props.chat_name,
                DataSource: this.props.list_data,


            });

            console.log(this.props.nic + 'my nick to ls');


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
                    photo={this.state.photo_attachments}
                    close_attach={this.close_attach}

                />
            )
        }
    };


    send_photo = async () => {
        this.setState({modal_indicator: true});
        const attach = await SEND_PHOTO_request(this.state.photo_attachments);
        this.setState({attachments: attach});
        this.setState({modal_indicator: false});


    };

    send_msg = async () => {

        if (this.state.photo_attachments) {
            await Keyboard.dismiss();
            await this.send_photo();
            //    if (this.state.text !=='') {
            await request_SEND_MESSAGES_PRIVATE(this.props.nic, 'Вложения', this.state.room, this.state.attachments);

            await this.setState({
                text: '', attachments: 'Not', photo_attachments: false
            });
            await this.update_msg();
        } else {

            await Keyboard.dismiss();
            await request_SEND_MESSAGES_PRIVATE(this.props.nic, this.state.text, this.state.room, this.state.attachments);
            await this.setState({
                text: '',
            });
            await this.update_msg();
        }

    };

    add_text = async (text) => {


        await this.setState({text: text})


    };

    add_emoji = async (emoji) => {              //add emoji to text
        await await this.setState({text: this.state.text + emoji});
    };


    View_full_photo = async (attach) => {

        const {router} = this.props;

        await router.push.PHOTO_VIEWER({
            room: this.props.room,
            nic: this.props.nic,
            chat_name: this.props.chat_name,
            photo_attachments: attach,
            private_room: this.props.private_room,
            private_chatter: this.props.private_chatter,
            private_data: this.props.private_data,
        });


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


    ListSmileAction = () => {


        if (this.state.ShowSmiles) {
            Keyboard.dismiss();

            return (


                <Flatlist_smiles_chatting

                    add_emoji={this.add_emoji}


                />


            )


        }


    };
    ParsedText = (text, user) => {

        return text.split(/([\u00a9|\u00ae[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff]])/g).map(elem => {
            if (!elem) return null;
            if ((emoticons[elem]))
                return (

                    <Image style={{ width: 20, height: 20,}}
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

    Modal_Activity = () => {

        if (this.state.modal_indicator) {

            return (


                <ActivityIndicator
                    size='large'
                    animating={this.state.modal_indicator}/>


            )
        }

    };

    _renderItem = ({item}) => {


        let user = this.props.private_chatter;


        if (item.user === user) {


            return (


                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    marginRight: screenWidth / 2,
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
                        {this.attachments_view(item.attachments, item.user)}
                    </View>


                </View>


            )


        } else {

            return (


                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    marginLeft: screenWidth / 2,
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
                        <Text style={{color: 'rgba(37,86,110,0.96)',paddingBottom:'5%',marginTop:'1%'}}

                        >


                            {this.ParsedText(item.message, item.user)}


                        </Text>
                        {this.attachments_view(item.attachments, item.user)}
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

    render() {


        return (

            <View style={{backgroundColor: '#21212f',flex:1}}

            >



                    <Header style={{backgroundColor: '#3c3e5a',}}
                            androidStatusBarColor="#3c3e5a"
                            onActionSelected={this.onActionSelected.bind(this)}
                            actions={this.state.item_menu}
                         >

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
                    {this.Modal_Activity()}


                    <Private_Flatlist

                        private={this.state.private}
                        render={this._renderItem}


                    />

                    {this.view()}


                    <TextInput_Chatting
                        key_color='#3C3E5A'
                        show={this.ShowSmiles}
                        add_text={this.add_text}
                        send_msg={this.send_msg}
                        text={this.state.text}
                        active={this.state.ShowSmiles}


                    />

                    {this.ListSmileAction()}



            </View>

        );


    }
}

