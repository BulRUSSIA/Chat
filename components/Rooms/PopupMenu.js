import React from 'react';
import {View,TouchableNativeFeedback,UIManager,findNodeHandle} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';
import {Dimensions} from "react-native";
const {width, height} = Dimensions.get('window');
const ICON_SIZE = width/10;

class PopupMenu extends React.Component {
    handleShowPopupError = () => {
        // show error herekj
    };

    handleMenuPress = () => {
        const { actions, onPress } = this.props;

        UIManager.showPopupMenu(
            findNodeHandle(this.refs.menu),
            actions,
            this.handleShowPopupError,
            onPress,
        );
    };

    render() {
        return (

            <TouchableNativeFeedback

                background={TouchableNativeFeedback.Ripple('rgba(72,119,108,0.77)',true)}
                onPress={this.handleMenuPress}
              >
            <View style={{
                width: width/8,
                height:height/18,
                left:width/48,
                borderRadius: 400 / 2,
              }}>

                    <Icon
                        style={{left:width/20,align:'center'}}
                        name="md-more"
                        size={ICON_SIZE}
                        color='black'
                        ref="menu"
                    />

            </View>
            </TouchableNativeFeedback>
        );
    }
}

PopupMenu.propTypes = {
    actions: PropTypes.array.isRequired,
    onPress: PropTypes.func.isRequired,
};

export default PopupMenu;
