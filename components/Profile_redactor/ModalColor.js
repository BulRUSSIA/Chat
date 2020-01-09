import Modal from "react-native-modal";
import {Dimensions, FlatList, Text, TouchableOpacity, View} from "react-native";
import styles from "../../styles";
import colors from "../const/colors";
import React from "react";
const {height, width} = Dimensions.get('window');

export default class ModalColor extends React.Component {


    render() {


        return (
            <Modal
                useNativeDriver={true}

                animationIn='slideInUp'
                animationOut='slideOutDown'
                onBackdropPress={this.props.hideColorModalMenu}

                isVisible={this.props.isVisibleColor}
            >
                <View style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'


                }}>

                    <View style={{
                        width: width / 1.4,
                        height: height / 1.85,
                        backgroundColor: '#ffffff',
                        paddingLeft: '5%',
                        paddingRight: '5%',
                        borderRadius: 4,
                        paddingTop: '5%',
                    }}>

                        <FlatList inverted


                                  data={this.props.sm}
                                  extraData={this.props}


                                  renderItem={(({item, index}) =>


                                          //       <Touchabl-eOpacity onPress={() => this.check_nick(item.user)}>

                                          <View style={{
                                              flex: 1,
                                              flexDirection: 'column',
                                              margin: 1,
                                              bottom: 0,
                                              top: 0,
                                              right: 0,
                                              left: 0
                                          }}>


                                              <TouchableOpacity
                                                  onPress={(event) => this.props.close_color(item.clr, item.rclr)}>

                                                  <Text
                                                      style={[styles.prices1, {backgroundColor: colors[index % colors.length]}]}
                                                      onChangeText={(color) => this.setState({color})}
                                                      value={item.clr}

                                                  >


                                                  </Text>


                                              </TouchableOpacity>

                                          </View>

                                      //
                                  )
                                  }

                                  numColumns={1}
                                  keyExtractor={(item, index) => index.toString()}


                        />


                    </View>


                </View>
            </Modal>)

    }
}