import {Alert, Dimensions,ImageBackground,ActivityIndicator, FlatList, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import React from "react";
import {Body, Button, Header, Left, Title} from "native-base";
import request_BUY_AVATAR from "../../actions/fetch_buy_avatar";
import request_GET_AvatarList from "../../actions/fetch_Avatar_List";
import FastImage from "react-native-fast-image";
import Icon from "react-native-vector-icons/AntDesign";

const ITEM_WIDTH = Dimensions.get('window').width;
const ITEM_HEIGHT = Dimensions.get('window').height;

export class ScreenAvatarList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            avatars_list: [],
            loaded:true

        }

    }


    componentDidMount = async () => {

        const avatars_list = await request_GET_AvatarList();
        this.setState({avatars_list: avatars_list,loaded:false})
    };

    BuyAvatar = async (avatar_id, price) => {
        Alert.alert(
            'Покупка аватарки!',
            "Вы уверены,что хотите купить аватарку на месяц за " + price + " руб?",
            [

                {
                    text: 'Отмена',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {
                    text: 'OK', onPress: async () => {
                        await this.Buy_confirm(avatar_id, price)
                    }
                },
            ],
            {cancelable: false},
        );


    };

    Buy_confirm = async (avatar_id, price) => {

        const buy = await request_BUY_AVATAR(this.props.user_id, price, avatar_id);

        let response = buy['Accept'];
        console.log(response);

        if (response === true) {

            Alert.alert("Аватар успешно куплен!", "Поздравляем с новой аватаркой!");
            this.props.updater()

        } else {

            Alert.alert("Ошибка", "Не хватает средств")


        }


    };

    render() {

        const {navigator} = this.props;
        const loaded = this.state.loaded;

        if (loaded) {
            return (
                <View>
                <Header
                    style={{backgroundColor: 'rgba(212,212,212,0.96)',}}
                    androidStatusBarColor="#A9A9A9">


                    <Left style={{flex: 1}}>
                        <Button transparent

                                onPress={()=>navigator.pop()}>
                            <Icon
                                size={25}
                                style={{color: 'black'}}
                                name="arrowleft"/>
                        </Button>

                    </Left>
                    <Body style={{flex: 2}}>
                        <Title style={{alignItems: 'center',color:'black'}}>Аватарки</Title>
                    </Body>


                </Header>

                    <ActivityIndicator
                        size="large"
                        color="#0000ff"
                    />
                </View>

            )


        }


        return (
            <ScrollView>
                <ImageBackground
                    style={{resizeMode: 'contain',height:'100%',width:'100%'}}
                    source={{uri:'background_airwaychat'}}>
                <View>

                    <Header
                        style={{backgroundColor: 'rgba(212,212,212,0.96)',}}
                        androidStatusBarColor="#A9A9A9">


                        <Left style={{flex: 1}}>
                            <Button transparent

                                    onPress={()=>navigator.pop()}>
                                <Icon
                                    size={25}
                                    style={{color: 'black'}}
                                    name="arrowleft"/>
                            </Button>

                        </Left>
                        <Body style={{flex: 2}}>
                            <Title style={{alignItems: 'center',color:'black'}}>Аватарки</Title>
                        </Body>


                    </Header>


                    <FlatList style={{backgroundColor: 'rgba(60,62,94,0)'}}


                              contentContainerStyle={{
                                  justifyContent: 'center',


                              }}
                              numColumns={4}
                              data={this.state.avatars_list}
                              renderItem={({item}) => {
                                  return (


                                      <View style={{
                                          flex: 1,
                                          margin: 5,

                                          borderColor: '#010101'


                                      }}>
                                          <TouchableOpacity onPress={() => this.BuyAvatar(item.id, item.price)}>
                                              <FastImage source={{uri: item.url}} style={{
                                                  width: (ITEM_WIDTH) / 11,
                                                  height: (ITEM_HEIGHT / 14),
                                                  alignSelf: 'center'
                                              }}
                                                         resizeMode={FastImage.resizeMode.contain}

                                              />

                                              <Text style={{color: 'black', fontSize: 10, textAlign: 'center'}}>
                                                  {item.name}

                                              </Text>
                                              <Text style={{textAlign: 'center', color: 'black'}}>
                                                  {item.price} руб.

                                              </Text>
                                          </TouchableOpacity>


                                      </View>


                                  );
                              }}
                              keyExtractor={(item, index) => index.toString()}


                    />


                </View>
                </ImageBackground>
            </ScrollView>


        )


    }
}
