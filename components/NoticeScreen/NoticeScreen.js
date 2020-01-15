import {
    Dimensions, ImageBackground,
    Text,
    View
} from 'react-native';
import React from "react";
import CountDown from "react-native-countdown-component";
const ITEM_WIDTH = Dimensions.get('window').width;
const ITEM_HEIGHT = Dimensions.get('window').height;

export default class NoticeScreen extends React.Component {





    render() {







        return   (
            <View style={{backgroundColor:'rgba(246,211,91,0.78)'}}>
                <ImageBackground
                    style={{resizeMode: 'contain', height: '100%', width: '100%'}}
                    source={{uri: 'default_background'}}>

                <Text style={{textAlign: 'center',fontSize:18,fontWeight:'bold'}}>
Вам вынесено предупреждение


                </Text>

                <Text style={{textAlign: 'center',fontSize:15,marginTop:ITEM_HEIGHT/6,backgroundColor:'rgba(17,149,233,0.43)'}} >
                   {this.props.notice_text}


                </Text>


                <CountDown style={{marginTop:ITEM_HEIGHT/5}}
                    size={30}
                    until={10}
                    onFinish={() => this.props.go_room()}
                    digitStyle={{backgroundColor: '#FFF', borderWidth: 2, borderColor: '#1195e9'}}
                    digitTxtStyle={{color: '#c60915'}}
                    timeLabelStyle={{color: 'red', fontWeight: 'bold'}}
                    separatorStyle={{color: '#1195e9'}}
                    timeToShow={['S']}
                    timeLabels={{m: null, s: null}}
                    showSeparator
                />


</ImageBackground>
            </View>


        )


    }
}