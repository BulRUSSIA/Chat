import {
    FlatList,
    Image, ScrollView,Alert,
    View, Dimensions, Text, ImageBackground,TouchableOpacity
} from 'react-native';
import React from "react";
import {Body, Button, Header, Icon, Left, Title} from "native-base";
import request_BUY_AVATAR from "../../actions/fetch_buy_avatar";
const ITEM_WIDTH = Dimensions.get('window').width;
const ITEM_HEIGHT = Dimensions.get('window').height;

export class ScreenAvatarList extends React.Component {



    BuyAvatar = async (avatar_id,price)=> {
     Alert.alert(
            'Покупка аватарки!',
            "Вы уверены,что хотите купить аватарку за "+ price + " руб. на месяц?",
            [

                {
                    text: 'Отмена',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {text: 'OK', onPress: async () => { await this.Buy_confirm(avatar_id,price)}},
            ],
            {cancelable: false},
        );




    };

    Buy_confirm =async (avatar_id,price)=> {

        const buy = await request_BUY_AVATAR(this.props.user_id,price,avatar_id);

        let response = buy['Accept'];
        console.log(response);

        if (response===true) {

            Alert.alert("Аватар успешно куплен!","Поздравляем с новой аватаркой!")

        }

        else {

            Alert.alert("Недостаточно средств","Пополните баланс!!!")


        }




    };

    render() {

        const {router}= this.props;







        return   (
            <View >

                <Header style={{backgroundColor: '#25566e'
                }}
                >

                    <Left style={{flex: 1}}>
                        <Button transparent

                                onPress={()=> {router.pop()}



                                }>
                            <Icon
                                style={{color: 'white'}}
                                name="ios-arrow-back"/>
                        </Button>

                    </Left>
                    <Body style={{flex:2}}>
                        <Title style={{alignItems:'center'}}>Аватарки</Title>
                    </Body>



                </Header>

<ScrollView >
                    <View style={{height:ITEM_HEIGHT*2.5}}>
                        <ImageBackground source={require('../Image/whatsap.png')}
                                         style={{width: '100%', height: '100%'}}>



                        <FlatList


                            contentContainerStyle={ {
                                justifyContent: 'center',


                            }}
                            numColumns={4}
                            data={this.props.avatars_list}
                            renderItem={({item}) => {
                                return (


                                        <View    style={{
                                            flex: 1,
                                            margin: 5,

                                            borderColor:'#010101'



                                        }}>
                                            <TouchableOpacity onPress={()=> {this.BuyAvatar(item.id,item.price)}}>
                                            <Image source={{uri: item.url}} style={{width:(ITEM_WIDTH+100)/12,height:40,resizeMode:'contain',alignSelf:'center'}}  />

                                            <Text style={{fontsize:10,color:'rgba(1,1,1,0.58)',alignItems: 'center',textAlign: 'center'}}>
                                                {item.name}

                                            </Text>
                                            <Text style={{textAlign: 'center'}}>
                                                {item.price} руб.

                                            </Text>
                                            </TouchableOpacity>




                                        </View>


                                );
                            }}
                            keyExtractor={(item, index) => index.toString()}


                        />




</ImageBackground>

                    </View>
</ScrollView>


            </View>


        )


    }
}