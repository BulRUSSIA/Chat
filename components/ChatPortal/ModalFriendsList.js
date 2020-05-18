import {Dimensions, FlatList, Modal, ImageBackground,Text, TouchableOpacity, TouchableWithoutFeedback, View} from "react-native";
import React from "react";
import FastImage from "react-native-fast-image";
import {address_photo} from "../../config_connect";
import styles from "../../styles";
import {Badge} from "native-base";

const {height, width} = Dimensions.get('window');
const Winsize = Dimensions.get('window');

export class ModalFriendsList extends React.Component {


    check_photo_avatar = (photo) => {


        if (photo!=null) {
            return (
                <FastImage source={{uri: address_photo + photo}} style={styles.imageAvatarProfile}
                />
            )
        }
        else {
            return (
                <FastImage source={{uri: "image_exist"}} style={styles.imageAvatarProfile}
                />
            )
        }
    };

    check_online = (online)=>{

        if (online) {
            return (

                <Badge primary style={{backgroundColor: '#50d36e', width: 15,height:15}}/>


            )
        } else {
            return (

                <Badge primary style={{backgroundColor: '#c00c17', width: 15,height:15}}/>

            )
        }

    };

    _listEmptyComponent = () => {
        return (
            <View>
                <Text style={{color:'red',textAlign: 'center',fontSize: 15}}>нет друзей</Text>
            </View>
        )

    };
    render() {
        const user_list = this.props.users;
        return (
            <Modal
                transparent={true}
                animationType="fade"
                visible={this.props.isVisibleFriend}
                onRequestClose={this.props.visible_friends_list}

            >


                <TouchableOpacity
                    style={{backgroundColor:'rgba(140,140,140,0.37)',flex:1}}
                    activeOpacity={1}
                    onPressOut={this.props.visible_friends_list}
                >
                    <View style={{alignItems:'center',justifyContent:'center',
                    }}>


                        <TouchableWithoutFeedback>


                            <View style={{backgroundColor:'rgba(255,255,255,0.99)',width:width/1.8,marginTop:height/5,borderRadius:9}}>

                                <Text style={{fontWeight:'bold',textAlign: 'center',marginBottom:10}}>Друзья</Text>

                                <FlatList
                                    data={user_list}
                                    extraData={this.props}
                                    ListEmptyComponent={this._listEmptyComponent}
                                    renderItem={(({item}) =>
                                            <TouchableOpacity  onPress={()=>this.props.friends_action_list(item.nic,item.id)}>

                                                <View style={{
                                                    flexDirection:'row',flex:1
                                                }}>

                                                    {this.check_photo_avatar(item.photo)}

                                                    <View style={{justifyContent:'center'}}>
                                                        <Text style={{
                                                            fontSize: 35 / Winsize.scale,
                                                            color: "#" + ((item.color) >>> 0).toString(16).slice(-6),
                                                            fontWeight: 'bold'
                                                        }}>
                                                            {item.nic}

                                                        </Text>
                                                    </View>
                                                    <View style={{justifyContent:'center',marginLeft: 'auto',marginRight:20}}>
                                                        {this.check_online(item.online)}
                                                    </View>


                                                </View>

                                            </TouchableOpacity>
                                    )
                                    }
                                    keyExtractor={(item, index) => index.toString()}
                                />

                            </View>


                        </TouchableWithoutFeedback>
                    </View>
                </TouchableOpacity>
            </Modal>


        )
    }
}
