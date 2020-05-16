import {
    Body,
    CardItem,
    Container,

    Text,

} from "native-base";
import {View, TouchableOpacity} from "react-native";
import React from "react";
import FastImage from "react-native-fast-image";

export default class CardsService extends React.Component {

    Avatar_action = () => {
        const data = this.props.avatar_request;


        if (data) {
            let sender_nic = data["name_sender"];
            let send_avatar = data["avatar_image"];
            let sender_color = data["sender_color"];
            let avatar_id = data["avatar_id"];
            let sender_id = data["sender_id"];
            return (
                <TouchableOpacity style={{
                    width: '100%',
                    paddingTop: '2%',
                    paddingBottom: '2%',
                    backgroundColor: 'rgba(255,54,36,0.89)'
                }} onPress={() => this.props.avatar_choice(avatar_id, sender_id)}>
                    <Text style={{
                        textAlign: 'center',
                        color: 'white',
                        flex: 0,
                        backgroundColor: 'rgba(255,53,33,0.89)',
                        fontWeight: 'bold'
                    }}>Пользователь <Text
                        style={{color: "#" + ((sender_color) >>> 0).toString(16).slice(-6)}}>{sender_nic}</Text> отправил
                        вам аватар </Text>

                    <FastImage source={{uri: send_avatar}}

                               style={{height: 55, width: 55, alignSelf: 'center'}}/>

                </TouchableOpacity>
            )
        }
    };

    render() {


        return (

            <CardItem cardBody
                      style={{marginTop: '0.1%', backgroundColor: 'rgba(46,48,68,0)'}}>

                <View
                    style={{height: 250, width: null, flex: 1}}>

                    <Body style={{alignItems: 'center', backgroundColor: 'rgba(46,93,133,0.37)'}}>
                        <Text style={{color: '#ff0112', fontWeight: 'bold'}}>Сервисы</Text>


                    </Body>
                    {this.Avatar_action()}

                    <Container style={{backgroundColor: 'rgba(46,48,68,0)', flex: 7}}>

                        <View style={{flex: 1, flexDirection: 'row'}}>
                            <FastImage source={{uri: 'people_private'}}
                                       style={{height: 40, width: 40}}/>
                            <TouchableOpacity onPress={this.props.GetAvatarList}>
                                <Text style={{fontWeight: 'bold', fontSize: 22, color: '#010101'}}>
                                    {'\t'} Купить аватар
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{flex: 1, flexDirection: 'row'}}>
                            <FastImage source={{uri: 'avtoritet'}}

                                       style={{height: 38, width: 38}}/>
                            <Text style={{fontWeight: 'bold', fontSize: 22, color: '#010101'}}>
                                {'\t\t\t'} Купить авторитет
                            </Text>
                        </View>
                        <TouchableOpacity onPress={this.props.select_modal_run_line}>

                            <View style={{flex: 0, flexDirection: 'row'}}>
                                <FastImage source={{uri: 'newpm'}}
                                           style={{height: 40, width: 40}}/>
                                <Text style={{fontWeight: 'bold', fontSize: 22, color: '#010101'}}>
                                    {'\t'} Заказать бегущую строку
                                </Text>
                            </View>
                        </TouchableOpacity>

                    </Container>
                </View>

            </CardItem>


        );
    }
}
