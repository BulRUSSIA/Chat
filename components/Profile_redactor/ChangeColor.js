
import React from "react";
import {Image, ImageBackground, Text, ToolbarAndroid, TouchableOpacity, View} from "react-native";
import styles from "../../styles";
import profile_redactor from "../const/profile_redactor";

export default class ChangeColor extends React.Component {




    render() {


        return (


            <View style={{marginLeft: 20,}}>
                <Image source={{uri: this.props.photo}}
                       style={styles.imageAvatarProfileEdit}/>

                <Text style={{marginTop:30,marginLeft:70,position:'absolute',fontSize:25,}}>{this.props.chat_name}</Text>
                <TouchableOpacity style={{
                    backgroundColor: this.props.clr,

                    height: 40,
                    width: 40,

                    position: 'absolute',
                    marginLeft: 280,
                    marginBottom: 20,
                    paddingHorizontal: 10,
                    borderRadius: 14,
                    marginTop: 25,

                }}

                                  onPress={this.props.Change_color}


                />
            </View>

        );
    }
}