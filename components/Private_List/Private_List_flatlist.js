import {FlatList, Image,  TouchableOpacity, View} from "react-native";

import React from "react";
import {Text} from "native-base";
import styles from './styles'


export class Private_List_flatlist extends React.Component {


    render() {


        return   <FlatList


            data={this.props.DataSource}
            extraData={this.props}


            renderItem={(({item}) =>


                    <TouchableOpacity
                        onPress={() => this.props.get_chat(item.Chat_id, item.Private_Chatters)}>
                        <View style={{
                            flexDirection: 'row',
                            flex: 1,
                            backgroundColor: '#92b4bb',
                            marginTop: 5,
                            borderRadius: 14
                        }}>

                            <Image source={require('../Image/people_private.png')}
                                   style={styles.imageView}/>


                            <Text style={styles.rooms}>
                                {item.Private_Chatters}


                            </Text>
                            <Text style={styles.time_msg}>

                                {item.last_data}


                            </Text>


                            <Text style={styles.time}>

                                {item.last_msg}


                            </Text>
                            <Image source={require('../Image/private_msg.png')}
                                   style={styles.imageViewmsg}/>


                        </View>
                    </TouchableOpacity>
            )
            }


            keyExtractor={(item, index) => index.toString()}
            // contentContainerStyle={{paddingTop: 10}}


        />
    }
}