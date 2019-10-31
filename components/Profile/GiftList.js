import {FlatList, TouchableOpacity, View, Dimensions, Image, Button, ScrollView,Text} from "react-native";
import React from "react";
import styles from "../../styles";

export default class GiftList extends React.Component {




    render() {
        if (this.props.gifts_list.length!==0) {

            return (

                <View style={{backgroundColor: 'rgba(29,135,123,0.72)', marginTop: 2}}>
                  <Text style={{alignSelf:'center',fontWeight: 'bold',fontsize:20,color:'white'}}>
                      Подарки
                  </Text>
                    <FlatList style={{
                        marginLeft: 30,
                        marginRight: 30,
                        marginTop: 13,
                    }}
                              horizontal
                              data={this.props.gifts_list.slice(0, 15)}
                              renderItem={({item}) => {
                                  return (


                                      <TouchableOpacity
                                          onPress={() => this.props.delete_gift(item.id, item.url, item.description)}>

                                          <Image source={{uri: item.url}} style={styles.imageViewAvatars}/>
                                      </TouchableOpacity>


                                  );
                              }}
                              keyExtractor={(item, index) => index.toString()}


                    />
                </View>
            );
        }
        return (
            <View/>
        )
    }
}