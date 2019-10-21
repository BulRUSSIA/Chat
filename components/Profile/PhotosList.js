import {FlatList, View, Image, TouchableOpacity} from "react-native";
import React from "react";


export default class PhotosList extends React.Component {




    render() {


        return (
            <FlatList style={{
                marginLeft: 30,
                marginRight: 30,
                marginTop: 13,
            }}
                      horizontal
                      data={this.props.photos_list.slice(0, 5)}
                      renderItem={({item}) => {
                          return (


                              <View style={{

                                  marginTop: 1,
                                  marginBottom: 14,
                                  marginLeft: 5,
                                  marginRight: 5,

                              }}>

                                  <TouchableOpacity
                                      onPress={() => this.props.View_full_photo(item.url)}>
                                      <Image source={{uri: item.url}} style={{width:50,height:50,resizeMode: 'cover'}}/>
                                  </TouchableOpacity>


                              </View>

                          );
                      }}
                      keyExtractor={(item, index) => index}


            />
        );
    }
}