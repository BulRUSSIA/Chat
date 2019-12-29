import {Dimensions, FlatList, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import React from "react";
import {Body, Button, CardItem, Header, Icon, Left, Title} from "native-base";
import FastImage from "react-native-fast-image";
import {OptimizedFlatList} from "react-native-optimized-flatlist";

const {height, width} = Dimensions.get('window');


export default class ScreenWeddings extends React.Component {


    convert_time = (timestamp) => {


        console.log(typeof (timestamp));
        const times = new Date(timestamp);
        let year = times.getFullYear().toString();
        let mounth = times.getMonth().toString();
        let day = times.getDate().toString();


        return year + '-' + mounth + '-' + day
    };

    renderSeparator_1 = () => (
        <View
            style={{

                height: 1,

                width:'100%',
                backgroundColor:'white',
                color:'white',


            }}
        />
    );
    render() {

        const {router} = this.props;


        return (

            <View style={{justifyContent: 'center', backgroundColor: 'rgba(41,84,120,0.95)',}}>

                <Header
                    style={{backgroundColor: '#3c3e5a',}}
                    androidStatusBarColor="#3c3e5a"
                >

                    <Left style={{flex: 1}}>
                        <Button transparent

                                onPress={() => {
                                    router.pop()
                                }


                                }>
                            <Icon
                                style={{color: 'white'}}
                                name="ios-arrow-back"/>
                        </Button>

                    </Left>
                    <Body style={{flex: 2}}>
                        <Title style={{alignItems: 'center'}}>Все бракосочетания</Title>
                    </Body>


                </Header>


                <OptimizedFlatList contentContainerStyle={{ justifyContent: 'center',paddingTop:'2%'}}

                                   ItemSeparatorComponent={this.renderSeparator_1}
                                   data={this.props.wedding_list}
                                   extraData={this.props}


                                   renderItem={(({item}) =>


                                           <View style={{alignSelf:'center',marginBottom:'10%',marginTop:'10%'}}>
                                               <View style={{flexDirection: 'row'}}>

                                                   <View style={{alignSelf:'center'}}>
                                                       <FastImage
                                                           source={{uri: item.photo0}}
                                                           style={{
                                                               width: 50,
                                                               height: 50,

                                                               borderRadius: 8,
                                                               alignSelf: 'center',

                                                           }}>
                                                       </FastImage>
                                                       <TouchableOpacity
                                                           onPress={() => this.props.Profile_screen(item.users[0], item.username0)}>
                                                           <Text style={{
                                                               textAlign: 'center',
                                                               color: 'white',
                                                               fontWeight: 'bold',
                                                               maxWidth:'100%'
                                                           }}>

                                                               {item.username0}
                                                           </Text>
                                                       </TouchableOpacity>
                                                   </View>
                                                       <View style={{alignSelf:'center',marginLeft:'7%',marginRight:'7%'}}>
                                                           <FastImage
                                                               source={{uri: 'weddings_ring'}}
                                                               style={{
                                                                   width: 25,
                                                                   height: 25,
                                                                   alignSelf:'center'

                                                               }}>
                                                           </FastImage>
                                                           <Text style={{
                                                               textAlign: 'center',
                                                               color: '#4ba3e2',
                                                               fontSize: 15,

                                                           }}>

                                                               {this.convert_time(item.date.$date)}
                                                           </Text>
                                                       </View>
                                                       <View style={{alignSelf:'center'}}>
                                                           <FastImage

                                                               source={{uri: item.photo1}}
                                                               style={{
                                                                   width: 50,
                                                                   height: 50,

                                                                   borderRadius: 8,
                                                                   alignSelf: 'center',
                                                               }}>
                                                           </FastImage>
                                                           <TouchableOpacity
                                                               onPress={() => this.props.Profile_screen(item.users[1], item.username1)}>
                                                               <Text style={{
                                                                   textAlign: 'center',
                                                                   color: 'white',
                                                                   fontWeight: 'bold',
                                                                   maxWidth:'100%'

                                                               }}>

                                                                   {item.username1}
                                                               </Text>
                                                           </TouchableOpacity>
                                                       </View>


                                                   </View>

                                               </View>
                                               // </Body>

                                       // </CardItem>


                                   )
                                   }


                                   keyExtractor={(item, index) => index.toString()}


                />



            </View>


        )


    }
}
