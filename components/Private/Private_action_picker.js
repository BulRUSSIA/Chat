
import React from "react";

import {


    Icon,


    Right, Picker,


} from 'native-base';


export class Private_action_picker extends React.Component {


    render() {


        return   <Right>


            <Picker
                mode="dropdown"
                iosIcon={<Icon name="Stop" />}


                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#ffffff"
                style={{color:'white' }}
                selectedValue={this.props.selected}
                onValueChange={this.props.change}
            >
                <Picker.Item label="Прикрепить изображение" value="key0" />
                <Picker.Item label="Удалить диалог" value="key1" />
                <Picker.Item label="Черный список" value="key2" />

            </Picker>
        </Right>



    }
}