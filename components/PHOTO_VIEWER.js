import {

    Modal, View

} from 'react-native';
import React from "react";

import ImageViewer from 'react-native-image-zoom-viewer';


export class PHOTO_VIEWER extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isModelVisible: true,
            images: [

                {url: this.props.photo_attachments}
            ]

        }
    }

    ShowModalFunction(visible) {
        this.setState({isModelVisible: false});
        const {navigator} = this.props;
        navigator.pop()
    }

    render() {


        return (

            <View style={{flex: 1, backgroundColor: '#010101'}}>

                <Modal
                    visible={this.state.isModelVisible}
                    transparent={false}
                    onRequestClose={() => this.ShowModalFunction()}>
                    <ImageViewer imageUrls={this.state.images}/>
                </Modal>
            </View>

        )


    }
}
