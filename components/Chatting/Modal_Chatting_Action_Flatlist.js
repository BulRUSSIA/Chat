import {FlatList, ImageBackground, Text, TouchableOpacity, View, Modal,TouchableWithoutFeedback,ScrollView} from "react-native";

import React from "react";

import styles from "../../styles";


export class Modal_Chatting_Action_Flatlist extends React.Component {

    renderSeparator = () => (
        <View
            style={{
                backgroundColor: '#042441',
                height: 0.5

            }}
        />
    );

    render() {


        return (<View>
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
                                        flex: 1,
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        alignItems: 'center'}}>
                                        <View style={{

                                            width:200,
                                           height:'48%'}}>

                                            <ImageBackground source={require('../Image/action_backgroud.webp')}
                                                             style={{position:'absolute',top:0,bottom:0,left:0,right:0}}>
                                                <Text style={styles.nick}>
                                                    {this.props.user_now}
                                                </Text>
                                                <FlatList


                                                    data={this.props.action_nick}
                                                    extraData={this.props}


                                                    ItemSeparatorComponent={this.renderSeparator}
                                                    renderItem={(({item}) =>

                                                            <TouchableOpacity onPress={() => this.props.action_selected(item)}>
                                                                <View style={{flex: 1, flexDirection: 'column', margin: 1}}>


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
                                                <Text style={styles.nick}>

                                                </Text>
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