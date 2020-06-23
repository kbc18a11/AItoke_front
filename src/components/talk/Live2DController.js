import React, { Component } from 'react';
import character0 from './../../image/character0.png';
import character1 from './../../image/character1.png';
import '../../css/characterFace.css';

export default class Live2DController extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modelSpeech: ''
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ modelSpeech: nextProps.modelSpeech });
        this.speaking();
    }


    speaking() {
        const synthes = new SpeechSynthesisUtterance();
        synthes.voiceURI = 'native';
        synthes.volume = 1.0; //音量 min 0 ~ max 1
        synthes.rate = 1.0;   //速度 min 0 ~ max 10
        synthes.pitch = 1.0;　//音程 min 0 ~ max 2
        synthes.lang = 'ja-UP';
        synthes.text = this.state.modelSpeech;
        speechSynthesis.speak(synthes);
        
        synthes.onstart = function () {
            document.getElementById('character').src = character1;
        }
        
        synthes.onend = function () {
            document.getElementById('character').src = character0;
        }
    }

    render() {//描写処理
        return (
            <div>
                <img id='character' src={character0} alt='' />
            </div>
        );
    }
}