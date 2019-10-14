import {FlatList, Image,  TouchableOpacity, View} from "react-native";
import emoticons from '../const/EmojiObject'

import React from "react";


export class ListSmiles extends React.Component {


    render() {


        return (
            <View>
            <FlatList

                         extraData={this.props}
                         data={emoticons}


                      renderItem={(({item}) =>

                              <TouchableOpacity onPress={() => this.props.action_selected(item)}>
                                  <View style={{flex: 1, flexDirection: 'column', margin: 1}}>

                                      <Image style={{width:22,height:22,resizeMode: 'contain',marginTop:'1%'}} source={item}/>


                                  </View>
                              </TouchableOpacity>
                      )
                      }


                      keyExtractor={(item, index) => index.toString()}



        />
            </View>
        )







    }
}