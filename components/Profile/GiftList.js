import {FlatList, TouchableOpacity, View, Image, Text} from "react-native";
import React from "react";

export default class GiftList extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            itemsCount: 20,
            isFetching: false,
        };
    }


    renderNewItem = () => {
        if (this.state.itemsCount < this.props.gifts_list.length) {
            this.setState((prevState) => ({itemsCount: (prevState.itemsCount + 1), isFetching: false}));
        }
    };

    onRefresh = () => {

        this.setState({isFetching: true}, () => this.renderNewItem());
    };


    render() {
        if (this.props.gifts_list.length !== 0) {

            return (

                <View style={{backgroundColor: 'rgba(10,0,14,0.26)', marginTop: 5}}>
                    <Text style={{alignSelf: 'center', fontWeight: 'bold', fontSize: 15, color: 'white'}}>
                        Подарки
                    </Text>
                    <FlatList style={{
                        marginLeft: 30,
                        marginRight: 30,
                        marginTop: 13,
                    }}
                              horizontal
                              data={this.props.gifts_list.slice(0, this.state.itemsCount)}
                              onRefresh={() => this.onRefresh}
                              refreshing={this.state.isFetching}
                              renderItem={({item}) => {
                                  return (


                                      <TouchableOpacity
                                          onPress={() => this.props.delete_gift(item.id, item.url, item.description)}>

                                          <Image source={{uri: item.url}} style={{width:40,height:40,marginLeft:4,resizeMode: 'contain'}}/>
                                      </TouchableOpacity>


                                  );
                              }}
                              keyExtractor={(item) => item.id}


                    />
                </View>
            );
        }
        return (
            <View/>
        )
    }
}