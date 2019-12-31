
import React from "react";
import {FlatList} from "react-native";
import {OptimizedFlatList} from "react-native-optimized-flatlist";

export class Flatlist_Chatting_Messaging extends React.Component {


    render() {


        return <FlatList inverted

                         extraData={this.props}
                         data={this.props.dataSource}
                         initialNumToRender={25}

                         renderItem={this.props.render}


                         keyExtractor={(item) => item.key}


        />








    }
}