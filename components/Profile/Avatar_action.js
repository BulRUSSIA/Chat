import {
    ActivityIndicator,
    Dimensions,
    FlatList,
    Modal,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";

import React from "react";

import styles from "../../styles";
import FastImage from "react-native-fast-image";
import request_GET_AvatarList from "../../actions/fetch_Avatar_List";

const ITEM_WIDTH = Dimensions.get('window').width;
const ITEM_HEIGHT = Dimensions.get('window').height;


export default class Avatar_action extends React.Component {
    constructor(props) {
        super(props);


        this.state = {
            avatars_list: [],
            loaded:true



        };


    }

    Get_Avatar_List = async () => {
        const avatars_list = await request_GET_AvatarList();
        this.setState({avatars_list: avatars_list,loaded:false})
    };

    componentDidMount = async ()=>  {

        await this.Get_Avatar_List()
    };

    render() {
        const loaded = this.state.loaded;
        if (loaded) {
            return (
                <View>
                    <ActivityIndicator
                        size="large"
                        color="#0000ff"
                    />
                </View>
            )
        }

        return (<View>
                <Modal
                    animationType="fade"
                    style={{
                        width: ITEM_WIDTH / 1.1,
                        height: '80%',
                    }}
                    transparent={true}
                    visible={this.props.visible_send_avatar}
                    onRequestClose={() => this.props.Event_gift_handler(2)}
                >
                    <TouchableOpacity
                        style={styles.modalbackground_info}
                        activeOpacity={1}
                        onPressOut={() => this.props.Event_gift_handler(2)}
                    >
                        <TouchableWithoutFeedback>
                            <View style={{
                                flex: 1,
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                                <View style={{
                                    width: ITEM_WIDTH / 1.1,
                                    height: '80%'
                                }}>
                                    <View style={{backgroundColor: '#5c6a6e', flex: 0, flexDirection: 'column',  borderRadius:3,
                                        borderWidth:1,
                                        borderColor:'#010101'}}>
                                        <TouchableOpacity onPress={() => this.props.Event_gift_handler(2)}>
                                            <Text style={{
                                                backgroundColor: '#ffffff',
                                                fontSize: 20,
                                                color: 'black',
                                                fontWeight: 'bold'
                                            }}>
                                                Выберите нужный аватар

                                                <Icon
                                                    size={25}
                                                    style={{color: 'black',paddingTop:10,marginLeft:10,}}
                                                    name="arrowright"/>
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                    <FlatList style={{backgroundColor: '#e5e5e5', borderRadius:3,
                                        borderWidth:1,
                                        borderColor:'#010101'
                                    }}
                                              contentContainerStyle={{
                                                  justifyContent: 'center',
                                              }}
                                              numColumns={4}
                                              data={this.state.avatars_list}
                                              renderItem={({item}) => {
                                                  return (
                                                      <View style={{
                                                          flex: 1,
                                                          margin: 5,
                                                          borderColor: '#010101'
                                                      }}>
                                                          <TouchableOpacity
                                                              onPress={() => this.props.buy_avatar(item.id, item.price)}>
                                                              <FastImage source={{uri: item.url}} style={{
                                                                  width: (ITEM_WIDTH) / 11,
                                                                  height: (ITEM_HEIGHT / 14),
                                                                  alignSelf: 'center'
                                                              }}
                                                                         resizeMode={FastImage.resizeMode.contain}

                                                              />
                                                              <Text style={{
                                                                  color: 'black',
                                                                  fontSize: 10,
                                                                  textAlign: 'center'
                                                              }}>
                                                                  {item.name}
                                                              </Text>
                                                              <Text style={{textAlign: 'center', color: 'black'}}>
                                                                  {item.price} руб.
                                                              </Text>
                                                          </TouchableOpacity>
                                                      </View>


                                                  );
                                              }}
                                              keyExtractor={(item) => item.id}
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
