
import React from "react";
import {Dimensions, Image, ImageBackground, Text, TextInput, TouchableOpacity, View} from "react-native";
import styles from "../../styles";
const {height, width} = Dimensions.get('window');

export default class ChangeColor extends React.Component {




    render() {


        return (


            <View style={{flex:1,flexDirection:'row'}}>
                <Image source={{uri: this.props.photo}}
                       style={styles.imageAvatarProfileEdit}/>

                <TextInput style={{borderRadius:13,borderColor:'#f61800',borderWidth:1,marginTop:10,width:width/1.8,height:height/15}}




                       value={this.props.chat_name}



                />
                <TouchableOpacity style={{
                    backgroundColor: this.props.clr,

                    height: 45,
                    width: 45,
                    marginTop:'2%',
                    marginLeft:'4%',



                    borderRadius: 400/2,


                }}

                                  onPress={this.props.Change_color}


                />
            </View>

        );
    }
}