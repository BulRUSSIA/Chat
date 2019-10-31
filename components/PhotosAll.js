import {
    FlatList,
    Image, TouchableOpacity,
    View,Text,Dimensions
} from 'react-native';
import React from "react";
const ITEM_WIDTH = Dimensions.get('window').width;

export class PhotosAll extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            itemsCount: 12,
            isFetching: false,
        };
    }
    renderNewItem = () => {
        if (this.state.itemsCount < this.props.photos_list.length) {
            this.setState((prevState) => ({ itemsCount: (prevState.itemsCount + 10) ,isFetching:false}));
        }
    };

    onRefresh =()=> {

        this.setState({ isFetching: true},() => this.renderNewItem());
    };


//SEE HERE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! TIMER HAS BEEN STOPPED,{FLATLIST_PRIVATE} NOT UPDATING
    render() {


        if (this.props.photos_list.length < 1)

           return (
              <Text style={{fontWeight: 'bold',color:'white',fontSize:25,textAlign:'center'}}>

                  Данный пользователь слишком стесняется показать себя!

              </Text>

           ) ;


     else {


            return (
                <View>



                        <View>
                            <FlatList


                                contentContainerStyle={{
                                    justifyContent: 'center',
                                    flexGrow:1


                                }}
                                numColumns={4}

                                refreshing={this.state.isFetching}
                                      onEndReached={this.onRefresh} // handle refresh
                                      onEndReachedThreshold={10} //

                                data={this.props.photos_list.slice(0, this.state.itemsCount)}
                                renderItem={({item}) => {
                                    return (

                                        <TouchableOpacity
                                            onPress={() => this.props.View_full_photo(item.url)}>


                                            <View style={{
                                                flex: 1,
                                                margin: 3,


                                            }}>

                                                <Image source={{uri: item.url}} style={{
                                                    width: (ITEM_WIDTH + 60) / 5, height: 50,


                                                }}/>
                                            </View>
                                        </TouchableOpacity>

                                    );
                                }}
                                keyExtractor={(item) => item.key}


                         />


                        </View>


                </View>


            )

        }
    }
}