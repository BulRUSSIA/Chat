import {
    Text,
    View,Dimensions

} from "react-native";
import React from "react";
let winSize = Dimensions.get('window');
export class Modal_information extends React.Component {

    get_zags_name = () =>{
        let zags = this.props.zagsName;
        console.log('zags:',zags);

        if ((zags!==null)) {

            return ( <View >
                <Text style={{
                    color: '#010101', fontWeight: '400',
                    fontSize: 40/winSize.scale,
                    fontFamily: 'sans-serif-light'
                }}>БРАК:

                <Text style={{color:this.props.colorzags,fontWeight:'bold',  fontSize: 40/winSize.scale,}}>{zags}</Text>
                </Text>
            </View>)



        }
}


    render() {


        return (<View style={{flex: 1,}}>

                {this.props.user_info.map(function (item) {

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

                                РЕЙТИНГ:
                            </Text>

                            0</Text>
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

                                АНТИРЕЙТИНГ:
                            </Text>

                            0</Text>


                    </View>)
                })}
            {this.get_zags_name()}
            </View>


        )

    }
}
