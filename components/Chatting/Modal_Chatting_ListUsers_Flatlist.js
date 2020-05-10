import {Dimensions, FlatList, Modal, Text, TouchableOpacity, TouchableWithoutFeedback, View} from "react-native";
import React from "react";

const {height, width} = Dimensions.get('window');
const Winsize = Dimensions.get('window');

export class Modal_Chatting_ListUsers_Flatlist extends React.Component {

    render() {
        const user_list = this.props.users;
        return (<View style={{backgroundColor: '#242424'}}>
                <Modal

                    transparent={true}
                    animationType="fade"
                    visible={this.props.isVisibleList}
                    onRequestClose={this.props.Change_Visible_List}
                >
                    <TouchableOpacity
                        style={{flex: 2, backgroundColor: 'rgba(8,31,32,0)', height: height * 0.7}}
                        activeOpacity={1}
                        onPressOut={this.props.Change_Visible_List}
                    >
                        <TouchableWithoutFeedback>
                            <View style={{
                                borderColor: '#ffffff',
                                borderWidth: 3,
                                marginLeft: width / 2,
                                height: height * 0.7955,
                                marginTop: height * 0.083,
                                backgroundColor: 'rgb(255,255,255)',
                                flexDirection: 'column',
                            }}
                            >
                                <View style={{
                                    width: width * 0.5,
                                    height: height * 0.7955,
                                }}>
                                    <FlatList
                                        style={{borderRadius: 14, height: 40}}
                                        data={user_list}
                                        extraData={this.props}
                                        renderItem={(({item}) =>
                                                <TouchableOpacity
                                                    onPress={() => this.props.action_nick(item.nic, item.id)}>
                                                    <View style={{
                                                        flex: 1, flexDirection: 'row',
                                                    }}>
                                                        <Text style={{
                                                            fontSize: 35 / Winsize.scale,
                                                            flex: 1,
                                                            color: "#"+((item.color)>>>0).toString(16).slice(-6),
                                                            marginLeft: 0,
                                                            padding: 6,
                                                            borderRadius: 4,
                                                            fontWeight: 'bold'
                                                        }}>
                                                            {item.nic}
                                                        </Text>
                                                    </View>
                                                </TouchableOpacity>
                                        )
                                        }
                                        keyExtractor={(item, index) => index.toString()}
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
