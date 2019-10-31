import {
    FlatList,
    Image, TouchableOpacity,ScrollView,
    View,Dimensions
} from 'react-native';
import React from "react";
import {Body, Button, Header, Icon, Left,Container , Title} from "native-base";
const ITEM_WIDTH = Dimensions.get('window').width;

export class PhotosAll extends React.Component {



//SEE HERE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! TIMER HAS BEEN STOPPED,{FLATLIST_PRIVATE} NOT UPDATING
    render() {

        const {router}= this.props;





        return   (
            <View >

                <Header style={{backgroundColor: '#25566e'


                }}
                        androidStatusBarColor="#25566e"
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
                        <Title style={{alignItems:'center'}}>фотоальбом</Title>
                    </Body>



                </Header>

<ScrollView >
<View>
                    <FlatList


                        contentContainerStyle={ {
                        justifyContent: 'center',


                    }}
                             numColumns={4}
                              data={this.props.photos_list}
                              renderItem={({item}) => {
                                  return (

                                      <TouchableOpacity
                                          onPress={() => this.props.View_full_photo(item.url)}>


                                      <View style={{
                                          flex: 1,
                                          margin: 5,





                                      }}>

                                              <Image source={{uri: item.url}} style={{width:(ITEM_WIDTH+40)/5,height:50,resizeMode: 'contain'


                                              }}/>
                                      </View>
                                      </TouchableOpacity>

                                  );
                              }}
                              keyExtractor={(item, index) => index.toString()}


                    />






</View>
</ScrollView>

            </View>


        )


    }
}