import { Text, ToolbarAndroid, View} from "react-native";
import styles from "../../styles";
import React from "react";
import {Header} from "native-base";

export class Toolbar_Chatting extends React.Component {




    render() {




        return  <ToolbarAndroid style={styles.containerToolbar}
                                androidStatusBarColor="#3c3e5a"
                                onActionSelected={this.props.select}

                                data={this.props.users}
                                actions={this.props.item_menu}>


            <View>
                <Text style={styles.instructions}>{this.props.room} </Text>

            </View>


        </ToolbarAndroid>
    }
}