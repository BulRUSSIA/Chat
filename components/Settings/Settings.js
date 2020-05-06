import {
    AsyncStorage,

    Text,
    StyleSheet,
    TouchableWithoutFeedback,
    View,ScrollView,
    TouchableOpacity,
    ImageBackground,

} from "react-native";
import React from "react";
import Slider from '@react-native-community/slider';
import {OptimizedFlatList} from "react-native-optimized-flatlist";
import FastImage from "react-native-fast-image";
import {Header} from "native-base";

const background_fon = [{

    id: 0,
    url: 'background_1'
},
    {
        id: 1,
        url: 'background_airwaychat'
    },
    {
        id: 2,
        url: 'mochat_background'
    },

    {id: 3, url: 'background_4'},
    {id: 4, url: 'background_5'},
    {id: 5, url: 'background_6'},
    {id: 6, url: 'default_background'},
    {id: 7, url: 'back_7'},
    {id: 8, url: 'back_8'},
    {id: 9, url: 'back9'},


];
export default class Settings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            size_message: 18,
            size_avatar: 30,
            size_message_chatter_list: 14,
            size_rooms:16,
            selectedIds: background_fon,
            choice_background: 'default_background'


        };


    }


    componentDidMount = async () => {

        const background_image = await AsyncStorage.getItem('background_fon');
        const size_msg = await AsyncStorage.getItem('size_message');
        const size_av = await AsyncStorage.getItem('size_avatar');
        const size_rooms = await AsyncStorage.getItem('size_rooms');
        this.setState({
            size_message: Number(size_msg),
            size_avatar: Number(size_av),
            choice_background: background_image


        })

    };


    _storeData = async () => {
        try {

            await AsyncStorage.setItem('size_message', (this.state.size_message.toString()));
            console.log('message size:' + this.state.size_message.toString());
            await AsyncStorage.setItem('size_rooms', (this.state.size_rooms.toString()));
            await AsyncStorage.setItem('size_avatar', (this.state.size_avatar.toString()));
            await AsyncStorage.setItem('background_fon', (this.state.choice_background));
            const {navigator} = this.props;
            navigator.pop()

        } catch (error) {
            console.log(error)
        }
    };

    Selected_Background = async (background_image) => {

        this.setState({choice_background: background_image})

    };


    render() {


        return      <ImageBackground style={{width:'100%',height:'100%'}} source={{uri:'background_airwaychat'}}>






        <View style={styles.container}>


            <Text style={{
                fontSize: 18,
                marginLeft:15,
                marginRight:15,
                color: 'black',
                textAlign:'center',
                paddingBottom:10,
                borderRadius:8,
                backgroundColor: '#ffffff'

            }}>

                Настройки</Text>


            <Text style={{fontSize: 16,   marginLeft:15,  color: 'black'}}>
                Размер текста
            </Text>
            <Slider
                style={{width: 300, height: 40, alignSelf: 'center'}}
                minimumValue={10}
                maximumValue={24}
                step={1}
                value={this.state.size_message}
                onValueChange={(sliderValue) => this.setState({size_message: sliderValue})}
                thumbTintColor="#010101"
                minimumTrackTintColor="#010101"
                maximumTrackTintColor="#000000"
            />
            <View
                style={{
                    borderBottomColor: '#d4d4d4',
                    borderBottomWidth: 1.5,
                    marginLeft:15,
                    marginRight:15,
                }}
            />

            <View
                style={{
                    borderBottomColor: '#3862c0',
                    borderBottomWidth: 1,
                    marginLeft:15,
                    marginRight:15,
                }}
            />

            <Text style={{fontSize: 16,   marginLeft:15,  color: 'black', fontWeight: '600',}}>
                Размер аватарок
            </Text>
            <Slider
            style={{width: 300, height: 40, alignSelf: 'center'}}
            minimumValue={2}
            maximumValue={60}
            value={this.state.size_avatar}
            step={2}
            onValueChange={(sliderValue) => this.setState({size_avatar: sliderValue})}
            thumbTintColor="#010101"
            minimumTrackTintColor="#010101"
            maximumTrackTintColor="#000000"
        />
            <View
                style={{
                    borderBottomColor: '#3862c0',
                    borderBottomWidth: 1,
                    marginLeft:15,
                    marginRight:15,
                }}
            />

            <Text style={{fontSize: 16,   marginLeft:15,  color: 'black', fontWeight: '600',}}>
                Размер текста в списке комнат
            </Text>
            <Slider
                style={{width: 300, height: 40, alignSelf: 'center'}}
                minimumValue={10}
                maximumValue={26}
                value={this.state.size_rooms}
                step={2}
                onValueChange={(sliderValue) => this.setState({size_rooms: sliderValue})}
                thumbTintColor="#010101"
                minimumTrackTintColor="#010101"
                maximumTrackTintColor="#000000"
            />
            <View
                style={{
                    borderBottomColor: '#3862c0',
                    borderBottomWidth: 1,
                    marginLeft:15,
                    marginRight:15,
                }}
            />

            <Text style={{fontSize: 16,   marginLeft:15,  color: 'black', fontWeight: '600',}}>
                Выбор фона
            </Text>
            <View>
                <OptimizedFlatList style={{
                    marginLeft: 35,
                    marginRight: 35,
                    backgroundColor:'#a9a9a9',
                    borderRadius:5,
                    marginBottom:5,
                    alignSelf: 'center'
                }}
                                   horizontal
                                   inverted={true}
                                   data={this.state.selectedIds}

                                   renderItem={({item}) => {

                                       return (
                                           <TouchableWithoutFeedback
                                               onPress={() => this.Selected_Background(item.url)}
                                           >
                                               <FastImage
                                                   key={item.id}
                                                   source={{uri: item.url}}
                                                   style={{width: 50, height: 50, margin: 10}}
                                                   resizeMode="cover"
                                               />


                                           </TouchableWithoutFeedback>
                                       )
                                   }}
                                   keyExtractor={(item) => item.id}


                />
                <View
                    style={{
                        borderBottomColor: '#3862c0',
                        borderBottomWidth: 1,
                        marginLeft:15,
                        marginRight:15,
                    }}
                />

                <Text style={{fontSize: 16, marginLeft:15,alignSelf:'center' }}>
                    Ваш выбор
                </Text>
                <FastImage

                    source={{uri: this.state.choice_background}}
                    style={{width: 70, height: 70,alignSelf:'center',  backgroundColor:'#a9a9a9',}}
                    resizeMode="cover"
                />
                <View
                    style={{
                        borderBottomColor: '#3862c0',
                        borderBottomWidth: 2,
                        marginTop:15,
                        marginLeft:15,
                        marginRight:15,
                    }}
                />
            </View>

            <TouchableOpacity onPress={() => this._storeData()} style={styles.buttonText1}>
                <Text style={styles.buttonText}>

                    CОХРАНИТЬ</Text>

            </TouchableOpacity>

        </View>
        </ImageBackground>


    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,


    },

    buttonText: {
        textAlign: 'center',
        color: '#000000',
        fontSize: 15,
        marginBottom: 20,
        paddingHorizontal: 10,
        backgroundColor: '#ffffff',
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 6,
    },


    buttonText1: {
        textAlign: 'center',
        color: '#000000',
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: '20%',
        paddingHorizontal: '15%',

    },


});
