import {


    Text,

    View,
    Modal, TouchableOpacity, TouchableWithoutFeedback,Dimensions

} from "react-native";

import React from "react";

import styles from "../../styles";
import {OptimizedFlatList} from "react-native-optimized-flatlist";
const {width,height} = Dimensions.get('window');

export class Modal_information extends React.Component {
    parsedText = (sex, firstName, lastName, about, city, bday, ) => {

        let array = [];
        try {
            if (sex.length >= 1) {

                array.push('Пол:' + sex)

            }
        }
        catch (e) {
            array.push('Пол:Неопределен')

        }

        if (firstName.length>=1){
            array.push('Имя:'+ firstName)


        }

        if (lastName.length>=1){

            array.push('Фамилия:'+ lastName)

        }

        if(about.length>=1){

            array.push('Информация о себе:'+ about)


        }

        if(city.length>=1) {


            array.push('Город:'+city)

        }
        try {
            if(bday.length>=1){

                array.push('Дата Рождения:' + bday)


            }

        }

        catch (e) {

            array.push('Дата Рождения:2200');
 console.log(e)
        }





        return array.map((elem,index) => {
            if (!elem) return null;

                return (
                    <View >

                        <Text

                            key={index.toString()}
                            style={{
                            fontSize: 16, color: 'rgba(0,0,0,0.91)', marginTop: 5,

                        }}>
                            {elem + '\n'}
                        </Text>
                    </View>


                );


        });


    };


    render() {


        return (<View style={{flex:1}}>
                <Modal

                    transparent={true}
                    visible={this.props.visible}
                    onRequestClose={this.props.visible_action}
                >
                    <TouchableOpacity
                        style={styles.modalbackground_info}
                        activeOpacity={1}
                        onPressOut={this.props.visible_action}
                    >
                        <TouchableWithoutFeedback>

                            <View style={{
                                backgroundColor:'#ffffff',

                                width:width,
                                height:height/4.5}}>


                    <OptimizedFlatList

                        data={this.props.user_info}
                        extraData={this.props}


                        renderItem={(({item}) =>


                                //       <TouchableOpacity onPress={() => this.check_nick(item.user)}>


                                <View style={{

                                    marginLeft: 2,
                                    marginRight: 1,
                                    marginBottom: 5,
                                    backgroundColor:'#ffffff'


                                }}>



                                    {this.parsedText(item.sex, item.firstName, item.lastName, item.about, item.city, item.bday)}
                                    </View>







                        )
                        }

                        keyExtractor={(item, index) => index.toString()}
                    />


                            </View>

                        </TouchableWithoutFeedback>
                    </TouchableOpacity>
                </Modal>
            </View>


        )

    }
}
//render() {
//
//
//     return (<View>
//             <Modal
//
//                 transparent={true}
//                 visible={this.props.isVisible}
//                 onRequestClose={this.props.visible}
//             >
//                 <TouchableOpacity
//                     style={styles.modalbackground}
//                     activeOpacity={1}
//                     onPressOut={this.props.visible}
//                 >
//
//                     <TouchableWithoutFeedback>
//
//                         <View style={{
//                             flex: 1,
//                             flexDirection: 'column',
//                             justifyContent: 'center',
//                             alignItems: 'center'}}>
//                             <View style={{
//
//                                 width:200,
//                                 height:'48%'}}>
//
//                                 <ImageBackground source={require('../Image/action_backgroud.webp')}
//                                                  style={{position:'absolute',top:0,bottom:0,left:0,right:0}}>
//                                     <Text style={styles.nick}>
//                                         {this.props.user_now}
//                                     </Text>
//                                     <FlatList
//
//
//                                         data={this.props.action_nick}
//                                         extraData={this.props}
//
//
//                                         ItemSeparatorComponent={this.renderSeparator}
//                                         renderItem={(({item}) =>
//
//                                                 <TouchableOpacity onPress={() => this.props.action_selected(item)}>
//                                                     <View style={{flex: 1, flexDirection: 'column', margin: 1}}>
//
//
//                                                         <View style={{
//                                                             flex: 1, flexDirection: 'row', flexWrap: 'wrap',
//                                                         }}>
//
//
//                                                             <Text style={styles.action_profile}>
//                                                                 {item}
//                                                             </Text>
//                                                         </View>
//
//
//                                                     </View>
//                                                 </TouchableOpacity>
//                                         )
//                                         }
//
//
//                                         keyExtractor={(item, index) => index.toString()}
//
//                                     />
//                                     <Text style={styles.nick}>
//
//                                     </Text>
//                                 </ImageBackground>
//                             </View>
//                         </View>
//
//                     </TouchableWithoutFeedback>
//
//                 </TouchableOpacity>
//             </Modal>
//         </View>
//
//
//     )
//
// }
// }