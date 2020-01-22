import React, { Component } from 'react'
import { Button } from 'react-native'
import Sound from 'react-native-sound'

class RemoteSound extends Component {

    constructor(props) {
        super(props);


        this.state = {
            sound_url: this.props.sound,

            }

        };



    playTrack = () => {
        const track = new Sound(this.state.sound_url, null, (e) => {
            if (e) {
                console.log('error loading track:', e)
            } else {
                track.play()
            }
        })
    };

    render() {
        return <Button title="play me" onPress={this.playTrack} />
    }
}

export default RemoteSound