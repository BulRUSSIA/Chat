import {
    Body,
    CardItem,
    Text,
} from "native-base";
import {Dimensions, View,TouchableNativeFeedback} from "react-native";
import React from "react";
import SlotMachine from "react-native-slot-machine";

const {height} = Dimensions.get('window');

export default class CardsGame extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            duration: 2000,
            slot1: 1111,
            slot2: 'winner',
            slot3: '2351'
        };
    }



    Spinner_slots = () => {
        setTimeout(() => this.setState({duration: 1000, slot1: '4321', slot2: 'world', slot3: '1234'}), 1000);
        setTimeout(() => this.setState({duration: 4000, slot1: '1234', slot2: 'hello', slot3: '2351'}), 1500);
        setTimeout(() => this.refs.slot.spinTo('win!'), 2500);


    };

    render() {
        return (
            <CardItem
                cardBody
                style={{backgroundColor: 'rgba(255,255,255,0)', height: height / 2}}>
                <Body>
                    <Text style={{
                        color: '#d81122',
                        textAlign: 'center',
                        alignSelf: 'center',
                        fontSize: 20,
                        fontWeight:'bold',
                        width: '100%',
                        backgroundColor: 'rgba(46,93,133,0.37)'
                    }}>Игры</Text>

                    <View style={{height: height/3, justifyContent: 'center', alignItems: 'center',alignSelf:'center'}}>
                        <SlotMachine text={this.state.slot1} duration={this.state.duration} />
                        <SlotMachine
                            text={this.state.slot2}
                            range="abcdefghijklmnopqrstuvwxyz"
                            width={30} duration={this.state.duration}
                            ref="slot"
                        />
                    </View>

                    <TouchableNativeFeedback
                        style={{backgroundColor:'#25566e'}}
                        background={TouchableNativeFeedback.Ripple('rgba(72,119,108,0.77)',true)}
                        onPress={this.Spinner_slots}
                    >
                        <Text style={{textAlign:'center',color:'#3679a9',fontWeight:'bold'}}>

                            Забрать приз!
                        </Text>
                    </TouchableNativeFeedback>
                </Body>
            </CardItem>
        );
    }
}
