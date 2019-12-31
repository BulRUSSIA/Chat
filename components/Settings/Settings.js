import {
    AsyncStorage,

    Text,
    StyleSheet,
    TouchableWithoutFeedback,
    View,
    TouchableOpacity

} from "react-native";
import React from "react";
import Slider from '@react-native-community/slider';
import {OptimizedFlatList} from "react-native-optimized-flatlist";
import FastImage from "react-native-fast-image";

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
            selectedIds: background_fon,
            choice_background: 'default_background'


        };


    }


    componentDidMount = async () => {

        const background_image = await AsyncStorage.getItem('background_fon');
        const size_msg = await AsyncStorage.getItem('size_message');
        const size_av = await AsyncStorage.getItem('size_avatar');
        this.setState({
            size_message: Number(size_msg),
            size_avatar: Number(size_av),
            choice_background: background_image


        })

    };


    _storeData = async () => {
        try {

            await AsyncStorage.setItem('size_message', (this.state.size_message.toString()));
            console.log('message size:' + this.state.size_message.toString())

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


        return <View style={styles.container}>

            <Text style={{
                fontSize: 26,
                textAlign: 'center',
                color: 'white',
                fontWeight: 'bold',
                backgroundColor: '#3E9496',
                marginBottom: 20
            }}>

                Настройки</Text>


            <Text style={{fontSize: 16, textAlign: 'center', color: 'white', fontWeight: 'bold',}}>
                Размер текста
            </Text>
            <Slider
                style={{width: 300, height: 80, alignSelf: 'center'}}
                minimumValue={10}
                maximumValue={24}
                step={1}
                value={this.state.size_message}
                onValueChange={(sliderValue) => this.setState({size_message: sliderValue})}
                minimumTrackTintColor="#2ABB28"
                maximumTrackTintColor="#000000"
            />

            <Text style={{fontSize: 16, textAlign: 'center', color: 'white', fontWeight: 'bold',}}>
                Размер аватарок
            </Text>
            <Slider
                style={{width: 300, height: 80, alignSelf: 'center'}}
                minimumValue={2}
                maximumValue={60}
                value={this.state.size_avatar}
                step={2}
                onValueChange={(sliderValue) => this.setState({size_avatar: sliderValue})}
                minimumTrackTintColor="#2ABB28"
                maximumTrackTintColor="#000000"
            />
            <Text style={{fontSize: 16, textAlign: 'center', color: 'white', fontWeight: 'bold',}}>
                Выбор фона
            </Text>
            <View style={{backgroundColor: 'rgba(43,80,116,0.27)', paddingTop: '2%', paddingBottom: '2%'}}>
                <OptimizedFlatList style={{
                    marginLeft: 30,
                    marginRight: 30,

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
                <Text style={{fontSize: 16, textAlign: 'center', color: 'white', fontWeight: 'bold',}}>
                    Ваш выбор
                </Text>
                <FastImage

                    source={{uri: this.state.choice_background}}
                    style={{width: 70, height: 70, alignSelf: 'center'}}
                    resizeMode="cover"
                />
            </View>

            <TouchableOpacity onPress={() => this._storeData()} style={styles.buttonText1}>
                <Text style={styles.buttonText}>

                    Cохранить</Text>

            </TouchableOpacity>
        </View>

    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(38,73,92)',


    },

    buttonText: {
        textAlign: 'center',
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 20,
        paddingHorizontal: 10,
        backgroundColor: '#3e9496',
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 14,
    },


    buttonText1: {
        textAlign: 'center',
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: '20%',
        paddingHorizontal: '15%',

    },


});
