import {FlatList} from "react-native";

import React from "react";


export class Private_Flatlist extends React.Component {


    render() {


        return <FlatList inverted

                         extraData={this.props}
                         data={this.props.private}


                         renderItem={this.props.render}


                         keyExtractor={(item, index) => index.toString()}


        />
    }
}