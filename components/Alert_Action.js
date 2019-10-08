import {

    View
} from 'react-native';
import React from "react";
import AwesomeAlert from "react-native-awesome-alerts";

export class Alert_Action extends React.Component {



//SEE HERE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! TIMER HAS BEEN STOPPED,{FLATLIST_PRIVATE} NOT UPDATING
    render() {



        return   (
                 <View style={{position:'absolute',top:0,bottom:0,left:0,right:0,flex:1}}>

                <AwesomeAlert
                    show={this.props.showAlert}
                    showProgress={false}
                    title="Вам приватное сообщение"
                    message="От хз кого!"
                    closeOnTouchOutside={true}
                    closeOnHardwareBackPress={false}
                    showCancelButton={true}
                    showConfirmButton={true}
                    cancelText="Игнорить"
                    confirmText="Ответить"
                    confirmButtonColor="#17C43E"
                    onCancelPressed={() => {
                        this.props.hideAlert();
                    }}
                    onConfirmPressed={() => {
                        this.props.showPrivate();
                    }}
                />
        </View>




        )


    }
}