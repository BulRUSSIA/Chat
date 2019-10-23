import {FlatList, Text, View, Image} from "react-native";
import React from "react";
import styles from "../../styles";


export default class ProfileInfoList extends React.Component {


    parsedText = (sex, firstName, lastName, about, city,bday,email) => {

        let array = [sex,firstName,lastName,about,city, bday,email];
        return array.map(elem => {
            if (!elem) return null;
            if (elem.length>2)
                return (

                    <Text style={{fontSize: 21,fontWeight: 'bold',color:'white'}}>
                       {elem + '\n'}
                    </Text>


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

                            <View style={{marginLeft: 34,}}>
                                <Image source={({uri: item.photo})} style={styles.imageAvatarProfile}/>

                            </View>

                            <Text style={{textAlign: 'center', fontWeight: 'bold', color: item.color,fontSize:20}}>{item.nic}</Text>

                            {this.parsedText(item.sex,item.firstName, item.lastName, item.about, item.city,item.bday,item.email)}


                        </View>

                )
                }

                keyExtractor={(item, index) => index.toString()}
            />
        );
    }
}