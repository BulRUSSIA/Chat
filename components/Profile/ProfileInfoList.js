import {FlatList, Text, View, Image} from "react-native";
import React from "react";
import styles from "../../styles";


export default class ProfileInfoList extends React.Component {


    parsedText = (sex, firstName, lastName, about, city, bday, ) => {

        let array = [sex, firstName, lastName, about, city, bday];
        return array.map(elem => {
            if (!elem) return null;
            if (elem.length > 3)
                return (
                    <View style={{backgroundColor: 'rgba(33,108,134,0.81)',marginTop:5}}>

                    <Text style={{
                        fontSize: 21, fontWeight: 'bold', color: 'white', marginTop: 5,

                    }}>
                        {elem + '\n'}
                    </Text>
                    </View>


                );


        });


    };

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

                            <View style={{flex: 1, flexDirection: 'row', backgroundColor: 'rgba(21,135,117,0.55)'}}>

                                <Image source={({uri: item.photo})} style={styles.imageAvatarProfile}>
                                </Image>
                                <Text style={{
                                    fontWeight: 'bold',
                                    color: item.color,
                                    fontSize: 24,
                                    left: '10%',
                                    top: '11%'
                                }}>{item.nic}</Text>


                            </View>
                            <View style={{marginTop: 10}}>
                                <Text style={{
                                    fontWeight: 'bold',
                                    color:'white',

                                    fontSize: 24,
                                    alignSelf:'center'
                                }}>Информация</Text>
                                {this.parsedText(item.sex, item.firstName, item.lastName, item.about, item.city, item.bday)}
                            </View>


                        </View>

                )
                }

                keyExtractor={(item, index) => index.toString()}
            />
        );
    }
}