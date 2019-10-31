import {FlatList, TouchableOpacity, View, Image,Text} from "react-native";
import React from "react";
import styles from "../../styles";

export default class GiftList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            itemsCount: 15,
            isFetching: false,
        };
    }
    renderNewItem = () => {
        if (this.state.itemsCount < this.props.gifts_list.length) {
            this.setState((prevState) => ({ itemsCount: (prevState.itemsCount + 10) ,isFetching:false}));
        }
    };

    onRefresh =()=> {

        this.setState({ isFetching: true},() => this.renderNewItem());
    };


    render() {
        if (this.props.gifts_list.length!==0) {

            return (

                <View style={{backgroundColor: 'rgba(29,135,123,0.72)', marginTop: 5}}>
                  <Text style={{alignSelf:'center',fontWeight: 'bold',fontSize:15,color:'white'}}>
                      Подарки
                  </Text>
                    <FlatList style={{
                        marginLeft: 30,
                        marginRight: 30,
                        marginTop: 13,
                    }}
                              horizontal
                              data={this.props.gifts_list.slice(0, this.itemsCount)}
                              onRefresh={() => this.onRefresh()}
                              refreshing={this.state.isFetching}
                              renderItem={({item}) => {
                                  return (


                                      <TouchableOpacity
                                          onPress={() => this.props.delete_gift(item.id, item.url, item.description)}>

                                          <Image source={{uri: item.url}} style={styles.imageViewAvatars}/>
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