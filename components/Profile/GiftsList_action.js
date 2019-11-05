import {
    FlatList,

    Text,

    View,
    Modal, TouchableOpacity, ImageBackground, TouchableWithoutFeedback, Image, Dimensions,

} from "react-native";

import React from "react";

import styles from "../../styles";
const ITEM_WIDTH = Dimensions.get('window').width;


export default class GiftsList_action extends React.Component {






    render() {


        return (<View >
                <Modal

                    transparent={true}
                    visible={this.props.visible_send_gift}
                    onRequestClose={() =>this.props.Event_gift_handler(1)}
                >


                    <TouchableOpacity
                        style={styles.modalbackground_info}
                        activeOpacity={1}
                        onPressOut={()=> this.props.Event_gift_handler(1)}
                    >
                        <TouchableWithoutFeedback>
                            <View style={{
                                flex: 1,
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center'}}>
                                <View style={{

                                    width:ITEM_WIDTH/1.5,
                                    height:'90%'}}>

                                    <ImageBackground source={require('../Image/action_profile_info.jpg')}
                                                     style={{position:'absolute',top:0,bottom:0,left:0,right:0}}>

                                        <FlatList


                                            contentContainerStyle={ {
                                                justifyContent: 'center',


                                            }}
                                            numColumns={4}
                                            data={this.props.avatars_list}
                                            renderItem={({item}) => {
                                                return (


                                                    <View    style={{
                                                        flex: 1,
                                                        margin: 5,

                                                        borderColor:'#010101'



                                                    }}>
                                                        <TouchableOpacity onPress={()=> this.props.BuyGift(item.id,item.price)}>
                                                            <Image source={{uri: item.url}} style={{width:(ITEM_WIDTH+100)/12,height:40,resizeMode:'contain',alignSelf:'center'}}  />

                                                            <Text style={{color:'white',fontSize:10,alignItems: 'center',textAlign: 'center'}}>
                                                                {item.name}

                                                            </Text>
                                                            <Text style={{textAlign: 'center',color:'white'}}>
                                                                {item.price} руб.

                                                            </Text>
                                                        </TouchableOpacity>




                                                    </View>


                                                );
                                            }}
                                            keyExtractor={(item) => item.id}


                                        />

                                    </ImageBackground>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </TouchableOpacity>
                </Modal>
            </View>


        )

    }
}
//render() {
//
//
//     return (<View>
//             <Modal
//
//                 transparent={true}
//                 visible={this.props.isVisible}
//                 onRequestClose={this.props.visible}
//             >
//                 <TouchableOpacity
//                     style={styles.modalbackground}
//                     activeOpacity={1}
//                     onPressOut={this.props.visible}
//                 >
//
//                     <TouchableWithoutFeedback>
//
//                         <View style={{
//                             flex: 1,
//                             flexDirection: 'column',
//                             justifyContent: 'center',
//                             alignItems: 'center'}}>
//                             <View style={{
//
//                                 width:200,
//                                 height:'48%'}}>
//
//                                 <ImageBackground source={require('../Image/action_backgroud.webp')}
//                                                  style={{position:'absolute',top:0,bottom:0,left:0,right:0}}>
//                                     <Text style={styles.nick}>
//                                         {this.props.user_now}
//                                     </Text>
//                                     <FlatList
//
//
//                                         data={this.props.action_nick}
//                                         extraData={this.props}
//
//
//                                         ItemSeparatorComponent={this.renderSeparator}
//                                         renderItem={(({item}) =>
//
//                                                 <TouchableOpacity onPress={() => this.props.action_selected(item)}>
//                                                     <View style={{flex: 1, flexDirection: 'column', margin: 1}}>
//
//
//                                                         <View style={{
//                                                             flex: 1, flexDirection: 'row', flexWrap: 'wrap',
//                                                         }}>
//
//
//                                                             <Text style={styles.action_profile}>
//                                                                 {item}
//                                                             </Text>
//                                                         </View>
//
//
//                                                     </View>
//                                                 </TouchableOpacity>
//                                         )
//                                         }
//
//
//                                         keyExtractor={(item, index) => index.toString()}
//
//                                     />
//                                     <Text style={styles.nick}>
//
//                                     </Text>
//                                 </ImageBackground>
//                             </View>
//                         </View>
//
//                     </TouchableWithoutFeedback>
//
//                 </TouchableOpacity>
//             </Modal>
//         </View>
//
//
//     )
//
// }
// }