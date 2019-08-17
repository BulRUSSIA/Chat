import {FlatList} from "react-native";

import React from "react";


export class Flatlist_Chatting_Messaging extends React.Component {


    render() {


        return <FlatList inverted

                         extraData={this.props}
                         data={this.props.dataSource}


                         renderItem={this.props.render}


                         keyExtractor={(item, index) => index.toString()}


        />
    }
}