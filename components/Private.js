import React from 'react';
import {
    FlatList,
    Image,
    Text,
    View,
    BackHandler,
    TouchableWithoutFeedback,
    Animated,
    ImageBackground, ToolbarAndroid, TextInput, Alert, TouchableOpacity
} from 'react-native';
import fetch_users_in_room from '../actions/fetch_users_in_room'
import request_DELETE_USER_ROOM from '../actions/fetch_delete_user'
import request_SEND_MESSAGES from '../actions/fetch_send_message'
import request_GET_MESSAGES from '../actions/fetch_get_messages'
import request_ENTRY_USER_ROOM from '../actions/fetch_entry_user'
import request_GET_PROFILE from '../actions/fetch_profile_info'
import request_GET_GIFTS from '../actions/fetch_user_gifts'
import menusmiles from './const/smiles'
import private_menu from './const/private_menu'
import styles from '../styles'
import Rooms_list from './const/Room_List'
import Rooms_banned from './const/Room_list_banned'

export default class Private extends React.Component {


    constructor(props) {
        super(props);


        this.state = {
            color: [],
            DataSource: [],
            users: [],
            item_menu: private_menu,
            item_smiles: menusmiles,
            rooms_Unbanned: Rooms_list,
            rooms_Banned: Rooms_banned,
            text: '',
            smiles: '',
            count: '',
            ban: '',

            user_now: '',
            msg: '',
            pr_inf: '',


        };

        this.animatedVal = new Animated.Value(-350);

    }


    callsmile = () => {


        Animated.timing(                  // Animate over time
            this.animatedVal,            // The animated value to drive
            {
                toValue: 100,                   // Animate to opacity: 1 (opaque)
                duration: 350,
                height: 200,
                width: 200,
                backgroundColor: '#dbe4e8',
                position: 'absolute',
                left: 80,
                top: 80,
                right: 0,
                justifyContent: 'center',// Make it take a while
                useNativeDriver: true,
            }
        ).start();

    };


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

    check_nick = (messages, smile) => {


        Animated.timing(                  // Animate over time
            this.animatedVal,            // The animated value to drive
            {
                toValue: -350,                   // Animate to opacity: 1 (opaque)
                duration: 350,
                useNativeDriver: true,// Make it take a while
            }
        ).start();


        if (smile !== '' || messages !== '') {
            this.setState({
                text: messages + smile,
                catch(e) {
                    console.log(e)
                }
            });

        } else {

            alert('asd')


        }
    };


    _renderItem = ({item}) => {

        let name = item.message.startsWith(this.props.chat_name + ',');
        let server = item.user;
        let attch = item.attachments;

        if (name === true) {


            return (

                <TouchableOpacity onPress={() => this.Action_Nick(item.user)}>


                    <View style={{flex: 1, flexDirection: 'row', backgroundColor: '#efefef'}}>


                        <Image source={{uri: item.avatars}} style={styles.imageView}/>

                        <Text style={[styles.prices, {color: item._class}]}

                        >
                            {item.user}:

                            <Text style={[styles.symbols, {color: item._class}]}
                            >
                                {item.message}


                            </Text>

                        </Text>


                    </View>

                </TouchableOpacity>


            )


        } else if (server === '') {


            return (

                <TouchableOpacity onPress={() => this.Action_Nick(item.user)}>


                    <View style={{flex: 1, flexDirection: 'row', backgroundColor: '#efefef'}}>


                        <Text style={[styles.prices, {color: '#010101'}]}

                        >
                            {item.user}:

                            <Text style={[styles.symbols, {color: '#010101'}]}
                            >
                                {item.message}


                            </Text>

                        </Text>


                    </View>

                </TouchableOpacity>


            )


        } else if (attch.length > 5) {


            return (


                <View style={{flex: 1, flexDirection: 'row'}}>
                    <Image source={{uri: item.avatars}} style={styles.imageView}/>
                    <Text style={[styles.prices2, {color: item._class}]}

                    >
                        {item.user}:

                        <Text style={[styles.prices2, {color: item._class}]}
                        >
                            {item.message}


                        </Text>

                    </Text>


                    <Image source={{uri: item.attachments}} style={styles.imageAttach}/>


                </View>


            )
        } else if (item.message.startsWith('\b\tзашел') || (item.message.startsWith('\b\tвышел') || (item.message.startsWith('\b\tзашла') || (item.message.startsWith('\b\tвышла') === true)))) {


            return (


                <TouchableOpacity onPress={() => this.Action_Nick(item.user)}>


                    <View style={{flex: 1, flexDirection: 'row'}}>


                        <Text style={[styles.prices, {color: item._class}]}

                        >
                            {item.user}

                            <Text style={[styles.symbols, {color: item._class}]}
                            >
                                {item.message}


                            </Text>

                        </Text>


                    </View>

                </TouchableOpacity>


            )

        } else if ((item.avatars.slice(-1,).startsWith('g') === true) || (item.avatars.slice(-1,).startsWith('/')) === true) {


            return (


                <TouchableOpacity onPress={() => this.Action_Nick(item.user)}>


                    <View style={{flex: 1, flexDirection: 'row'}}>


                        <Text style={[styles.prices, {color: item._class}]}

                        >
                            {item.user}:

                            <Text style={[styles.symbols, {color: item._class}]}
                            >
                                {item.message}


                            </Text>

                        </Text>


                    </View>

                </TouchableOpacity>


            )

        } else {

            return (


                <TouchableOpacity onPress={() => this.Action_Nick(item.user)}>


                    <View style={{flex: 1, flexDirection: 'row'}}>


                        <Image source={{uri: item.avatars}} style={styles.imageView}/>

                        <Text style={[styles.prices, {color: item._class}]}

                        >
                            {item.user}:

                            <Text style={[styles.symbols, {color: item._class}]}
                            >
                                {item.message}


                            </Text>

                        </Text>


                    </View>

                </TouchableOpacity>


            )


        }


    };

    render() {


        return (

            <View style={styles.container}

            >
                <ImageBackground source={require('./Image/e1.jpg')} style={{width: '100%', height: '100%'}}>


                    <ToolbarAndroid style={styles.containerToolbar}

                                    onActionSelected={this.onActionSelected.bind(this)}

                                    data={this.state.users}
                                    actions={this.state.item_menu}>


                        <View>
                            <Text style={styles.Private_Toolbar}>           Личные сообщения </Text>

                        </View>


                    </ToolbarAndroid>


                    <FlatList inverted

                              extraData={this.state}
                              data={this.state.dataSource}


                        //   <TouchableOpacity onPress={this.remove_animate_user.bind(this)} >  {color: colors[index % colors.length]}]  {[styles.symbols, {color: colors[index % colors.length]}]}
                              renderItem={this._renderItem}


                              keyExtractor={(item, index) => index.toString()}
                              contentContainerStyle={{paddingBottom: 80}}

                    />


                    <FlatList inverted


                              data={this.state.users}
                              extraData={this.state}


                              ItemSeparatorComponent={this.renderSeparator}


                              renderItem={(({item}) =>


                                      //       <TouchableOpacity onPress={() => this.check_nick(item.user)}>
                                      <TouchableOpacity onPress={() => this.check_nick(item.user, ',')}>
                                          <View style={{flex: 1, flexDirection: 'row'}}>
                                              <Text style={styles.prices}>

                                                  {item.user}
                                                  <Text style={styles.all_users}>
                                                      {item.sumuser}


                                                  </Text>
                                              </Text>


                                          </View>
                                      </TouchableOpacity>
                              )
                              }


                              keyExtractor={(item, index) => index.toString()}

                    />


                    <Animated.View style={{
                        transform: [{translateY: this.animatedVal}],
                        height: 200,
                        width: 200,
                        backgroundColor: '#e8f6ff',
                        position: 'absolute',
                        left: 80,
                        top: 0,
                        bottom: 30,
                        right: 0,
                        justifyContent: 'center'
                    }}>

                        <FlatList inverted


                                  data={this.state.item_smiles}
                                  extraData={this.state}


                                  renderItem={(({item}) =>


                                          <View style={{flex: 1, flexDirection: 'column', margin: 1}}>


                                              <View style={{
                                                  flex: 1, flexDirection: 'row', flexWrap: 'wrap'
                                              }}>

                                                  <Text style={styles.smiles}
                                                        onPress={() => this.check_nick(this.state.text, item.title)}>
                                                      {item.title}


                                                  </Text>


                                              </View>


                                          </View>

                                  )
                                  }

                                  numColumns={5}
                                  keyExtractor={(item, index) => index.toString()}


                        />

                    </Animated.View>


                    <Text style={styles.nick}>
                        {this.state.user_now}

                    </Text>
                    <FlatList inverted


                              data={this.state.action_nick}
                              extraData={this.state}


                              ItemSeparatorComponent={this.renderSeparator}
                              renderItem={(({item}) =>

                                      <TouchableOpacity onPress={() => this.Action_nick_selected(item)}>
                                          <View style={{flex: 1, flexDirection: 'column', margin: 1}}>


                                              <View style={{
                                                  flex: 1, flexDirection: 'row', flexWrap: 'wrap'
                                              }}>


                                                  <Text style={styles.action_profile}
                                                  >
                                                      {item}


                                                  </Text>


                                              </View>


                                          </View>
                                      </TouchableOpacity>
                              )
                              }


                              keyExtractor={(item, index) => index.toString()}


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
                        <TouchableWithoutFeedback
                            onPress={this.callsmile.bind(this)}
                        >
                            <Image
                                style={{width: 35, height: 35, marginTop: 7,}}
                                source={require('./Image/Smile.png')}
                            />


                        </TouchableWithoutFeedback>

                    </View>

                </ImageBackground>


            </View>

        );


    }
}

