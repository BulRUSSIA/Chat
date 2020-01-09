
import React from "react";
import {FlatList} from "react-native";

export class Flatlist_Chatting_Messaging extends React.Component {


    render() {


        return <FlatList inverted={true}

                         extraData={this.props}
                         data={this.props.dataSource}


                         renderItem={this.props.render}


                         keyExtractor={(item) => item.key}


        />








    }
}