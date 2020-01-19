import {Dimensions, FlatList, Modal, Text, TouchableOpacity, TouchableWithoutFeedback, View} from "react-native";

import React from "react";

import styles from "../../styles";

const {height,width} = Dimensions.get('window');

export class Modal_Chatting_Action_Flatlist extends React.Component {

    renderSeparator =  () => (
        <View
            style={{
                backgroundColor: '#042441',
                height: 1,
                width: 1,


            }}
        />
    );

    render() {


        return (                <Modal style={{flex:1}}

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

                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginTop:height*0.2


                            }}>

                                <View style={{

                                    width: width / 1.2,
                                    height: height / 2.2,
                                    backgroundColor: '#ffffff',
                                    paddingLeft: '5%',
                                    paddingRight: '5%',
                                    borderRadius: 7,
                                    paddingTop: '5%',
                                }}>


                                <Text style={{

                                        color: '#010101',
                                        fontSize: 18,
                                        textAlign: 'center',
                                        fontWeight: 'bold',

                                    }}>
                                        {this.props.user_now}
                                    </Text>
                                    <FlatList


                                        data={this.props.action_nick}
                                        extraData={this.props}


                                        // ItemSeparatorComponent={this.renderSeparator}
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


                                </View>
                            </View>

                        </TouchableWithoutFeedback>

                    </TouchableOpacity>
                </Modal>



        )

    }
}