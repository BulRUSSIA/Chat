import {Alert, Dimensions, FlatList, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import React from "react";
import {Body, Button, Header, Icon, Left, Title} from "native-base";
import request_BUY_AVATAR from "../../actions/fetch_buy_avatar";
import request_GET_AvatarList from "../../actions/fetch_Avatar_List";
import FastImage from "react-native-fast-image";

const ITEM_WIDTH = Dimensions.get('window').width;
const ITEM_HEIGHT = Dimensions.get('window').height;

export class ScreenAvatarList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            avatars_list: [],

        }

    }


    componentDidMount = async () => {

        const avatars_list = await request_GET_AvatarList();
        this.setState({avatars_list: avatars_list})
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

            Alert.alert("Недостаточно средств", "Пополните баланс!!!")


        }


    };

    render() {

        const {router} = this.props;


        return (
            <ScrollView>
                <View>

                    <Header
                        style={{backgroundColor: '#3c3e5a',}}
                        androidStatusBarColor="#3c3e5a"
                    >

                        <Left style={{flex: 1}}>
                            <Button transparent

                                    onPress={() => {
                                        router.pop()
                                    }


                                    }>
                                <Icon
                                    style={{color: 'white'}}
                                    name="ios-arrow-back"/>
                            </Button>

                        </Left>
                        <Body style={{flex: 2}}>
                            <Title style={{alignItems: 'center'}}>Аватарки</Title>
                        </Body>


                    </Header>


                    <FlatList style={{backgroundColor: '#3c3e5e'}}


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

                                              <Text style={{color: 'white', fontSize: 10, textAlign: 'center'}}>
                                                  {item.name}

                                              </Text>
                                              <Text style={{textAlign: 'center', color: 'white'}}>
                                                  {item.price} руб.

                                              </Text>
                                          </TouchableOpacity>


                                      </View>


                                  );
                              }}
                              keyExtractor={(item, index) => index.toString()}


                    />


                </View>

            </ScrollView>


        )


    }
}
