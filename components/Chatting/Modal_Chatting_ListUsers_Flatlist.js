import {FlatList,Modal, Text, TouchableOpacity, TouchableWithoutFeedback, View} from "react-native";

import React from "react";
import styles from "../../styles";


export class Modal_Chatting_ListUsers_Flatlist extends React.Component {
    renderSeparator = () => (
        <View
            style={{
                backgroundColor: '#9fbed5',
                height: 0.5

            }}
        />
    );
    render() {


        return (
                <Modal



                    transparent={true}

                    visible={this.props.isVisibleList}
                    onRequestClose={this.props.Change_Visible_List}
                >
                    <TouchableOpacity
                        style={styles.modalbackground}
                        activeOpacity={1}
                        onPressOut={this.props.Change_Visible_List}
                    >

                        <TouchableWithoutFeedback>

                            <View style={{
                                flex: 1,
                               marginLeft:'70%',
                                height:140,
                                borderRadius:2,
                                borderWidth:5,
                                borderColor:'#25566e',


                                backgroundColor:'white'

                               }}
                            >
                                <View style={{

                                    width:240,
                                    height:'100%',
                                backgroundColor: 'white'}}>

                                    <FlatList
                                        style={{borderRadius: 14,height:40}}

                                        ItemSeparatorComponent={this.renderSeparator}
                                        data={this.props.users}
                                        extraData={this.props}


                                        renderItem={(({item}) =>

//   <Text style={styles.all_users}>
//                                           {item.sumuser}
//
//
//                                       </Text>
                                                <TouchableOpacity onPress={() => this.props.action_nick(item.user)}>
                                                    <View style={{
                                                        flex: 1, flexDirection: 'row',
                                                    }}>

                                                        <Text style={{
                                                            fontSize: 22,
                                                            flex: 1,
                                                            color: item.color,
                                                            marginLeft: 0,
                                                            padding: 1,
                                                            borderRadius: 4,


                                                        }}>

                                                            {item.user}

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



        )
    }
}