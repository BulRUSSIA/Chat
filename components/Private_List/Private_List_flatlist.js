import {FlatList, Image, TouchableOpacity, Dimensions,View} from "react-native";
import moment from 'moment';
import React from "react";
import {Text,Badge} from "native-base";
const {width,height} = Dimensions.get('window');
const WinSize = Dimensions.get('window');

export class Private_List_flatlist extends React.Component {

    renderSeparator_1 = () => (
        <View
            style={{

                height: 1,

                width: '100%',
                backgroundColor: '#aaaaaa',


            }}
        />
    );


    UnReadedorRead = (readed,last_msg)=>{

        if (!readed) {
            return (<View style={{flex:1,marginTop:2}}>
                    <Badge>
                    <Text style={{
                        color: '#FFFFFF',
                        fontSize: 30/WinSize.scale,
                      fontWeight:'bold',
                        textAlign: 'center',

                    }}>1</Text>
                    </Badge>
                <Text style={{  fontSize: 30/WinSize.scale,
                flex: 1,
                color: 'rgba(43,87,125,0.98)',
                fontWeight:'bold',
                marginTop: 25,
                textAlign: 'left',}}>

                {last_msg}


            </Text>

                </View>
            )
        }

        return (<Text style={{ fontSize: 14,
            flex: 1,
            color: 'rgba(55,121,169,0.98)',
            marginTop: 25,
            textAlign: 'left',}}>

            {last_msg}


        </Text>)

    };


    render() {


            return <FlatList


                data={this.props.DataSource}
                extraData={this.props}
                ItemSeparatorComponent={this.renderSeparator_1}

                renderItem={(({item}) =>


                        <TouchableOpacity
                            onPress={() => this.props.get_chat(item.room_id, item.private_nick)}>
                            <View style={{
                                flexDirection: 'row',
                                flex: 1,
                                height:152/WinSize.scale,
                                marginTop: 5,

                            }}>

                                <Image source={{uri:'newpm'}}
                                       style={{  width: 125/WinSize.scale,
                                           height: 125/WinSize.scale,
                                           flex:0,
                                           paddingBottom: 1,

                                           borderRadius: 7,}}/>


                                <Text style={{fontSize: 35/WinSize.scale,
                                    flex: 1,
                                    color: 'rgba(1,1,1,0.98)',
                                    marginTop: 2,
                                    fontWeight: 'bold'}}>
                                    {item.private_nick}


                                </Text>


                                    {this.UnReadedorRead(item.readed,item.last_msg)}


                                <Text style={{ fontSize: 20/WinSize.scale,
                                    flex: 1,
                                    color: 'rgba(216,17,34,0.98)',
                                    marginRight: 2,
                                    marginTop: 2}}>

                                    {moment(item.last_time).format('YYYY-MM-DD HH:mm:ss')}


                                </Text>


                            </View>
                        </TouchableOpacity>
                )
                }


                keyExtractor={(item, index) => index.toString()}



            />
        }

}
