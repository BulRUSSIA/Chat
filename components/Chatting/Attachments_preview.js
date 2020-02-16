import {
    Image, TouchableOpacity,
    View
} from 'react-native';
import React from "react";

export class Attachments_preview extends React.Component {



//SEE HERE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! TIMER HAS BEEN STOPPED,{FLATLIST_PRIVATE} NOT UPDATING
    render() {







        return   (
        <View style={{backgroundColor: this.props.color}}>
            <TouchableOpacity onPress={()=>{this.props.close_attach()}}>
                <Image
                    source={require('../Image/android-delete-icon-14.jpg')}
                    style={{width: 20, height: 20,}}/>
            </TouchableOpacity>
            <Image
                source={{uri: this.props.photo.uri}}
                style={{width: 60, height: 60, marginLeft: '5%',marginBottom:30 }}
            />
        </View>


        )


    }
}
