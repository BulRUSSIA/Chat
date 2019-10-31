import {FlatList, ImageBackground, Text, TouchableOpacity, View, Dimensions, Alert} from "react-native";
import React from "react";
import request_UNBAN_USER from "../../actions/fetch_unban_user";
import fetch_REQUEST_BANNED_LIST from "../../actions/fetch_banned_list";

const screenHeight = Math.round(Dimensions.get('window').width);

export default class HomeScreen extends React.Component {

    constructor(props) {
        super(props);


        this.state = {
            BannedList: this.props.screenProps.banned_list,


        };


    }


    Unban_window = async (user_id, id_banner, name_admin, id_document, user) => {
        Alert.alert(
            'Разбанить пользователя',
            "Вы уверены,что хотите разбанить пользователя  " + user + "?",
            [

                {
                    text: 'Отмена',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {
                    text: 'OK', onPress: () => this.Unbanned_action(user_id, id_banner, name_admin, id_document)


                },
            ],
            {cancelable: false},
        );
    };

    Unbanned_action = async (user_id, id_banner, name_admin, id_document) => {

        Alert.alert("Пользователь успешно разбанен!", "Вы так добры по отношению к людям :)");

        await request_UNBAN_USER(user_id, id_banner, name_admin, id_document);

        const refresh = await fetch_REQUEST_BANNED_LIST();

        this.setState({BannedList: refresh})


    };

    renderSeparator = () => (
        <View
            style={{
                backgroundColor: 'rgba(1,1,1,0.43)',
                height: 1

            }}
        />
    );

    render() {


        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>

                <ImageBackground source={require('../Image/whatsap.png')


                }

                                 style={{width: '100%', height: '100%'}}
                >
                    <View style={{marginLeft: screenHeight / 6, flex: 2}}>
                        <Text style={{fontWeight: 'bold'}}>Забаненные</Text>
                    </View>
                    <View style={{marginLeft: screenHeight / 1.8, flex: 2, marginBottom: '1%'}}>
                        <Text style={{fontWeight: 'bold', marginBottom: '1%'}}>Баннер</Text>
                    </View>

                    <FlatList style={{marginTop: '5%'}}


                              ItemSeparatorComponent={this.renderSeparator}
                              data={this.state.BannedList}
                              extraData={this.state}


                              renderItem={(({item}) =>

                                      <TouchableOpacity
                                          onPress={() => this.Unban_window(item.user_id, this.props.screenProps.nic, item.admin, item.id_document, item.user)}>
                                          <View style={{
                                              flex: 1, flexDirection: 'row',
                                          }}>

                                              <Text style={{
                                                  fontSize: 21,
                                                  flex: 1,
                                                  color: item.color,

                                                  padding: 1,
                                                  borderRadius: 4,


                                              }}>

                                                  {item.user}

                                              </Text>
                                              <Text style={{
                                                  fontSize: 20,
                                                  flex: 1,
                                                  fontWeight: 'bold',
                                                  color: '#2d657f',
                                                  marginLeft: '10%',


                                                  padding: 1,
                                                  borderRadius: 4,


                                              }}>

                                                  {item.admin}

                                              </Text>


                                          </View>
                                      </TouchableOpacity>
                              )
                              }


                              keyExtractor={(item, index) => index.toString()}

                    />
                </ImageBackground>
            </View>
        );
    }
}