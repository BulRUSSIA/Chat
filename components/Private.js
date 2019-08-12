import React from 'react';
import {
    FlatList,

    Text,
    View,
    BackHandler,

    ImageBackground, ToolbarAndroid, TextInput, Alert
} from 'react-native';

import request_SEND_MESSAGES from '../actions/fetch_send_message'
import request_GET_MESSAGES from '../actions/fetch_get_messages'
import private_menu from './const/private_menu'
import styles from '../styles'


export default class Private extends React.Component {


    constructor(props) {
        super(props);


        this.state = {
            color: [],
            DataSource: [],
            private:this.props.private_data,
            users: [],
            item_menu: private_menu,
            text: '',
            smiles: '',
            msg: '',
            pr_inf: '',


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

        this.setState(prevState => ({
            DataSource: prevState.DataSource + 1
        }));


        const message = await request_GET_MESSAGES(this.props.room);
        this.setState({
                dataSource: message,


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
        this.interval = setInterval(() => this.update_msg(), 2500);


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

    };


    send_msg = async (messages) => {

        await this.ban_msg();
        if (this.state.text !== '' || this.state.smiles !== '') {
            this.setState({
                isLoading: false,
                text: messages,


            });

            request_SEND_MESSAGES(this.props.nic, messages, this.props.room);
            console.log('my nicK' + this.props.nic);


            this.setState({
                isLoading: false,
                text: '',


            })

        } else {

            Alert.alert('Сообщение не может быть пустым!');

            return this.componentDidMount()
        }


        /*    .catch(error => this.setState({error}));*/
    };


    _renderItem = ({item}) => {


        const user = this.props.private_chatter;
        if (item.user === user) {
            return (


                <View style={{flex: 1, flexDirection: 'row'}}>




                        <Text style={styles.private2}

                        >{item.createdAt+'\t\t\t'}
                            {item.message}


                        </Text>




                </View>


            )


        }


        else {

            return (


                <View style={{flex: 1, flexDirection: 'row'}}>




                    <Text style={styles.private1}
                    >    {item.createdAt+'\t\t\t\t'}
                        {item.message}


                    </Text>




                </View>





            )




        }

    };


    render() {


        return (

            <View style={styles.container}

            >
                <ImageBackground source={require('./Image/private.jpg')}
                                 style={{width: '100%', height: '100%'}}>


                    <ToolbarAndroid style={styles.containerToolbar}

                                    onActionSelected={this.onActionSelected.bind(this)}

                                    data={this.props.private_chatter}
                                    actions={this.state.item_menu}>


                        <View>
                            <Text style={styles.Private_Toolbar}> {this.props.private_chatter} </Text>

                        </View>


                    </ToolbarAndroid>


                    <FlatList inverted

                              extraData={this.state}
                              data={this.state.private}


                        //   <TouchableOpacity onPress={this.remove_animate_user.bind(this)} >  {color: colors[index % colors.length]}]  {[styles.symbols, {color: colors[index % colors.length]}]}
                              renderItem={this._renderItem}


                              keyExtractor={(item, index) => index.toString()}
                              contentContainerStyle={{paddingBottom: 80}}

                    />


                    <View style={styles.inputBar}>


                        <TextInput
                            style={
                                styles.textBox
                            }

                            placeholder='Введите сообщение...             '
                            keyboardType='default'

                            ref='                          Сообщение...'
                            onChangeText={(text) => this.setState({text})}
                            value={this.state.text}
                            onSubmitEditing={(event) => this.send_msg(event.nativeEvent.text)}

                            maxLength={120}

                        />

                    </View>

                </ImageBackground>


            </View>

        );


    }
}

