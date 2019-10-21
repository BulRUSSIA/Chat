import {FlatList, ImageBackground, Text, TouchableOpacity, View,Dimensions} from "react-native";
import React from "react";
const screenHeight = Math.round(Dimensions.get('window').width);

export default class HomeScreen extends React.Component {


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
                    <View style={{marginLeft:screenHeight/6,flex:2}} >
                    <Text style={{fontWeight:'bold'}}>Забаненные</Text>
                    </View>
                    <View style={{marginLeft:screenHeight/1.8,flex:2,marginBottom:'1%'}}>
                    <Text style={{fontWeight:'bold',marginBottom:'1%'}}>Баннер</Text>
                    </View>

                    <FlatList style={{marginTop:'5%'}}


                        ItemSeparatorComponent={this.renderSeparator}
                        data={this.props.screenProps.banned_list}
                        extraData={this.props}


                        renderItem={(({item}) =>

                                <TouchableOpacity>
                                    <View style={{
                                        flex: 1, flexDirection: 'row',
                                    }}>

                                        <Text style={{
                                            fontSize: 22,
                                            flex: 1,
                                            color: item.color,

                                            padding: 1,
                                            borderRadius: 4,


                                        }}>

                                            {item.user}

                                        </Text>
                                        <Text style={{
                                            fontSize: 20,
                                            flex: 1,
                                            fontWeight:'bold',
                                            color: '#2d657f',
                                            marginLeft:'10%',


                                            padding: 1,
                                            borderRadius: 4,


                                        }}>

                                            {item.admin}

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