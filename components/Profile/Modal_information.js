import {
    Text,
    View, Dimensions

} from "react-native";
import React from "react";

let winSize = Dimensions.get('window');

export class Modal_information extends React.Component {

    render() {
        return (
            <View>
                {this.props.user_info.map((item) => {
                    if ((item.zags !== null)) {
                        return (<View>
                            <Text style={{
                                color: '#010101', fontWeight: '400',
                                fontSize: 40 / winSize.scale,
                                fontFamily: 'sans-serif-light'
                            }}>БРАК:
                                <Text style={{
                                    color: this.props.colorzags,
                                    fontWeight: 'bold',
                                    fontSize: 40 / winSize.scale,
                                }}>{item.zags}</Text>
                            </Text>
                        </View>)
                    }
                    else if (item.firstName !== null) {
                        return (<Text style={{
                            color: '#3862c0', fontWeight: '400',
                            fontSize: 40 / winSize.scale,
                            fontFamily: 'sans-serif-light',
                        }}>
                            <Text style={{
                                color: '#010101', fontWeight: '400',
                                fontSize: 40 / winSize.scale,
                                fontFamily: 'sans-serif-light'
                            }}>
                                ИМЯ:
                            </Text>
                            {item.firstName}

                        </Text>)
                    }
                    else if ((item.lastName !== null)) {
                        return (<Text style={{
                            color: '#3862c0', fontWeight: '400',
                            fontSize: 40 / winSize.scale,
                            fontFamily: 'sans-serif-light',
                        }}>
                            <Text style={{
                                color: '#010101', fontWeight: '400',
                                fontSize: 40 / winSize.scale,
                                fontFamily: 'sans-serif-light'
                            }}>
                                ФАМИЛИЯ:
                            </Text>
                            {item.lastName}</Text>)
                    }
                    else if (item.sex !== null) {
                        return (<Text style={{
                            color: '#3862c0', fontWeight: '400',
                            fontSize: 40 / winSize.scale,
                            fontFamily: 'sans-serif-light',
                        }}>
                            <Text style={{
                                color: '#010101', fontWeight: '400',
                                fontSize: 40 / winSize.scale,
                                fontFamily: 'sans-serif-light'
                            }}>
                                ПОЛ:
                            </Text>
                            {item.sex}</Text>)
                    }
                    else if ((item.bday !== null)) {
                        return (<Text style={{
                            color: '#3862c0', fontWeight: '400',
                            fontSize: 40 / winSize.scale,
                            fontFamily: 'sans-serif-light',
                        }}>
                            <Text style={{
                                color: '#010101', fontWeight: '400',
                                fontSize: 40 / winSize.scale,
                                fontFamily: 'sans-serif-light'
                            }}>
                                ДЕНЬ РОЖДЕНИЯ:
                            </Text>
                            {item.bday}</Text>)
                    }
                    else if (item.city !== null) {
                        return (
                            <Text style={{
                                color: '#3862c0', fontWeight: '400',
                                fontSize: 40 / winSize.scale,
                                fontFamily: 'sans-serif-light',
                            }}>
                                <Text style={{
                                    color: '#010101', fontWeight: '400',
                                    fontSize: 40 / winSize.scale,
                                    fontFamily: 'sans-serif-light'
                                }}>
                                    ГОРОД:
                                </Text>
                                {item.city}</Text>)
                    }

                    else if (item.about !== null) {
                        return (
                            <Text style={{
                                color: '#3862c0', fontWeight: '400',
                                fontSize: 40 / winSize.scale,
                                fontFamily: 'sans-serif-light',
                            }}>
                                <Text style={{
                                    color: '#010101', fontWeight: '400',
                                    fontSize: 40 / winSize.scale,
                                    fontFamily: 'sans-serif-light'
                                }}>

                                    О СЕБЕ:
                                </Text>
                                {item.about}
                            </Text>)

                    }
                })


                }
            </View>
        )
    }
}
