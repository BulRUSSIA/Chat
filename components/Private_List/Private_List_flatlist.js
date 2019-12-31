import {FlatList, Image,  TouchableOpacity, View} from "react-native";

import React from "react";
import {Text} from "native-base";
import styles from './styles'
import FastImage from "react-native-fast-image";


export class Private_List_flatlist extends React.Component {

    renderSeparator_1 = () => (
        <View
            style={{

                height: 1,

                width: '100%',
                backgroundColor: '#aaaaaa',


            }}
        />
    );
    render() {

        if (this.props.DataSource.length < 1) {

            return (

                <FastImage source={{uri: 'image_exist'}} style={{width:60,height:60,alignSelf:'center',marginTop:100



                }}/>

            )


        } else {


            return <FlatList


                data={this.props.DataSource}
                extraData={this.props}
                ItemSeparatorComponent={this.renderSeparator_1}

                renderItem={(({item}) =>


                        <TouchableOpacity
                            onPress={() => this.props.get_chat(item.Chat_id, item.Private_Chatters)}>
                            <View style={{
                                flexDirection: 'row',
                                flex: 1,
                                backgroundColor: 'rgba(76,78,113,0)',
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



            />
        }
    }
}