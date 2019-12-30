import Modal from "react-native-modal";
import {Button, Dimensions, Text, TextInput, View, CheckBox, FlatList} from "react-native";
import React from "react";

const {height, width} = Dimensions.get('window');


export default class ModalRoomsActions extends React.Component {


    render() {


        return (


            <Modal
                useNativeDriver={true}

                animationIn='slideInUp'
                animationOut='slideOutDown'
                onBackdropPress={this.props.hideRoomsMenu}

                isVisible={this.props.isVisible}
            >
                <View style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'


                }}>

                    <View style={{
                        width: width / 1.4,
                        height: height / 1.85,
                        backgroundColor: '#ffffff',
                        paddingLeft: '5%',
                        paddingRight: '5%',
                        borderRadius: 4,
                        paddingTop: '5%',
                    }}>

                        <Text style={{
                            color: '#010101',
                            fontSize: 15,
                            marginBottom: 10,
                            fontWeight: 'bold'
                        }}>{this.props.textchange}</Text>
                        <Text style={{color: '#419dd8'}}>Название    </Text>
                        <TextInput

                            underlineColorAndroid="#00bfff"
                            placeholder='Название       '
                            keyboardType='default'
                            onChangeText={(name) => this.props.ChangeNameCreateRooms(name)}
                            value={this.props.name_create}
                            blurOnSubmit={false}


                            maxLength={16}

                        />
                        <Text style={{color: '#010101'}}>Доступ </Text>


                        <FlatList


                            data={this.props.list_checkbox}
                            extraData={this.props}



                            renderItem={(({item}) =>



                                    <View style={{flexDirection: 'row'}}>

                                        <CheckBox
                                            value={this.props.list_checkbox[item.id].checked}
                                            disabled={item.disable_item}
                                            onValueChange={() => this.props.checkThisBox(item.id)}
                                        />

                                        <Text style={{marginTop: 5}}> {item.name}</Text>


                                    </View>
                            )
                            }


                            keyExtractor={(item, index) => index.toString()

                            }


                        />
                        <Button title='Ок' color="#25566e" onPress={()=> this.props.mask_count(this.props.set_change)}/>

                    </View>
                </View>

            </Modal>

        );
    }
}
