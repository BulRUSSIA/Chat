import React, {Component} from 'react';

import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    Platform,
    Dimensions,
    Alert,

    TouchableWithoutFeedback,
} from 'react-native';

import Sound from 'react-native-sound';
import {AudioRecorder, AudioUtils} from 'react-native-audio';
import moment from 'moment'
import SEND_AUDIO_request from "../../actions/fetch_upload_audio";
import FastImage from "react-native-fast-image";


const {width, height} = Dimensions.get('window');

class AudioExample extends Component {

    state = {
        currentTime: 0.0,
        recording: false,
        paused: false,
        stoppedRecording: false,
        finished: false,
        audioPath: AudioUtils.DocumentDirectoryPath + '/test.aac',
        hasPermission: undefined,
    };

    prepareRecordingPath(audioPath) {
        AudioRecorder.prepareRecordingAtPath(audioPath, {
            SampleRate: 22050,
            Channels: 1,
            AudioQuality: "Low",
            AudioEncoding: "aac",
            AudioEncodingBitRate: 32000
        });
    }

    componentDidMount() {
        AudioRecorder.requestAuthorization().then((isAuthorised) => {
            this.setState({hasPermission: isAuthorised});

            if (!isAuthorised) return;

            this.prepareRecordingPath(this.state.audioPath);

            AudioRecorder.onProgress = (data) => {
                this.setState({currentTime: Math.floor(data.currentTime)});
            };

            AudioRecorder.onFinished = (data) => {
                // Android callback comes in the form  of a  promise i nstead.
                if (Platform.OS === 'ios') {
                    this._finishRecording(data.status === "OK", data.audioFileURL, data.audioFileSize);
                }
            };
        });

        // this.props.props_to_state_audio(this.state.audioPath)
    }

    send_audio = async () => {

        const file = {
            uri: this.state.audioPath,
            fileName: `${moment
                .utc()
                .format("YYYY-MM-DD-HH-mm-ss")}.aac`,
            type: 'audio/aac',
        };

        let create = await this.createFormData(file);

        return create
    };

    createFormData =  async (audio) => {
        const data = new FormData();

        data.append("audio", {
            name: audio.fileName,
            type: audio.type,
            uri: "file://" + audio.uri,
        });
        return data;
    };


    _renderButton = (title, onPress, active) =>{
        let style  = (active) ? styles.activeButtonText : styles.buttonText;

        return (
<View>
            <TouchableWithoutFeedback  style={styles.button} onPressIn={onPress}

                                       onPressOut={()=>this._stop()}>

                <FastImage
                    style={{height: height * 0.2,  width: width * 0.2,marginTop:height*0.01}}
                    source={{uri:'record'}}
                    resizeMode={FastImage.resizeMode.contain}/>

            </TouchableWithoutFeedback>

</View>

        );
    };

    _renderPauseButton(onPress, active) {
        var style = (active) ? styles.activeButtonText : styles.buttonText;
        var title = this.state.paused ? "RESUME" : "PAUSE";
        return (
            <TouchableHighlight style={styles.button} onPress={onPress}>
                <Text style={style}>
                    {title}
                </Text>
            </TouchableHighlight>
        );
    }

    async _pause() {
        if (!this.state.recording) {
            console.warn('Can\'t pause, n o t recording!');
            return;
        }

        try {
            const filePath = await AudioRecorder.pauseRecording();
            this.setState({paused: true});
        } catch (error) {
            console.error(error);
        }
    }

    async _resume() {
        if (!this.state.paused) {
            console.warn('Can\'t resume, no t paused!');
            return;
        }

        try {
            await AudioRecorder.resumeRecording();
            this.setState({paused: false});
        } catch (error) {
            console.error(error);
        }
    }

    async _stop() {
        try {
            if (this.state.currentTime<1.5)

            {Alert.alert('Предупреждение','Удерживайте иконку записи дольше - запись продолжена...')}
            else {
            if (!this.state.recording) {
                console.warn('Can\'t  stop, not recording!');
                return;
            }

            this.setState({stoppedRecording: true, recording: false, paused: false});

            try {
                const filePath = await AudioRecorder.stopRecording();

                if (Platform.OS === 'android') {
                    this._finishRecording(true, filePath);

                    let audio_data = await this.send_audio();
                   await this.props.send_audio_file(audio_data)
                }
                return filePath;
            } catch (error) {
                console.error(error);

            }
            }
        }
        catch (e) {
            alert('аудио не может быть пустым')

        }
    }

    async _play() {
        if (this.state.recording) {
            await this._stop();
        }

        // These timeouts are a hacky workaround for some issues with react-native-sound.
        // See https://github.com/zmxv/react-native-sound/issues/89.
        setTimeout(() => {
            let sound = new Sound(this.state.audioPath, '', (error) => {
                if (error) {
                    console.log('failed to load the sound', error);
                }
            });

            setTimeout(() => {
                sound.play((success) => {
                    if (success) {
                        console.log('successfully finished playing');
                    } else {
                        console.log('playback failed due to audio decoding errors');
                    }
                });
            }, 100);
        }, 100);
    }


    async _record() {
        if (this.state.recording) {
            console.warn('Already recording!');
            return;
        }

        if (!this.state.hasPermission) {
            console.warn('Can\'t record, no permission granted!');
            return;
        }

        if (this.state.stoppedRecording) {
            this.prepareRecordingPath(this.state.audioPath);
        }

        this.setState({recording: true, paused: false});

        try {
            const filePath = await AudioRecorder.startRecording();
        } catch (error) {
            console.error(error);
        }
    }

    _finishRecording(didSucceed, filePath, fileSize) {
        this.setState({finished: didSucceed});
        console.log(`Finished recording of duration ${this.state.currentTime} seconds at path: ${filePath} and size of ${fileSize || 0} bytes`);
    }

    render() {

        return (
            <View style={styles.container}>

                <View style={styles.controls}>
                    <Text style={styles.progressText}>{this.state.currentTime}s</Text>
                    {this._renderButton("", () => {
                        this._record()
                    }, this.state.recording)}

                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        maxHeight:'20%',

        alignSelf:'center'
    },
    controls: {


        flexDirection:'row'
    },
    progressText: {

        fontSize: 25,
        color: "#ff0509",
        alignSelf: 'center',
        marginLeft:'15%',
        margin:10,

    },
    button: {
        color:'blue',
        borderRadius:400/2
    },
    disabledButtonText: {
        color: '#eee'
    },
    buttonText: {
        color:'blue',
        borderRadius:400/2
    },
    activeButtonText: {
        fontSize: 20,
        color: "#B81F00"
    }

});

export default AudioExample;