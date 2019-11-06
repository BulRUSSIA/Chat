import {FlatList, Text, View,TouchableOpacity} from "react-native";
import styles from "../../styles";
import React from "react";
import FastImage from "react-native-fast-image";
const list = [{
    action: 'Сделать подарок',
    icon: require('../Image/Shopping-Gift-icon.png'),
    event:1
}, {action: 'Подарить аватар',  icon: require('../Image/strawberry-128.png'),event:2}, {
    action: 'Подарить авторитет',event:3,
    icon: require('../Image/PinClipart.com_death-star-clipart_4889685.webp')

}, {action: 'Вступить в брак',event:4,  icon: require('../Image/wedding-rings-icon-9.webp')}];
export default class ActionsList extends React.Component {



    render() {

        return(
        <FlatList style={{marginBottom: 5, marginTop: 6}}


                  data={list}
                  extraData={this.props}


                  renderItem={(({item}) =>


                          //       <TouchableOpacity onPress={() => this.check_nick(item.user)}>
<TouchableOpacity onPress={()=> this.props.screenProps.Event_gift_handler(item.event)}>
                          <View style={{
                              flex: 1, flexDirection: 'row', paddingTop: 6,backgroundColor:'rgba(77,84,103,0.91)',marginTop:5,
                          }}>

                              <FastImage source={item.icon} style={styles.imageViewProfile_icon}
                                         resizeMode={FastImage.resizeMode.contain}/>
                              <Text style={styles.Profile_List_text}
                              >

                                  {item.action}

                              </Text>


                          </View>
</TouchableOpacity>


    )
                  }


                  keyExtractor={(item, index) => index.toString()}


        />
        )
    }

}