import {FlatList, Text, View,TouchableOpacity} from "react-native";
import styles from "../../styles";
import React from "react";
import FastImage from "react-native-fast-image";
const list = [{
    action: 'СДЕЛАТЬ ПОДАРОК',
    icon: require('../Image/Shopping-Gift-icon.png'),
    event:1
}, {action: 'ПОДАРИТЬ АВАТАР',  icon: require('../Image/strawberry-128.png'),event:2}, {
    action: 'ПОДАРИТЬ АВТОРИТЕТ',event:3,
    icon: require('../Image/PinClipart.com_death-star-clipart_4889685.webp')

}, {action: 'ВСТУПИТЬ В БРАК',event:4,  icon: require('../Image/wedding-rings-icon-9.webp')}];
export default class ActionsList extends React.Component {

    renderSeparator = () => (
        <View
            style={{
                backgroundColor: '#0D5E96',
                height: 1

            }}
        />
    );

    render() {

        return(
        <FlatList style={{marginBottom: 5, marginTop: 6}}


                  data={list}
                  extraData={this.props}
                  ItemSeparatorComponent={this.renderSeparator}


                  renderItem={(({item}) =>


                          //       <TouchableOpacity onPress={() => this.check_nick(item.user)}>
<TouchableOpacity onPress={()=> this.props.screenProps.Event_gift_handler(item.event)}>
                          <View style={{
                              flex: 1, flexDirection: 'row', paddingTop: 6,marginTop:5,
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