import {FlatList, Image, Text, View} from "react-native";
import styles from "../../styles";
import React from "react";
export default class ActionsList extends React.Component {



    render() {

        return(
        <FlatList style={{marginBottom: 5, marginTop: 6}}


                  data={this.props.profile_info}
                  extraData={this.props}


                  renderItem={(({item}) =>


                          //       <TouchableOpacity onPress={() => this.check_nick(item.user)}>

                          <View style={{
                              flex: 1, flexDirection: 'row', paddingTop: 6,
                              borderRadius: 20,backgroundColor:'rgba(29,93,116,0.72)',marginTop:5,
                          }}>

                              <Image source={item.icon} style={styles.imageViewProfile_icon}/>
                              <Text style={styles.Profile_List_text}
                              >

                                  {item.action}

                              </Text>


                          </View>

                  )
                  }


                  keyExtractor={(item, index) => index.toString()}


        />
        )
    }

}