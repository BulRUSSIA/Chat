import {Dimensions, FlatList, Modal, Text, TouchableOpacity, TouchableWithoutFeedback, View} from "react-native";


import styles from "../../styles";
import React from "react";
import emoticons_value from "../const/Flat_Emoji_Value";
import FastImage from "react-native-fast-image";
import {OptimizedFlatList} from "react-native-optimized-flatlist";

const {height, width} = Dimensions.get('window');

export class Modal_Chatting_Smiles extends React.Component {


    render() {


        return (<Modal style={{flex: 1}}
                       animationType="fade"
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
                            marginTop: height * 0.35


                        }}>

                            <View style={{

                                width: width / 1.89,
                                height: height / 4.68,
                                backgroundColor: 'rgb(169,169,169)',


                            }}>


                                <OptimizedFlatList


                                    numColumns={5}
                                    data={emoticons_value}
                                    renderItem={(({item}) =>

                                            <TouchableOpacity onPress={() => this.props.add_emoji(item.value)}>
                                                <View style={{
                                                    flex: 1,
                                                    flexDirection: 'column',
                                                    borderWidth: 1,
                                                    borderColor: 'black'
                                                }}>

                                                    <FastImage style={{width: width * 0.1, height: height * 0.05,}}
                                                               source={item.url}
                                                               resizeMode={FastImage.resizeMode.contain}

                                                    />


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
