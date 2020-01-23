import {Dimensions, TouchableOpacity, View} from "react-native";
import React from "react";
import stickers_pack_1 from "../const/Stickers";
import FastImage from "react-native-fast-image";
import {OptimizedFlatList} from "react-native-optimized-flatlist";

const {width,height} = Dimensions.get('window');
export class Flatlist_Stickers extends React.Component {


    render() {


        return   <View style={{backgroundColor: '#2f2f2f', alignItems: 'center'}}


        >
            <OptimizedFlatList


                numColumns={10}
                data={stickers_pack_1}


                renderItem={(({item}) =>

                        <TouchableOpacity onPress={() => this.props.screenProps.add_emoji(item.value)}>
                            <View style={{flex: 1, flexDirection: 'column', margin: 1}}>

                                <FastImage style={{width: width*0.1, height: height*0.1, marginTop: '1%'}}
                                           source={{uri:item.url}}
                                           resizeMode={FastImage.resizeMode.contain}

                                />


                            </View>
                        </TouchableOpacity>
                )
                }


                keyExtractor={(item, index) => index.toString()}


            />
        </View>







    }
}