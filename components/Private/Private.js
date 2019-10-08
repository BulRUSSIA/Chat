import React from 'react';
import {


    View,
    BackHandler,

    ImageBackground, Alert, Keyboard,TouchableOpacity,Image
} from 'react-native';
import private_menu from '../const/private_menu'
import styles from '../../styles'
import request_GET_MESSAGES_PRIVATE from "../../actions/fetch_private_message";
import request_SEND_MESSAGES_PRIVATE from "../../actions/fetch_send_private";
import data from 'emoji-mart-native/data/apple.json'
import ImagePicker from "react-native-image-picker";
import {ModalPicker} from 'emoji-mart-native'

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
            private_chatter:this.props.private_chatter,
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





        };




    }





    createFormData = (photo) => {
        const data = new FormData();

        data.append("photo", {

            name: photo.fileName,


            type: photo.type,
            uri:
                Platform.OS === "android" ? photo.uri : photo.uri.replace("file://", "")
        });


        return data;
    };


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
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
        clearInterval(this.interval);
        console.log('i am unmount chatting')
    }

    componentDidMount = () => {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);

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
                this.setState({photo: response});
                this.Preview_attach()
            }


        })


    };

    Preview_attach = () => {
        const {photo} = this.state;
        if (this.state.photo) {

            return (

                <Image source={{uri: photo.uri}} style={styles.imageAttachPrivatePreview}/>

            )


        }


    };


    handleUploadPhoto = async () => {
        await fetch("http://79.174.12.77:5000/uploads", {
            headers: {

                'Content-Type': 'multipart/form-data',


            },
            method: "POST",

            body: this.createFormData(this.state.photo)


        })
            .then(response => response.json())
            .then((responseJson) => {


                    this.setState({attachments: responseJson['attach']});


                    Alert.alert("фото успешно загружено!");
                    this.setState({photo: null});


                }
            )


            .catch(error => {

                Alert.alert("Не удалoсь загрузить фото,обратитесь к производителю устройства!", error);

                this.setState({photo: null, attachments: ''});


            });


    };


    send_msg = async () => {


        if (this.state.photo) {

            await this.handleUploadPhoto();

            await request_SEND_MESSAGES_PRIVATE(this.props.nic, this.state.text, this.state.room, this.state.attachments);


            await Keyboard.dismiss();


            await this.update_msg();


            await this.setState({

                text: '', attachments: 'Not'


            });

        } else {

            await request_SEND_MESSAGES_PRIVATE(this.props.nic,
                this.state.text,
                this.state.room,
                this.state.attachments);


            await Keyboard.dismiss();


            await this.update_msg();


            await this.setState({

                text: '', attachments: 'Not'


            });



        }


        /*    .catch(error => this.setState({error}));*/
    };


    check_emoji = (emoji) => {



        if (emoji.match((/:.*:/)) === null) {


            return (

                <Emoji emoji='' size={20}/>


            )


        } else {

            let a = (/:.*:/).exec(emoji).toString();


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


    View_full_photo = async (attach) => {

        const {router} = this.props;

      await  router.push.PHOTO_VIEWER({
            room: this.props.room,
            nic: this.props.nic,
            chat_name: this.props.chat_name,
            photo: attach,
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
                            borderColor: 'rgba(87,174,91,0.9)',
                            borderWidth: 8,
                            flex: 1,
                            backgroundColor: 'rgba(87,174,91,0.9)',
                            borderRadius: 14,
                            marginTop: 5,
                            marginBottom: 5,
                            marginLeft: '15%',
                            marginRight: '15%',
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
                            borderColor: 'rgba(193,225,255,0.8)',
                            borderWidth: 8,
                            flex: 1,
                            backgroundColor: 'rgba(193,225,255,0.8)',
                            borderRadius: 14,
                            marginTop: 5,
                            marginBottom: 5,
                            marginLeft: '15%',
                            marginRight: '15%',
                            alignItems: 'center',
                        }}>
                            <Image source={{uri: attach}} style={styles.imageAttachPrivate}/>
                        </View>
                    </TouchableOpacity>


                );


            }


        }
    };


    _renderItem = ({item}) => {


        let user = this.props.private_chatter;


        if (item.user === user) {


            return (


                <View style={{flex: 1, flexDirection: 'row'}}>


                    <View style={{position: 'relative'}}>
                        {this.check_text_2(item.createdAt, item.message)}
                        {this.attachments_view(item.attachments, item.user)}


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
                        {this.attachments_view(item.attachments, item.user)}


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
                <ImageBackground source={require('../Image/last_back.webp')}
                                 style={{width: '100%', height: '100%'}}>


                    <Header style={{backgroundColor: '#25566e'}}
                            onActionSelected={this.onActionSelected.bind(this)}
                            actions={this.state.item_menu}
                            androidStatusBarColor="#25566e">

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

