import {FlatList, TouchableOpacity, View, Dimensions, Image, Button, ScrollView} from "react-native";
import React from "react";
import styles from "../../styles";

export default class GiftList extends React.Component {




    render() {
        if (this.props.gifts_list.length!==0) {

            return (

                <View style={{backgroundColor: 'rgba(21,135,117,0.45)', marginTop: 2}}>
                    <Button
                        color="#25566e"
                        title=' все подарки'/>
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
                              keyExtractor={(item, index) => index.toString}


                    />
                </View>
            );
        }
        return (
            <View/>
        )
    }
}