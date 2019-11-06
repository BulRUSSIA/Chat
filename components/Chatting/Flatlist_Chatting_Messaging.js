
import React from "react";
import {OptimizedFlatList} from "react-native-optimized-flatlist";


export class Flatlist_Chatting_Messaging extends React.Component {


    render() {


        return <OptimizedFlatList inverted

                         extraData={this.props}
                         data={this.props.dataSource}


                         renderItem={this.props.render}


                         keyExtractor={(item) => item.key}


        />








    }
}