import {Dimensions, FlatList, Modal, Text, TouchableOpacity, TouchableWithoutFeedback, View} from "react-native";

import React from "react";

import styles from "../../styles";

const {height,width} = Dimensions.get('window');
const Winsize = Dimensions.get('window');
export class Modal_Chatting_Action_Flatlist extends React.Component {

    renderSeparator =  () => (
        <View
            style={{

                backgroundColor: '#010101',
                height:'1%'
            }}
        />
    );

    render() {
        let modal_height =  height / 3.5;
        let action_type = this.props.action_nick;
        if (action_type.length>3){

            modal_height = height/3.8

        }


        return (                <Modal style={{flex:1}}
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
                                marginTop:height*0.3



                            }}>

                                <View style={{

                                    width: width / 1.4,
                                    height: modal_height,
                                    backgroundColor: 'rgb(211,211,211)',
                                    borderWidth:1,
                                    borderColor:'#010101',
                                    paddingTop: '1%',
                                }}>


                                <Text style={{
                                        color: '#010101',
                                        fontSize: 35/Winsize.scale,
                                        textAlign: 'center',
                                        fontWeight: 'bold',

                                    }}>
                                        {this.props.user_now}
                                    </Text>
                                    <View style={{

                                        width: width / 1.41,
                                        height:1,
                                        backgroundColor:'#010101',

                                    }}/>
                                    <FlatList


                                        data={action_type}
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


                                </View>
                            </View>

                        </TouchableWithoutFeedback>

                    </TouchableOpacity>
                </Modal>



        )

    }
}
