import {Dimensions, FlatList, Modal, Text, TouchableOpacity, TouchableWithoutFeedback, View} from "react-native";

import React from "react";

import styles from "../../styles";

const {height} = Dimensions.get('window');

export class Modal_Chatting_Action_Flatlist extends React.Component {

    renderSeparator = () => (
        <View
            style={{
                backgroundColor: '#042441',
                height: 1,
                width: 1,


            }}
        />
    );

    render() {


        return (<View style={{backgroundColor: '#010101'}}>
                <Modal

                    transparent={true}
                    visible={this.props.isVisible}
                    onRequestClose={this.props.visible}
                >
                    <TouchableOpacity
                        style={styles.modalbackground}
                        activeOpacity={1}
                        onPressOut={this.props.visible}
                    >

                        <TouchableWithoutFeedback>

                            <View style={{
                                flex: 0,

                                backgroundColor: '#010101',
                                flexDirection: 'column',
                                justifyContent: 'center',
                            }}>
                                <View style={{

                                    width: 200,
                                    height: height / 2.7
                                }}>


                                    <Text style={{
                                        backgroundColor: 'rgba(76,78,113,0.96)',
                                        color: 'white',
                                        fontSize: 18,
                                        textAlign: 'center',
                                        fontWeight: 'bold'
                                    }}>
                                        {this.props.user_now}
                                    </Text>
                                    <FlatList


                                        data={this.props.action_nick}
                                        extraData={this.props}


                                        ItemSeparatorComponent={this.renderSeparator}
                                        renderItem={(({item}) =>

                                                <TouchableOpacity onPress={() => this.props.action_selected(item)}>
                                                    <View style={{flex: 1, flexDirection: 'column',}}>


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
                                    <Text style={{backgroundColor: 'rgba(76,78,113,0.96)', color: 'white'}}>

                                    </Text>

                                </View>
                            </View>

                        </TouchableWithoutFeedback>

                    </TouchableOpacity>
                </Modal>
            </View>


        )

    }
}