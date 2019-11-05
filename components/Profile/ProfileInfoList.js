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
                            marginTop:'1%'


                        }}>

                            <View style={{flex: 1, flexDirection: 'row', backgroundColor:'rgba(10,0,14,0.26)'}}>

                                <Image source={({uri: item.photo})} style={styles.imageAvatarProfile}>
                                </Image>
                                <Text style={{
                                    fontWeight: 'bold',
                                    color:'rgba(179,134,55,0.88)',
                                    fontSize: 20,
                                    marginTop:'6%',
                                    marginLeft:'2%'
                                }}>{item.nic}</Text>
                                <View style={{flex:4,marginLeft:'2%'}}>
                                <TouchableOpacity onPress={()=> {this.props.visible_action()}}>
                                <Image source={require('.././Image/information-icon-6058.png')} style={{width:25,height:25,marginTop:'13%',marginLeft:'4%'}}>

                                </Image>
                                </TouchableOpacity>
                                </View>


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