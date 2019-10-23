import {
    FlatList,
    Image, ScrollView,
    View, Dimensions, Text, ImageBackground
} from 'react-native';
import React from "react";
import {Body, Button, CardItem, Header, Icon, Left, Title} from "native-base";
const ITEM_WIDTH = Dimensions.get('window').width;
const ITEM_HEIGHT = Dimensions.get('window').height;

export class ScreenAvatarList extends React.Component {



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

                                            <Image source={{uri: item.url}} style={{width:(ITEM_WIDTH+100)/12,height:40,resizeMode:'contain',alignSelf:'center'}}  />
                                            <Text style={{fontsize:10,color:'rgba(1,1,1,0.58)',alignItems: 'center',textAlign: 'center'}}>
                                                {item.name}

                                            </Text>
                                            <Text style={{textAlign: 'center'}}>
                                                {item.price} руб.

                                            </Text>





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