import {
    Body,
    CardItem,
    Text,

} from "native-base";
import {Dimensions, TouchableOpacity, View} from "react-native";
import React from "react";
import FastImage from "react-native-fast-image";
import {OptimizedFlatList} from "react-native-optimized-flatlist";

const {height, width} = Dimensions.get('window');
export default class CardsWedding extends React.Component {


    Wedding_action = () => {

        if (this.props.zags != null) {

            return (
                <TouchableOpacity style={{
                    width: '100%',
                    paddingTop: '2%',
                    paddingBottom: '2%',
                    backgroundColor: 'rgba(255,54,36,0.89)'
                }} onPress={() => this.props.Delete_Zags(this.props.zags)}>
                    <Text style={{
                        textAlign: 'center',
                        color: 'white',
                        flex: 0,
                        backgroundColor: 'rgba(255,53,33,0.89)',
                        fontWeight: 'bold'
                    }}>Вы
                        в браке с
                        пользователем {'\t' + this.props.zagsName} </Text>
                </TouchableOpacity>
            )

        } else if (this.props.zagsRequest != null && this.props.zagsRequest.length > 0) {

            return (<TouchableOpacity style={{
                    width: '100%',
                    paddingTop: '2%',
                    paddingBottom: '2%',
                    backgroundColor: 'rgba(255,1,18,0.88)'
                }} onPress={() => this.props.Accept_Zags_Req(this.props.zagsRequest)}>
                    <Text style={{color: 'white', flex: 0}}>Вам заявка на брак
                        от пользователя <Text
                            style={{fontWeight: 'bold', color: 'white'}}>{'\t' + this.props.zagsRequestName}</Text>
                    </Text>
                </TouchableOpacity>


            )

        } else {

            return (<Text style={{
                color: 'red',
                flex: 0,
                backgroundColor: 'rgba(53,109,154,0.46)',
                width: '100%',
                textAlign: 'center',
                marginTop: '1%',
            }}>Вы не состоите в
                браке </Text>)

        }


    };

    convert_time = (timestamp) => {


        console.log(typeof (timestamp));
        const times = new Date(timestamp);
        let year = times.getFullYear().toString();
        let mounth = times.getMonth().toString();
        let day = times.getDate().toString();


        return year + '-' + mounth + '-' + day


    };


    render() {


        return (


            <CardItem cardBody
                      style={{
                          marginTop: '0.1%',
                          backgroundColor: 'rgba(46,48,68,0)',
                          maxWidth: width,
                          flexDirection: 'column',
                          flex: 1,
                      }}>

                <View
                    style={{height: height / 3.2, width: null, flex: 1}}>

                    <Body style={{alignItems: 'center', backgroundColor: 'rgba(47,96,137,0.4)', flex: 0, width: width}}>
                        <Text style={{color: '#010101', fontWeight: 'bold',}}>Виртуальный ЗАГС</Text>


                    </Body>
                    <Body style={{alignItems: 'center'}}>

                        {this.Wedding_action()}
                        <Text style={{color: '#010101', fontWeight: 'bold', marginTop: 10, fontSize: 20}}>Последнее
                            бракосочетание</Text>
                    </Body>

                    <View style={{flex: 3}}>

                        <OptimizedFlatList contentContainerStyle={{justifyContent: 'center', paddingTop: '2%'}}


                                           data={this.props.wedding_list.slice(0, 1)}
                                           extraData={this.props}


                                           renderItem={(({item}) =>


                                                   <View
                                                       style={{
                                                           alignSelf: 'center',
                                                           marginBottom: '10%',
                                                           marginTop: '10%'
                                                       }}>
                                                       <View style={{flexDirection: 'row'}}>

                                                           <View style={{alignSelf: 'center'}}>


                                                               <FastImage
                                                                   source={{uri: item.photo0}}
                                                                   style={{
                                                                       width: 50,
                                                                       height: 50,

                                                                       borderRadius: 8,
                                                                       alignSelf: 'center',

                                                                   }}>


                                                               </FastImage>


                                                               < TouchableOpacity
                                                                   onPress={() => this.props.Profile_screen(item.users[0], item.username0)}>
                                                                   <Text style={{
                                                                       textAlign: 'center',
                                                                       color: 'black',
                                                                       fontWeight: 'bold',
                                                                       maxWidth: '100%'
                                                                   }}>

                                                                       {item.username0}
                                                                   </Text>
                                                               </TouchableOpacity>
                                                           </View>
                                                           <View style={{
                                                               alignSelf: 'center',
                                                               marginLeft: '7%',
                                                               marginRight: '7%'
                                                           }}>
                                                               <FastImage
                                                                   source={{uri: 'people_private'}}
                                                                   style={{
                                                                       width: 25,
                                                                       height: 25,
                                                                       alignSelf: 'center'

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


                                                           <View style={{alignSelf: 'center'}}>

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
                                                                       color: 'black',
                                                                       fontWeight: 'bold',
                                                                       maxWidth: '100%'

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


                </View>
                <TouchableOpacity onPress={() => this.props.All_Weddings()}>
                    <TouchableOpacity style={{ textAlign: 'center',
                        color: '#FFF',
                        fontWeight: 'bold',
                        fontSize: 18,
                        marginTop:20,
                        marginBottom:20,
                        paddingHorizontal: 10,}} onPress={this.Registration}>
                        <Text style={{textAlign: 'center',
                            color: '#000000',
                            fontSize: 15,
                            marginLeft: '4%',
                            marginRight: '4%',
                            borderWidth: 0.1,
                            paddingHorizontal: 10,
                            backgroundColor: '#ffffff',
                            marginTop: 0.1,
                            borderRadius: 0.5,
                            borderColor: '#010101',
                            paddingTop: 10,
                            paddingBottom: 10,}}>
                            Все браки</Text>
                    </TouchableOpacity>

                </TouchableOpacity>
            </CardItem>


        );
    }
}

//  style={{width: 40, height: 40,}}
//   source={require('../Image/weddingProfile.png')}
