import {FlatList, TouchableOpacity, View, Dimensions, Image} from "react-native";
import React from "react";
import styles from "../../styles";
const screenHeight = Math.round(Dimensions.get('window').width);

export default class GiftList extends React.Component {




    render() {


        return (
            <FlatList style={{
                marginLeft: 30,
                marginRight: 30,
                marginTop: 13,
            }}
                      horizontal
                      data={this.props.gifts_list.slice(0, 10)}
                      renderItem={({item}) => {
                          return (


                              <View style={{

                                  marginTop: 1,
                                  marginBottom: 14,
                                  marginLeft: 5,
                                  marginRight: 5,

                              }}>
                                  <TouchableOpacity
                                      onPress={() => this.props.delete_gift(item.id, item.url, item.description)}>

                                      <Image source={{uri: item.url}} style={styles.imageViewAvatars}/>
                                  </TouchableOpacity>

                              </View>

                          );
                      }}
                      keyExtractor={(item, index) => index}


            />
        );
    }
}