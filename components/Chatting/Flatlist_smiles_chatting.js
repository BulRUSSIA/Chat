import {Dimensions, ScrollView,TouchableOpacity, View} from "react-native";
import React from "react";
import emoticons_value from "../const/Flat_Emoji_Value";
import FastImage from "react-native-fast-image";
import {OptimizedFlatList} from "react-native-optimized-flatlist";

const {width,height} = Dimensions.get('window') ;
export class Flatlist_smiles_chatting extends React.Component {


    render() {


        return   <ScrollView contentContainerStyle={[{alignItems:'center',paddingBottom:15}]}>

            <OptimizedFlatList


                numColumns={10}
                data={emoticons_value}


                renderItem={(({item}) =>

                        <TouchableOpacity onPress={() => this.props.screenProps.add_emoji(item.value)}>
                            <View style={{flex:1, flexDirection: 'column', margin: 5}}>

                                <FastImage style={{width: width*0.06, height: height*0.06,}}
                                           source={item.url}
                                           resizeMode={FastImage.resizeMode.contain}

                                />


                            </View>
                        </TouchableOpacity>
                )
                }


                keyExtractor={(item, index) => index.toString()}


            />

        </ScrollView>






    }
}
