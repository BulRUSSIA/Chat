import {FlatList, Text, View, TouchableOpacity, Dimensions} from "react-native";
import styles from "../../styles";
import React from "react";
import FastImage from "react-native-fast-image";

const list = [{
    action: 'НАПИСАТЬ ЛИЧНОЕ',

    event: 0
}, {
    action: 'СДЕЛАТЬ ПОДАРОК',
    icon: require('../Image/Shopping-Gift-icon.png'),
    event: 1
}, {action: 'ПОДАРИТЬ АВАТАР', icon: require('../Image/strawberry-128.png'), event: 2}, {
    action: 'ПОДАРИТЬ АВТОРИТЕТ', event: 3,
    icon: require('../Image/PinClipart.com_death-star-clipart_4889685.webp')
}, {action: 'ВСТУПИТЬ В БРАК', event: 4, icon: require('../Image/wedding-rings-icon-9.webp')}];
const {width,height} = Dimensions.get('window');

export default class ActionsList extends React.Component {


    render() {

        return (
            <FlatList style={{marginBottom: 5,position:'absolute',width:width*0.998,top:height/1.4}}


                      data={list}
                      extraData={this.props}


                      renderItem={(({item}) =>


                              //       <TouchableOpacity onPress={() => this.check_nick(item.user)}>
                              <TouchableOpacity onPress={() => this.props.Event_gift_handler(item.event)}>
                                  <View style={{
                                      flex: 1,
                                      flexDirection: 'row',
                                      borderWidth: 1,
                                      borderColor: '#707070',
                                      paddingTop: 6,
                                      backgroundColor: 'white',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      borderRadius: 5,
                                      marginLeft: '1%',
                                      marginRight: '1%'
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
