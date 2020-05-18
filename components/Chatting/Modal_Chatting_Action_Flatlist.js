import {Dimensions, FlatList, Modal, Text, TouchableOpacity, TouchableWithoutFeedback, View} from "react-native";

import React from "react";

import styles from "../../styles";

const {height, width} = Dimensions.get('window');
const Winsize = Dimensions.get('window');

export class Modal_Chatting_Action_Flatlist extends React.Component {

    renderSeparator = () => (
        <View
            style={{

                backgroundColor: '#010101',
                height: '1%'
            }}
        />
    );

    render() {

        let action_type = this.props.action_nick;


        return (
            <Modal
                transparent={true}
                animationType="fade"
                visible={this.props.isVisible}
                onRequestClose={this.props.visible}

            >


                <TouchableOpacity
                    style={{backgroundColor: 'rgba(22,22,22,0.72)', flex: 1}}
                    activeOpacity={1}
                    onPressOut={this.props.visible}
                >
                    <View style={{
                        alignItems: 'center', justifyContent: 'center',
                    }}>


                        <TouchableWithoutFeedback>


                            <View style={{
                                backgroundColor: 'rgba(255,255,255,0.99)',
                                width: width / 1.5,
                                paddingBottom:10,
                                paddingTop:10,
                                marginTop: height / 3,
                                maxHeight: height / 1.5
                            }}>

                                <Text style={{
                                    color: '#010101',
                                    fontSize: 55 / Winsize.scale,
                                    fontWeight: 'bold',
                                    marginLeft:15,

                                }}>
                                    {this.props.user_now}
                                </Text>
                                <FlatList
                                    data={action_type}
                                    extraData={this.props}
                                    renderItem={(({item}) =>
                                            <TouchableOpacity onPress={() => this.props.action_selected(item)}>
                                                <View style={{flex: 1, flexDirection: 'column',margin:5}}>


                                                    <View style={{
                                                        flex: 1, flexDirection: 'row', flexWrap: 'wrap',
                                                    }}>


                                                        <Text style={styles.action_profile}>
                                                            {item}
                                                        </Text>
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
