import {
     Text, TouchableOpacity,
    View
} from "react-native";

import React from "react";
import styles from "../../styles";
import FastImage from "react-native-fast-image";

export class Pattern_message3 extends React.Component {

    choice_type_attach = ()=> {
        let type = this.props.name;

        switch (type) {

            case 0:
               return  this.listening_sound();

            case 1:
              return   this.view_attach();

        }

    };


    view_attach = ()=>{

        return(

        <TouchableOpacity
            style={{
                 flex:1,
                 alignItems: 'center',
            }}
            onPress={() => this.props.view_attach(this.props.attachments)}>
            <FastImage source={{uri: this.props.attachments}} style={styles.imageAttachRoom}/>
        </TouchableOpacity>
        )

    };

    listening_sound = ()=> {

        return(

            <TouchableOpacity
                style={{
                    flex:1,
                    alignItems: 'center',
                    backgroundColor:'#0D5E96',
                    borderRadius:400/2,
                    width:'60%',
                }}
                onPress={() => this.props.listening_sound(this.props.attachments)}>
              <Text style={{fontSize:25,color:'#ffffff',fontWeight:'bold'}}>
                  Аудио файл
              </Text>
            </TouchableOpacity>
        )
    };

    render() {






        return(

            <View style={{flex: 1, flexDirection: 'column',maxWidth:'100%'}}>
                {/*1/!*<FastImage source={{uri: this.props.avatars}} style={{*!/*/}
                {/*/!*    width: this.props.size_av,*!/*/}
                {/*/!*    height: this.props.s ize_av,*!/*/}
                {/*/!*    paddingBottom: 12 ,*!/*/}
                {/*/!*    marginBottom: 5,*!/*/}
                {/*/!*    borderRadius: 7,*!/*/}
                {/*/!*    marginLeft: 0,*!/*/}

                {/*/!*}}*!/*/}
                {/*           resizeMode={FastImage.resizeMode.contain}/>*/}
                <Text style={{color: '#010101',fontSize: this.props.size_msg,fontWeight:'bold'}}

                >
                    {this.props.user}:

                    <Text style={{color: '#010101',fontSize: this.props.size_msg,fontWeight:'bold',


                        marginLeft: 0,
                        padding: 1,
                        paddingBottom: 20,}}
                    >
                        {this.props.message}


                    </Text>

                </Text>

                {this.choice_type_attach()}



            </View>

        )
    }
}