
import React from "react";
import {Text, ToolbarAndroid, View} from "react-native";
import styles from "../../styles";
import profile_redactor from "../const/profile_redactor";

export default class Toolbar_redactor extends React.Component {




    render() {


        return (


            <ToolbarAndroid style={styles.containerToolbar}
                            androidStatusBarColor="#25566e"
                            actions={profile_redactor}
            >


                <View>
                    <Text style={styles.instructions}>Мой профиль </Text>

                </View>


            </ToolbarAndroid>

        );
    }
}