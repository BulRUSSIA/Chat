import {FlatList, Text, View, Image,TouchableOpacity} from "react-native";
import React from "react";
import styles from "../../styles";
import {Modal_information} from "./Modal_information";


export default class ProfileInfoList extends React.Component {




    render() {


        return (
            <FlatList

                data={this.props.user_info}
                extraData={this.props}


                renderItem={(({item}) =>


                        //       <TouchableOpacity onPress={() => this.check_nick(item.user)}>


                        <View style={{

                            marginLeft: 1,
                            marginRight: 1,
                            marginBottom: 5,


                        }}>

                            <View style={{flex: 1, flexDirection: 'row', backgroundColor: 'rgba(33,108,134,0.69)'}}>

                                <Image source={({uri: item.photo})} style={styles.imageAvatarProfile}>
                                </Image>
                                <Text style={{
                                    fontWeight: 'bold',
                                    color: '#010101',
                                    fontSize: 24,
                                    left: '10%',
                                    top: '11%'
                                }}>{item.nic}</Text>
                                <TouchableOpacity onPress={()=> {this.props.visible_action()}}>
                                <Image source={require('.././Image/information.png')} style={{width:30,height:30}}>

                                </Image>
                                </TouchableOpacity>


                            </View>

                            <Modal_information
                                user_info={this.props.user_info}
                                visible={this.props.visible}
                                visible_action={this.props.visible_action}

                            />



                        </View>

                )
                }

                keyExtractor={(item, index) => index.toString()}
            />
        );
    }
}
//<View style={{marginTop: 10}}>
//                                // <Text style={{
//                                     fontWeight: 'bold',
//                                     color:'white',
//
//                                     fontSize: 24,
//                                     alignSelf:'center'
//                                 }}>Информация</Text>
//                            ///     {this.parsedText(item.sex, item.firstName, item.lastName, item.about, item.city, item.bday)}
//                             </View>