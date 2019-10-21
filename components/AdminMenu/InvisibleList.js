import {FlatList, ImageBackground, Text, TouchableOpacity, View,Dimensions} from "react-native";
import React from "react";
const screenHeight = Math.round(Dimensions.get('window').width);

export default class InvisibleList extends React.Component {


    renderSeparator = () => (
        <View
            style={{
                backgroundColor: 'rgba(1,1,1,0.43)',
                height: 1

            }}
        />
    );

    render() {


        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>

                <ImageBackground source={require('../Image/whatsap.png')


                }

                                 style={{width: '100%', height: '100%'}}
                >

                    <View style={{marginLeft:screenHeight/2.5,flex:2}} >
                        <Text style={{fontWeight:'bold'}}>Невидимки</Text>
                    </View>
                    <FlatList  style={{marginTop:'4%'}}


                               ItemSeparatorComponent={this.renderSeparator}
                               data={this.props.screenProps.invisible_list}
                               extraData={this.props}


                               renderItem={(({item}) =>

                                       <TouchableOpacity>
                                           <View style={{
                                               flex: 1, flexDirection: 'row',
                                           }}>


                                               <Text style={{
                                                   fontSize: 20,
                                                   flex: 1,
                                                   fontWeight:'bold',
                                                   color: item.color,



                                                   padding: 1,
                                                   borderRadius: 4,


                                               }}>

                                                   {item.nic}

                                               </Text>


                                           </View>
                                       </TouchableOpacity>
                               )
                               }


                               keyExtractor={(item, index) => index.toString()}

                    />
                </ImageBackground>
            </View>
        );
    }
}