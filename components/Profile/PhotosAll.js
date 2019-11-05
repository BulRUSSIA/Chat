import {

    Image, TouchableOpacity
    ,Text,Dimensions,Alert
} from 'react-native';
import React from "react";
import {OptimizedFlatList} from 'react-native-optimized-flatlist'
const ITEM_WIDTH = Dimensions.get('window').width;

export class PhotosAll extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            itemsCount: 12,
            isFetching: false,
            end:0

        };


    }
    renderNewItem = () => {
        if (this.state.itemsCount < this.props.screenProps.photos_list.length) {
            this.setState((prevState) => ({ itemsCount: (prevState.itemsCount + 12) ,isFetching:false}));
        }


    };

    onRefresh =()=> {

        this.setState({ isFetching: true},() => this.renderNewItem());
    };


//SEE HERE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! TIMER HAS BEEN STOPPED,{FLATLIST_PRIVATE} NOT UPDATING
    render() {


        if (this.props.screenProps.photos_list.length < 1)

           return (
              <Text style={{fontWeight: 'bold',color:'white',fontSize:25,textAlign:'center'}}>

                  Данный пользователь слишком стесняется пAоказать себя!

              </Text>

           ) ;


     else {


            return (





                            <OptimizedFlatList



                                numColumns={3}


                                    //  onRefresh={this.onRefresh}
                            //    refreshing={this.state.isFetching}// handle refresh

                                updateCellsBatchingPeriod={100}
                                removeClippedSubviews={true}
                                onEndReached={this.onRefresh}
                                onEndReachedThreshold={1}





                                data={ this.props.screenProps.photos_list.slice(0, this.state.itemsCount)}
                                renderItem={({item}) => {
                                    return (

                                        <TouchableOpacity style={{aspectRatio:1,flex:1/3,flexDirection:'row'}}
                                            onPress={() => this.props.screenProps.View_full_photo(item.url)}>



                                                <Image source={{uri: item.url}} style={{flex:1,width:(ITEM_WIDTH)/1,height:120,borderRadius:0,borderWidth:3,borderColor:'#717584',



                                                }}/>

                                        </TouchableOpacity>

                                    );
                                }}
                                keyExtractor={(item) => item.key}


                         />








            )

        }
    }
}