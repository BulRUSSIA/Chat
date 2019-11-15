import {
    Dimensions,
    Image,
    View
} from 'react-native';
import React from "react";
import {Body, Button, Header, Icon, Left, Title} from "native-base";
const ITEM_WIDTH = Dimensions.get('window').width;
const ITEM_HEIGHT = Dimensions.get('window').height;

export class PHOTO_VIEWER extends React.Component {



//SEE HERE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! TIMER HAS BEEN STOPPED,{FLATLIST_PRIVATE} NOT UPDATING
    render() {

        const {router}= this.props;





        return   (
        <View style={{backgroundColor:'rgba(0,0,0,0.98)',height:ITEM_HEIGHT}}>

        <Header style={{backgroundColor: '#3c3e5a',}}
                androidStatusBarColor="#3c3e5a"
                          >

            <Left style={{flex: 1}}>
                <Button transparent

                        onPress={()=> {router.pop({type:'right-top',duration: 400, easing: 'ease-in-out' })}


                        }>
                    <Icon
                        style={{color: 'white'}}
                        name="ios-arrow-back"/>
                </Button>

            </Left>
            <Body style={{flex:2}}>
                <Title style={{alignItems:'center'}}>Изображение</Title>
            </Body>



        </Header>







                <Image source={{uri: this.props.photo_attachments}} style={{alignSelf:'center',width:ITEM_WIDTH/1.5,height:ITEM_HEIGHT/1.5,resizeMode:'contain',marginTop:ITEM_HEIGHT/10


                    }}/>






        </View>


        )


    }
}