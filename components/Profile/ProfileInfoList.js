import {FlatList, Text, View, Dimensions, Image} from "react-native";
import React from "react";
import styles from "../../styles";
const screenHeight = Math.round(Dimensions.get('window').width);

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

                            <View style={{marginLeft: 34,}}>
                                <Image source={({uri: item.photo})} style={styles.imageAvatarProfile}/>

                            </View>


                            <Text style={styles.Profile_List_text_info}>
                                {'\t' + '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t' + item.nic + '\n\n'}
                                {item.sex + '\n'}
                                {item.bday + '\n'}
                                {item.email + '\n'}
                                {item.firstName + '\n'}
                                {item.lastName + '\n'}
                                {item.about + '\n'}
                                {item.city + '\n'}
                            </Text>


                        </View>

                )
                }

                keyExtractor={(item, index) => index}
            />
        );
    }
}