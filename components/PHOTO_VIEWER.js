import {
    Image,
    View
} from 'react-native';
import React from "react";
import {Body, Button, Header, Icon, Left,Container ,Content, Title} from "native-base";

export class PHOTO_VIEWER extends React.Component {



//SEE HERE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! TIMER HAS BEEN STOPPED,{FLATLIST_PRIVATE} NOT UPDATING
    render() {

        const {router}= this.props;





        return   (
        <View style={{backgroundColor:'#010101'}}>

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
                <Title style={{alignItems:'center'}}>Изображение</Title>
            </Body>



        </Header>



            <View style={{backgroundColor:'#010101'}}>



                <Image source={{uri: this.props.photo_attachments}} style={{alignSelf:'center',width:'100%',height:'100%',resizeMode:'contain',


                    }}/>


</View>



        </View>


        )


    }
}