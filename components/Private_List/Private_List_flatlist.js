import {FlatList, Image,  TouchableOpacity, View} from "react-native";

import React from "react";
import {Text} from "native-base";
import styles from './styles'


export class Private_List_flatlist extends React.Component {


    render() {

        if (this.props.DataSource.length < 1) {

            return (

                <Text style={{fontSize: 24, fontWeight: 'bold', color: 'white', textAlign: 'center'}}>
                    Нет личных сообщений!
                </Text>
            )


        } else {


            return <FlatList


                data={this.props.DataSource}
                extraData={this.props}


                renderItem={(({item}) =>


                        <TouchableOpacity
                            onPress={() => this.props.get_chat(item.Chat_id, item.Private_Chatters)}>
                            <View style={{
                                flexDirection: 'row',
                                flex: 1,
                                backgroundColor: 'rgba(96,120,126,0.87)',
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


                            </View>
                        </TouchableOpacity>
                )
                }


                keyExtractor={(item, index) => index.toString()}
                // contentContainerStyle={{paddingTop: 10}}


            />
        }
    }
}