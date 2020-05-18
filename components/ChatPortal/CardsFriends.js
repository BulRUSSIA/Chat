import {
    Body,
    CardItem,
    Text,
} from "native-base";
import {Dimensions, TouchableOpacity, View} from "react-native";
import React from "react";
import FastImage from "react-native-fast-image";
const {height,width} = Dimensions.get('window');
export default class CardsFriends extends React.Component {

    render() {
        return (
            <CardItem
                cardBody
                style={{backgroundColor: 'rgba(255,255,255,0)', height: height / 5,marginBottom:height/12}}>
                <Body>
                    <View style={{ width:width,backgroundColor: 'rgba(46,93,133,0.37)'}}>
                        <Text style={{color: '#ff0112', fontWeight: 'bold',textAlign:'center',paddingTop:5,paddingBottom:5,}}>Друзья</Text>
                    </View>
                    <View style={{flexDirection:'column',alignItems:'center',alignSelf:'center',maxWidth:width}}>
                    <FastImage source={{uri: 'people_private'}}
                               style={{height: 40, width: 40}}/>
                        <TouchableOpacity onPress={()=>this.props.visible_friends_list()}>
                    <Text style={{fontWeight: 'bold', fontSize: 25, color: '#3779a9',
}}>
                       Cписок друзей
                    </Text>
                        </TouchableOpacity>
                       <TouchableOpacity onPress={()=>this.props.visible_friends_req_list()}>
                        <Text style={{fontWeight: 'bold', fontSize: 25, color: '#3779a9',marginTop:10}}>
                           Заявки в друзья
                        </Text>
                       </TouchableOpacity>
                    </View>

                </Body>
            </CardItem>
        );
    }
}
