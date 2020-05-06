import {Dimensions, FlatList, Modal, Text, TouchableOpacity, TouchableWithoutFeedback, View,} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";

import React from "react";

import styles from "../../styles";
import FastImage from "react-native-fast-image";
import {Button} from "native-base";

const ITEM_WIDTH = Dimensions.get('window').width;
const ITEM_HEIGHT = Dimensions.get('window').height;


export default class GiftsList_action extends React.Component {


    render() {


        return (<View>
                <Modal
                    animationType="fade"
                    style={{
                        width: ITEM_WIDTH / 1.1,
                        height: '80%',

                    }}
                    transparent={true}
                    visible={this.props.visible_send_gift}
                    onRequestClose={() => this.props.Event_gift_handler(1)}
                >


                    <TouchableOpacity
                        style={styles.modalbackground_info}
                        activeOpacity={1}
                        onPressOut={() => this.props.Event_gift_handler(1)}
                    >
                        <TouchableWithoutFeedback>
                            <View style={{
                                flex: 1,
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',

                            }}>
                                <View style={{

                                    width: ITEM_WIDTH / 1.1,
                                    height: '80%'
                                }}>


                                    <View style={{backgroundColor: '#5c6a6e', flex: 0, flexDirection: 'column',  borderRadius:3,
                                        borderWidth:1,
                                        borderColor:'#010101'}}>

                                        <TouchableOpacity onPress={() => this.props.Event_gift_handler(1)}>
                                            <Text style={{
                                                backgroundColor: '#ffffff',
                                                fontSize: 20,
                                                color: 'black',
                                                fontWeight: 'bold'
                                            }}>
                                                Выберите нужный подарок

                                                <Icon
                                                    size={25}
                                                    style={{color: 'black',paddingTop:10,marginLeft:10,}}
                                                    name="arrowright"/>

                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                    <FlatList style={{backgroundColor: '#e5e5e5', borderRadius:3,
                                        borderWidth:1,
                                        borderColor:'#010101'
}}


                                              contentContainerStyle={{
                                                  justifyContent: 'center',


                                              }}
                                              numColumns={4}
                                              data={this.props.avatars_list}
                                              renderItem={({item}) => {
                                                  return (


                                                      <View style={{
                                                          flex: 1,
                                                          margin: 5,

                                                          borderColor: '#010101'


                                                      }}>
                                                          <TouchableOpacity
                                                              onPress={() => this.props.BuyGift(item.id, item.price, 'Отправка Подарка!', "Вы уверены,что хотите сделать подарок данному пользователю за ", 0)}>
                                                              <FastImage source={{uri: item.url}} style={{
                                                                  width: (ITEM_WIDTH) / 11,
                                                                  height: (ITEM_HEIGHT / 14),
                                                                  alignSelf: 'center'
                                                              }}
                                                                         resizeMode={FastImage.resizeMode.contain}

                                                              />

                                                              <Text style={{
                                                                  color: 'black',
                                                                  fontSize: 10,
                                                                  textAlign: 'center'
                                                              }}>
                                                                  {item.name}

                                                              </Text>
                                                              <Text style={{textAlign: 'center', color: 'black'}}>
                                                                  {item.price} руб.

                                                              </Text>
                                                          </TouchableOpacity>


                                                      </View>


                                                  );
                                              }}
                                              keyExtractor={(item) => item.id}


                                    />


                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </TouchableOpacity>
                </Modal>
            </View>


        )

    }
}
//FastImage source={require('../Image/delete.png')} style={{width:25,height:25,}}
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
