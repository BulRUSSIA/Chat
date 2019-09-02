import {FlatList, ImageBackground, Text, TouchableOpacity, View} from "react-native";

import React from "react";
import Modal from "react-native-modal";
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


        return <Modal
            useNativeDriver={true}
            coverScreen={true}
            animationIn='slideInUp'
            animationOut='slideOutDown'
            onBackdropPress={this.props.visible}
            style={{
                height: 134,
                width: 170,
                backgroundColor: '#e8f6ff',
                position: 'absolute',
                left: 70,
                top: 200,
                bottom: 0,
                right: 0,
                borderRadius: 4,
                justifyContent: 'center',
            }}
            isVisible={this.props.isVisible}
        >
            <Text style={styles.nick}>
                {this.props.user_now}

            </Text>
            <View>

                <ImageBackground source={require('../Image/action_backgroud.webp')}
                                 style={{width: '100%', height: '100%', borderRadius: 10,}}>

                    <FlatList


                        data={this.props.action_nick}
                        extraData={this.props}


                        ItemSeparatorComponent={this.renderSeparator}
                        renderItem={(({item}) =>

                                <TouchableOpacity onPress={() => this.props.action_selected(item)}>
                                    <View style={{flex: 1, flexDirection: 'column', margin: 1}}>


                                        <View style={{
                                            flex: 1, flexDirection: 'row', flexWrap: 'wrap'
                                        }}>


                                            <Text style={styles.action_profile}
                                            >
                                                {item}


                                            </Text>


                                        </View>


                                    </View>
                                </TouchableOpacity>
                        )
                        }


                        keyExtractor={(item, index) => index.toString()}


                    />
                </ImageBackground>
            </View>


        </Modal>


    }
}