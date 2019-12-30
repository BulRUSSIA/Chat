import React from 'react';
import {View,TouchableOpacity,UIManager,findNodeHandle} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';

const ICON_SIZE = 24;

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
            <View>

                <TouchableOpacity onPress={this.handleMenuPress} style={{alignSelf:'center',backgroundColor:'transparent',paddingLeft:15,paddingRight:15}}>
                    <Icon
                        name="md-more"
                        size={ICON_SIZE}
                        color='white'
                        ref="menu"
                    />
                </TouchableOpacity>
            </View>
        );
    }
}

PopupMenu.propTypes = {
    actions: PropTypes.array.isRequired,
    onPress: PropTypes.func.isRequired,
};

export default PopupMenu;