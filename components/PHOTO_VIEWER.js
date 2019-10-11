import {
    Image,
    View
} from 'react-native';
import React from "react";
import {Body, Button, Header, Icon, Left,Container , Title} from "native-base";

export class PHOTO_VIEWER extends React.Component {



//SEE HERE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! TIMER HAS BEEN STOPPED,{FLATLIST_PRIVATE} NOT UPDATING
    render() {

        const {router}= this.props;





        return   (
        <View >

        <Header style={{backgroundColor: '#25566e'
}}
                          >

            <Left style={{flex: 1}}>
                <Button transparent

                        onPress={()=> {router.pop({
                            room: this.props.room,
                            nic: this.props.nic,
                            chat_name: this.props.chat_name,
                            private_room: this.props.private_room,
                            private_chatter: this.props.private_chatter,
                            private_data: this.props.private_data,



                        })}






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

            <Container style={{flex:1,alignItems:'center',marginTop:'18%'}}>






                <Image source={{uri: this.props.photo_attachments}} style={{width:'100%',height:'1000%',backgroundColor:'#25566e',

                    resizeMode: 'stretch',
                    }}/>


            </Container>


        </View>


        )


    }
}