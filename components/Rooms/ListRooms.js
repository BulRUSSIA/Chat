
import {FlatList} from "react-native";
import React from "react";

export default class ListRooms extends React.Component {




    render() {


        return (

            <FlatList


                data={this.props.item_menu}
                extraData={this.props}


                ItemSeparatorComponent={this.props.sep}


                renderItem={this.props._renderItem}


                keyExtractor={(item, index) => index.toString()}
                onRefresh={() => this.props.onRefresh()}
                refreshing={this.props.refreshing}


            />


        );
    }
}