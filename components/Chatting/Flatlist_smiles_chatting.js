import {Dimensions, FlatList, Image, TouchableOpacity, View} from "react-native";
const screenHeight = Math.round(Dimensions.get('window').width);
import React from "react";
import emoticons_value from "../const/Flat_Emoji_Value";


export class Flatlist_smiles_chatting extends React.Component {


    render() {


        return   <View style={{backgroundColor: '#25566e', alignItems: 'center',height:screenHeight-150}}


        >
            <FlatList


                numColumns={10}
                data={emoticons_value}


                renderItem={(({item}) =>

                        <TouchableOpacity onPress={() => this.props.add_emoji(item.value)}>
                            <View style={{flex: 1, flexDirection: 'column', margin: 3}}>

                                <Image style={{width: 30, height: 30, resizeMode: 'contain', marginTop: '1%'}}
                                       source={item.url}/>


                            </View>
                        </TouchableOpacity>
                )
                }


                keyExtractor={(item, index) => index.toString()}


            />
        </View>







    }
}