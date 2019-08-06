import React, { Component } from 'react';
import { AppRegistry, FlatList, StyleSheet, Text, View } from 'react-native';
const colors= [
  '#994F14','#DA291C','#FFCD00','#007A33','#EB9CA8', '#7C878E',
  '#8A004F','#000000','#10069F','#00a3e0','#4CC1A1'
]
export default class FlatListBasics extends Component {
  render() {
    return (
        <View style={styles.container}>
          <FlatList
              data={[
                {key: 'Devin'},
                {key: 'Jackson'},
                {key: 'James'},
                {key: 'Joel'},
                {key: 'John'},
                {key: 'Jillian'},
                {key: 'Jimmy'},
                {key: 'Julie'},
              ]}
              renderItem={({item,index}) =>
                  <Text style={[styles.item,{color:colors[index%colors.length]}]}>
                      {item.key}</Text>}
          />
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
})
--------------------------------------my chat with colors--------------------------------------------
import React from 'react';
import {
    FlatList,
    Image,
    ActivityIndicator,
    Text,
    View,
    TouchableOpacity,
    Animated,
    ImageBackground, ToolbarAndroid, TouchableHighlight, TextInput
} from 'react-native';
import see_msg from './actions/request_phone_state'
import fetch_users_in_room from './actions/fetch_users_in_room'


import styles from './styles'

const colors= [
    '#994F14','#DA291C','#FFCD00','#007A33','#EB9CA8', '#7C878E',
    '#8A004F','#000000','#10069F','#00a3e0','#4CC1A1'
];


export default class chat extends React.Component {


    constructor(props) {
        super(props);
        const menuitem = [{title: 'личные сообщения', show: 'never', eventkey: 1},

            {title: 'смайлики', show: 'never'},

            {title: 'чаттеры', show: 'never'},

            {title: 'написать личное', show: 'never'},
            {title: 'посмотреть профиль', show: 'never'},

            {title: 'сменить комнату', show: 'never'},

            {title: 'мой профиль', show: 'never'},


            {title: 'Чат портал', show: 'never'},

            {title: 'Выход', show: 'never'},


        ];


        this.state = {
            isLoading: false,
            isRefreshing: true,
            DataSource: [],
            users: 'загрузка...',
            item_menu: menuitem,
            text:null,

        };
        this.animatedValue = new Animated.Value(-350)
    }




    callToast = async () => {

        Animated.timing(                  // Animate over time
            await  this.animatedValue,            // The animated value to drive
            {
                toValue: 0,                   // Animate to opacity: 1 (opaque)
                duration: 350,              // Make it take a while
            }
        ).start();

    };

    renderSeparator_1 = () => (
        <View
            style={{
                backgroundColor: '#6b636a',
                height:0.35

            }}
        />
    );



    renderSeparator = () => (
        <View
            style={{
                backgroundColor: '#042441',

            }}
        />
    );



    update_msg = async () => {


        const message = await see_msg();
        this.setState({dataSource: message});

    }

    get_color = (color) => {

        if (color==='black');
        {
            return 1;
        }
        if (color==='grey')
        {
            return 2;
        }
        if (color==='brown');
        {
            return 3;
        }



    }

    componentDidMount() {


        this.timer = setInterval(() => this.update_msg(),5000);


        {


        }
    }



    onActionSelected = async (position) => {


        if (position === 2) {
            console.log("I am in 0");
            this.callToast();
            const usr_list_vw =  await fetch_users_in_room();
            this.setState({users: usr_list_vw});
            this.timer = setInterval(() => this.componentDidMount(),30000);

        }

    };


    send_msg = async (messages) => {

        if (this.state.text != null) {
            this.setState({
                isLoading: false,
                text: messages,


            });
        } else {

            alert('Сообщение не может быть пустым!');

            return this.componentDidMount()
        }



        const url = `http://185.231.154.198:5000/send/${this.state.text}`;



        await fetch(url);
        this.componentDidMount();
        this.setState({
            isLoading: false,
            text: null,


        })


        /*    .catch(error => this.setState({error}));*/
    };

    check_nick = (nick) => {

        alert(nick + "Тут будет действие")

    };



    render() {


        return (


            <View style={styles.container}

            >
                <ImageBackground source={require('./components/e.jpg')} style={{width: '100%', height: '100%'}}>

                    <ToolbarAndroid style={styles.containerToolbar}

                                    onActionSelected={this.onActionSelected.bind(this)}


                                    actions={this.state.item_menu}>


                        <View>
                            <Text style={styles.instructions}>Викторина</Text>
                        </View>


                    </ToolbarAndroid>



                    <FlatList inverted

                              extraData={this.state}
                              data={this.state.dataSource}


                              ItemSeparatorComponent={this.renderSeparator}


                              renderItem={(({item,index}) =>


                                      <TouchableOpacity onPress={() => this.check_nick(item.user)}>

                                          <View style={{flex: 1, flexDirection: 'row'}}>
                                              <Image source={{uri: item.attachments}} style={styles.imageView}/>

                                              <Text style={[styles.prices,{color:colors[index%colors.length]}]}>
                                                  {item.user}:
                                                  <Text style={[styles.symbols,{color:colors[index%colors.length]}]}>
                                                      {item.message}


                                                  </Text>

                                              </Text>


                                          </View>
                                      </TouchableOpacity>
                              )
                              }


                              keyExtractor={(item, index) => index.toString()}
                              contentContainerStyle={{paddingBottom: 80}}

                    />

                    <Animated.View style={{
                        transform: [{translateY: this.animatedValue}],
                        height: 300,
                        width: 110,
                        backgroundColor: 'white',
                        position: 'absolute',
                        left: 250,
                        top: 50,
                        right: 0,
                        justifyContent: 'center'
                    }}>


                        <FlatList inverted


                                  data={this.state.users}
                                  extraData={this.state}


                                  ItemSeparatorComponent={this.renderSeparator_1}


                                  renderItem={(({item}) =>


                                          //       <TouchableOpacity onPress={() => this.check_nick(item.user)}>

                                          <View style={{flex: 1, flexDirection: 'row'}}>

                                              <Text style={styles.prices}>
                                                  {item.user}


                                              </Text>


                                          </View>
                                      // </TouchableOpacity>
                                  )
                                  }


                                  keyExtractor={(item, index) => index.toString()}
                                  contentContainerStyle={{paddingBottom: 80}}

                        />

                    </Animated.View>


                    <TextInput
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: 'white',
                            width: '100%'
                        }}

                        placeholder='Введите сообщение...             '
                        keyboardType='default'

                        ref='                          Сообщение...'
                        onChangeText={(text) => this.setState({text})}
                        value={this.state.text}
                        maxLength={80}


                    />
                    <TouchableHighlight style={styles.touchable} onPress={this.send_msg.bind(this)}>

                        <Text style={styles.touchableButton}>Отправить</Text>
                    </TouchableHighlight>

                </ImageBackground>


            </View>

        );


    }
}



------------------old version--------------------------------
import React from 'react';
import {
    FlatList,
    ActivityIndicator,
    Text,
    View,
    StyleSheet,
    ToolbarAndroid,
    TextInput,
    ImageBackground,
    Image,
    TouchableHighlight,
    TouchableOpacity,
    Animated
} from 'react-native';

export default class FetchExample extends React.Component {


    handleRefresh = async () => {
        this.setState({

            isRefreshing: false,
        }, () => {

            this.ss();


        });


    };

    ss = async () => {

        await this.see_msg();
    };


    renderSeparator = () => (
        <View
            style={{
                backgroundColor: '#042441',

            }}
        />
    );


    constructor(props) {


        const menuitem = [{title: 'личные сообщения', show: 'never', eventkey: 1},

            {title: 'смайлики', show: 'never'},

            {title: 'чаттеры', show: 'never'},

            {title: 'написать личное', show: 'never'},
            {title: 'посмотреть профиль', show: 'never'},

            {title: 'сменить комнату', show: 'never'},

            {title: 'мой профиль', show: 'never'},


            {title: 'Чат портал', show: 'never'},

            {title: 'Выход', show: 'never'},


        ];
        super(props);
        this.state = {
            isLoading: true,
            isRefreshing: false,
            DataSource: null,


            menuitem: menuitem,
        };

        this.animatedValue = new Animated.Value(-350)
    };


    get_msg = async (messages) => {
        this.setState({
            isLoading: false,
            text: messages,


        });


        const url = `http://185.231.154.198:5000/send/${this.state.text}`;


        await fetch(url)


            .catch(error => this.setState({error}));
    };


    user_in_room1 = async () => {

        const url = 'http://185.231.154.198:5000/usersinroom/5c9a5ff00a975a14c67bc739';

        let response = await fetch(url);

        let inrooms = await response.json();


        this.setState({

            isLoading: false,
            inroom: inrooms.data,


        }, function () {


        })


            .catch((error) => {
                console.error(error);
            });


    };

    componentDidMount = () => {
        this.timer = setInterval(() => this.see_msg(),1000);

    };

    see_msg = async () => {



        const url = 'http://185.231.154.198:5000/%D0%92%D0%B8%D0%BA%D1%82%D0%BE%D1%80%D0%B8%D0%BD%D0%B0/message';

        await fetch(url)


            .then((response) => response.json())
            .then((responseJson) => {

                let userdate = JSON.parse(JSON.stringify(responseJson));

                this.setState({

                    isLoading: false,
                    dataSource: userdate,


                });

            })
            .catch((error) => {
                console.error(error);
            });


    };


    check_nick = (nick) => {
        setTimeout(() => {
            Animated.timing(
                this.animatedValue,
                {
                    toValue: -350,
                    duration: 350
                }).start()
        }, 1);


        this.setState({

                text: nick.toString() + ','


            }
        )
    };


    callToast = () => {


        Animated.timing(
            this.animatedValue,
            {
                toValue: 0,
                duration: 350

            }).start()
    };


    onActionSelected = (position) => {


        if (position === 2) {
            console.log("I am in 0");
            this.callToast()
            this.user_in_room1()


        }


    };

    render() {
        const {isRefreshing} = this.state;


        if (this.state.isLoading) {
            return (


                <View style={{flex: 1, padding: 20}}>
                    <ActivityIndicator/>
                </View>
            )
        }


        return (


            <View style={styles.container}>
                <ImageBackground source={require('./components/e.jpg')} style={{width: '100%', height: '100%'}}>


                    <ToolbarAndroid style={styles.containerToolbar}

                                    onActionSelected={this.onActionSelected.bind(this)}


                                    actions={this.state.menuitem}>


                        <View>
                            <Text style={styles.instructions}>Викторина</Text>
                        </View>
                    </ToolbarAndroid>


                    <FlatList inverted

                              extraData={this.state}
                              data={this.state.dataSource}


                              ItemSeparatorComponent={this.renderSeparator}


                              renderItem={(({item}) =>


                                      <TouchableOpacity onPress={() => this.check_nick(item.user)}>

                                          <View style={{flex: 1, flexDirection: 'row'}}>

                                              <Image source={{uri: item.attachments}} style={styles.imageView}/>


                                              <Text style={styles.prices}>
                                                  {item.user}:
                                                  <Text style={styles.symbols}>
                                                      {item.message}


                                                  </Text>

                                              </Text>


                                          </View>
                                      </TouchableOpacity>
                              )
                              }


                              keyExtractor={(item, index) => index.toString()}
                              contentContainerStyle={{paddingBottom: 80}}
                              refreshing={isRefreshing}
                              onRefresh={this.handleRefresh}
                    />


                    <TextInput
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: 'white',
                            width: '100%'
                        }}

                        placeholder='Введите сообщение...             '
                        keyboardType='default'

                        ref='                          Сообщение...'
                        onChangeText={(text) => this.setState({text})}
                        value={this.state.text}
                        maxLength={80}


                    />

                    <TouchableHighlight style={styles.touchable} onPress={this.get_msg.bind(this)}>

                        <Text style={styles.touchableButton}>Отправить</Text>
                    </TouchableHighlight>

                    <Animated.View style={{
                        transform: [{translateY: this.animatedValue}],
                        height: 300,
                        width: 110,
                        backgroundColor: 'white',
                        position: 'absolute',
                        left: 250,
                        top: 50,
                        right: 0,
                        justifyContent: 'center'
                    }}>


                        <FlatList inverted


                                  data={this.state.inroom}
                                  extraData={this.state}


                                  ItemSeparatorComponent={this.renderSeparator}


                                  renderItem={(({item}) =>


                                          <TouchableOpacity onPress={() => this.check_nick(item.user)}>

                                              <View style={{flex: 1, flexDirection: 'row'}}>

                                                  <Text style={styles.prices}>
                                                      {item.user}


                                                  </Text>


                                              </View>
                                          </TouchableOpacity>
                                  )
                                  }


                                  keyExtractor={(item, index) => index.toString()}
                                  contentContainerStyle={{paddingBottom: 80}}

                        />

                    </Animated.View>


                </ImageBackground>
            </View>


        );
    }


}
const styles = StyleSheet.create({


    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#06b3e9',

    },
    touchableButton: {
        color: '#fff',
        fontSize: 20
    },
    newInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        fontSize: 16,
        padding: 10,
        height: 50,
    },
    touchable: {
        backgroundColor: '#06B3E9',
        height: 35,
        //alignSelf:'stretch',
        alignItems: 'center',
        justifyContent: 'center'

    },
    prices: {
        fontSize: 15,

        flex: 1,


        color: '#05077a',
        marginLeft: 1,
        padding: 5


    },
    imageView: {

        width: 25,
        height: 25,
        paddingBottom: 15,
        marginTop: 5,
        borderRadius: 7,


    },

    instructions: {

        textAlign: 'center',

        color: '#ffffff',
        fontSize: 30,
        flex: 1,
        paddingLeft: 91,
        alignSelf: 'center',


    },
    symbols: {
        fontSize: 15,
        textAlign: 'center',
        paddingLeft: 20,
        color: '#ff362e',

        flex: 1

    },

    persdif: {
        fontSize: 20,
        textAlign: 'right',
        margin: 10,
        color: '#2716e9',
    },
    containerToolbar: {

        flexDirection: 'column',
        height: 50,
        width: "100%",


        backgroundColor: '#06b3e9',
    },
    price: {
        fontSize: 20,
        textAlign: 'left',
        margin: 10,
        color: '#ffffff',
        padding: 10,
    },

    separator: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#042441'
    },

});


---------------------------------------my chat down------------------------------
import React from 'react';
import {
  FlatList,
  Image,
  ActivityIndicator,
  Text,
  View,
  TouchableOpacity,
  Animated,
  ImageBackground, ToolbarAndroid, TouchableHighlight, TextInput
} from 'react-native';
import see_msg from './actions/request_phone_state'
import fetch_users_in_room from './actions/fetch_users_in_room'


import styles from './styles'


export default class chat extends React.Component {


  constructor(props) {
    super(props);
    const menuitem = [{title: 'личные сообщения', show: 'never', eventkey: 1},

      {title: 'смайлики', show: 'never'},

      {title: 'чаттеры', show: 'never'},

      {title: 'написать личное', show: 'never'},
      {title: 'посмотреть профиль', show: 'never'},

      {title: 'сменить комнату', show: 'never'},

      {title: 'мой профиль', show: 'never'},


      {title: 'Чат портал', show: 'never'},

      {title: 'Выход', show: 'never'},


    ];

    this.state = {
      isLoading: false,
      isRefreshing: true,
      DataSource: [],
      users: 'загрузка...',
      item_menu: menuitem,
      text:null,

    };
    this.animatedValue = new Animated.Value(-350)
  }




  callToast = async () => {

    Animated.timing(                  // Animate over time
        await  this.animatedValue,            // The animated value to drive
        {
          toValue: 0,                   // Animate to opacity: 1 (opaque)
          duration: 350,              // Make it take a while
        }
    ).start();

  };

  renderSeparator_1 = () => (
      <View
          style={{
            backgroundColor: '#263a41',
            height:0.35

          }}
      />
  );



  renderSeparator = () => (
      <View
          style={{
            backgroundColor: '#042441',

          }}
      />
  );



  update_msg = async () => {


    const message = await see_msg();
    this.setState({dataSource: message});

  }

  get_color = (color) => {

    if (color==='black');
    {
      return 1;
    }
    if (color==='grey')
    {
      return 2;
    }
    if (color==='brown');
    {
      return 3;
    }



  }

  componentDidMount() {


    this.timer = setInterval(() => this.update_msg(),5000);


    {


    }
  }



  onActionSelected = async (position) => {


    if (position === 2) {
      console.log("I am in 0");
      this.callToast();
      const usr_list_vw =  await fetch_users_in_room();
      this.setState({users: usr_list_vw});
      this.timer = setInterval(() => this.componentDidMount(),30000);

    }

  };


  send_msg = async (messages) => {

    if (this.state.text != null) {
      this.setState({
        isLoading: false,
        text: messages,


      });
    } else {

      alert('Сообщение не может быть пустым!');

      return this.componentDidMount()
    }



    const url = `http://185.231.154.198:5000/send/${this.state.text}`;



    await fetch(url);
    this.componentDidMount();
    this.setState({
      isLoading: false,
      text: null,


    })


    /*    .catch(error => this.setState({error}));*/
  };

  check_nick = (nick) => {

    alert(nick + "Тут будет действие")

  };


  render() {


    return (


        <View style={styles.container}

        >
          <ImageBackground source={require('./components/e.jpg')} style={{width: '100%', height: '100%'}}>

            <ToolbarAndroid style={styles.containerToolbar}

                            onActionSelected={this.onActionSelected.bind(this)}


                            actions={this.state.item_menu}>


              <View>
                <Text style={styles.instructions}>Викторина</Text>
              </View>


            </ToolbarAndroid>



            <FlatList inverted

                      extraData={this.state}
                      data={this.state.dataSource}


                      ItemSeparatorComponent={this.renderSeparator}


                      renderItem={(({item}) =>


                              <TouchableOpacity onPress={() => this.check_nick(item.user)}>

                                <View style={{flex: 1, flexDirection: 'row'}}>
                                  <Image source={{uri: item.attachments}} style={styles.imageView}/>

                                  <Text style={this.get_color(color)==1}>
                                    {item.user}
                                    <Text style={styles.symbols}>
                                      {item.message}


                                    </Text>

                                  </Text>


                                </View>
                              </TouchableOpacity>
                      )
                      }


                      keyExtractor={(item, index) => index.toString()}
                      contentContainerStyle={{paddingBottom: 80}}

            />

            <Animated.View style={{
              transform: [{translateY: this.animatedValue}],
              height: 300,
              width: 110,
              backgroundColor: 'white',
              position: 'absolute',
              left: 250,
              top: 50,
              right: 0,
              justifyContent: 'center'
            }}>


              <FlatList inverted


                        data={this.state.users}
                        extraData={this.state}


                        ItemSeparatorComponent={this.renderSeparator_1}


                        renderItem={(({item}) =>


                                //       <TouchableOpacity onPress={() => this.check_nick(item.user)}>

                                <View style={{flex: 1, flexDirection: 'row'}}>

                                  <Text style={styles.prices}>
                                    {item.user}


                                  </Text>


                                </View>
                            // </TouchableOpacity>
                        )
                        }


                        keyExtractor={(item, index) => index.toString()}
                        contentContainerStyle={{paddingBottom: 80}}

              />

            </Animated.View>


            <TextInput
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'white',
                  width: '100%'
                }}

                placeholder='Введите сообщение...             '
                keyboardType='default'

                ref='                          Сообщение...'
                onChangeText={(text) => this.setState({text})}
                value={this.state.text}
                maxLength={80}


            />
            <TouchableHighlight style={styles.touchable} onPress={this.send_msg.bind(this)}>

              <Text style={styles.touchableButton}>Отправить</Text>
            </TouchableHighlight>

          </ImageBackground>


        </View>

    );


  }
}
-------------------emoji------------------------------------------
import React, {Component} from 'react';
import Emoji from 'react-emoji-render';
import {
    Animated,
    AppRegistry,
    FlatList,
    ImageBackground,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import styles from "./styles";

export default class FlatListBasics extends Component {
    constructor(props) {


        const menuitem = [{title: '❤' },

            {title: '😍' },

            {title: '😫'},

            {title: '❤'},
            {title: '❤'}



        ];
        super(props);
        this.state = {
            isLoading: true,
            isRefreshing: false,
            DataSource: '❤',
            text: null,


            menuitem: menuitem,
        };

        this.animatedValue = new Animated.Value(-350)
    };
    check_nick = (nick) => {


        this.setState({

                text: nick.toString() + ','


            }
        )
    };


    render() {
        return (
            <View>
                <TouchableOpacity onPress={() => this.check_nick(item.title)}>
                    <View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap'
                    }}>

                        <Text>
                            {alert('😍😉😊😐😶😩🤙✍👄✊👁🤘🤤😞😟🤩😵😠😠🤩🤩🤩🤩🤩😡😵😪😪👩‍🚒👩‍🚒👩‍💼👲')}


                        </Text>


                    </View>
                </TouchableOpacity>

                <FlatList inverted


                          data={this.state.menuitem}
                          extraData={this.state}


                          renderItem={(({item}) =>


                                  <TouchableOpacity onPress={() => this.check_nick(item.title)}>

                                      <View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap'
                                      }}>

                                          <Text>
                                              {item.title}


                                          </Text>


                                      </View>
                                  </TouchableOpacity>
                          )
                          }


                          keyExtractor={(item, index) => index.toString()}
                          contentContainerStyle={{paddingBottom: 80}}

                />
                <TextInput
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'white',
                        width: '100%'
                    }}

                    placeholder='Введите сообщение...             '
                    keyboardType='default'

                    ref='                          Сообщение...'
                    onChangeText={(text) => this.setState({text})}
                    value={this.state.text}
                    maxLength={80}


                />
            </View>


        );
    }
}




