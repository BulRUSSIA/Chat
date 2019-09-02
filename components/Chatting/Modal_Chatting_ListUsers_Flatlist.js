import {FlatList, Text, TouchableOpacity, View} from "react-native";

import React from "react";
import Modal from "react-native-modal";
import styles from "../../styles";


export class Modal_Chatting_ListUsers_Flatlist extends React.Component {

    renderSeparator2 = () => (
        <View
            style={{
                backgroundColor: '#143e6a',
                height: 1,
                paddingTop:4,
                borderRadius: 4,

            }}
        />
    );
    render() {








        return <Modal style={{
            height: 350,
            width: 120,
            position: 'absolute',
            left: 100,
            top: 60,
            right: 0,
            justifyContent: 'center',
            backgroundColor: 'transparent',


        }}
                      coverScreen={true}
                      animationIn='slideInUp'
                      onBackdropPress={this.props.Change_Visible_List}
                      isVisible={this.props.isVisibleList}
                      useNativeDriver={true}
                      animationOut='slideOutDown'


        >


            <FlatList
                      style={{borderRadius: 14}}

                      ItemSeparatorComponent={this.renderSeparator2}
                      data={this.props.users}
                      extraData={this.props}


                      renderItem={(({item}) =>


                              //   <TouchableOpacity onPress={() => this.check_nick(item.user)}>
                              <TouchableOpacity onPress={() => this.props.action_nick(item.user)}>
                                  <View style={{
                                      flex: 1, flexDirection: 'row',
                                  }}>
                                      <Text style={styles.chatter_list}>

                                          {item.user}
                                          <Text style={styles.all_users}>
                                              {item.sumuser}


                                          </Text>
                                      </Text>


                                  </View>
                              </TouchableOpacity>
                      )
                      }


                      keyExtractor={(item, index) => index.toString()}

            />

        </Modal>

    }
}