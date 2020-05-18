import {
    Text,
    View,Dimensions

} from "react-native";
import React from "react";
let winSize = Dimensions.get('window');
const {width,height} = Dimensions.get('window');

export class Modal_information extends React.Component {

    render() {


        return (<View style={{flex: 1}}>

                {this.props.user_info.map(function (item) {

                    // console.log(item.zags.nic,"nic zafgs");

                    return (<View style={{flexDirection: 'column'}}>

                        <Text style={{
                            color: '#3862c0', fontWeight: '400',
                            fontSize: 40/winSize.scale,
                            fontFamily: 'sans-serif-light',
                        }}>
                            <Text style={{
                                color: '#010101', fontWeight: '400',
                                fontSize: 40/winSize.scale,
                                fontFamily: 'sans-serif-light'
                            }}>
                                ИМЯ:
                            </Text>

                            {item.firstName}

                        </Text>

                        <Text style={{
                            color: '#3862c0', fontWeight: '400',
                            fontSize: 40/winSize.scale,
                            fontFamily: 'sans-serif-light',
                        }}>
                            <Text style={{
                                color: '#010101', fontWeight: '400',
                                fontSize: 40/winSize.scale,
                                fontFamily: 'sans-serif-light'
                            }}>

                                ФАМИЛИЯ:
                            </Text>
                            {item.lastName}</Text>
                        <Text style={{
                            color: '#3862c0', fontWeight: '400',
                            fontSize: 40/winSize.scale,
                            fontFamily: 'sans-serif-light',
                        }}>
                            <Text style={{
                                color: '#010101', fontWeight: '400',
                                fontSize: 40/winSize.scale,
                                fontFamily: 'sans-serif-light'
                            }}>

                                ПОЛ:
                            </Text>

                            {item.sex}</Text>
                        <Text style={{
                            color: '#3862c0', fontWeight: '400',
                            fontSize: 40/winSize.scale,
                            fontFamily: 'sans-serif-light',
                        }}>
                            <Text style={{
                                color: '#010101', fontWeight: '400',
                                fontSize: 40/winSize.scale,
                                fontFamily: 'sans-serif-light'
                            }}>

                                ДЕНЬ РОЖДЕНИЯ:
                            </Text>


                            {item.bday}</Text>
                        <Text style={{
                            color: '#3862c0', fontWeight: '400',
                            fontSize: 40/winSize.scale,
                            fontFamily: 'sans-serif-light',
                        }}>
                            <Text style={{
                                color: '#010101', fontWeight: '400',
                                fontSize: 40/winSize.scale,
                                fontFamily: 'sans-serif-light'
                            }}>

                                ГОРОД:
                            </Text>

                            {item.city}</Text>
                        <Text style={{
                            color: '#3862c0', fontWeight: '400',
                            fontSize: 40/winSize.scale,
                            fontFamily: 'sans-serif-light',
                        }}>
                            <Text style={{
                                color: '#010101', fontWeight: '400',
                                fontSize: 40/winSize.scale,
                                fontFamily: 'sans-serif-light'
                            }}>

                                О СЕБЕ:
                            </Text>
                            {item.about}</Text>

                        {/*<Text style={{*/}
                        {/*    // color: "#"+((item.zags["color"])>>>0).toString(16).slice(-6), fontWeight: '400',*/}
                        {/*    fontSize: 40/winSize.scale,*/}
                        {/*    fontFamily: 'sans-serif-light',*/}
                        {/*}}>*/}
                        {/*    <Text style={{*/}
                        {/*        color: '#010101', fontWeight: '400',*/}
                        {/*        fontSize: 40/winSize.scale,*/}
                        {/*        fontFamily: 'sans-serif-light'*/}
                        {/*    }}>*/}
                        {/*        БРАК:*/}
                        {/*    </Text>*/}
                        {/*    {item.zags}</Text>*/}


                    </View>)
                })}

            </View>


        )

    }
}
