import {Dimensions, FlatList, Modal, Text, TouchableOpacity, TouchableWithoutFeedback, View} from "react-native";

import React from "react";
import styles from "../../styles";
const {height, width} = Dimensions.get('window');


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


        return (<View style={{backgroundColor:'#676998'}}>
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
                            flex: 0,
                            borderColor:'#494b6c',
                            borderWidth:3,
                            marginLeft:width/2,
                            marginBottom:'1.5%',

                            backgroundColor:'rgb(255,255,255)',
                            flexDirection: 'column',
                            justifyContent: 'center',
                        }}>
                            <View style={{

                                width:200,
                                height:height/1.267}}>

                                    <FlatList
                                        style={{borderRadius: 14,height:40}}

                                     //   ItemSeparatorComponent={this.renderSeparator}
                                        data={this.props.users}
                                        extraData={this.props}


                                        renderItem={(({item}) =>

//   <Text style={styles.all_users}>
//                                           {item.sumuser}
//
//
//                                       </Text>
                                                <TouchableOpacity onPress={() => this.props.action_nick(item.user,item.user_id)}>
                                                    <View style={{
                                                        flex: 1, flexDirection: 'row',
                                                    }}>

                                                        <Text style={{
                                                            fontSize: 18,
                                                            flex: 1,
                                                            color: item.color,
                                                            marginLeft: 0,
                                                            padding: 6,
                                                            borderRadius: 4,
                                                            fontWeight: 'bold'


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
            </View>



        )
    }
}