import { TouchableOpacity, View, Text} from "react-native";
import React from "react";
import {OptimizedFlatList} from "react-native-optimized-flatlist";
import FastImage from "react-native-fast-image";

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

                <View style={{backgroundColor: 'rgba(53,133,180,0.73)', marginTop: 5}}>
                    <Text style={{alignSelf: 'center', fontWeight: 'bold', fontSize: 15, color: 'black'}}>
                        Подарки
                    </Text>
                    <OptimizedFlatList style={{
                        marginLeft: 30,
                        marginRight: 30,
                        marginTop: 13,
                    }}
                               horizontal
                                       inverted={true}
                              data={this.props.gifts_list.slice(0, this.state.itemsCount)}
                              onRefresh={() => this.onRefresh}
                              refreshing={this.state.isFetching}
                              renderItem={({item}) => {
                                  return (


                                      <TouchableOpacity
                                          onPress={() => this.props.delete_gift(item.id, item.url, item.description)}>

                                          <FastImage source={{uri: item.url}} style={{width:40,height:40,marginLeft:4,resizeMode: 'contain'}}
                                                     resizeMode={FastImage.resizeMode.contain}
                                          />
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