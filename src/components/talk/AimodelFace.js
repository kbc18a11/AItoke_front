import React, { Component } from 'react';
import closeMouth from './../../image/character0.png';
import opneMouth from './../../image/character1.png';
import '../../css/characterFace.css';

export default class AimodelFace extends Component {

    constructor(props) {
        super(props);
        this.state = {
            //モデルに喋らせる内容
            voiceText: this.props.voiceText,
            //モデルの画像の状態
            faceState: closeMouth,
        }
        //componentDidUpdate()が呼ばれた回数
        this.countDidUpdate = 0;
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.voiceText === nextProps.voiceText) {
            return;
        }

        this.setState({ voiceText: nextProps.voiceText });
    }

    componentDidUpdate() {
        //呼ばれたためカウント
        this.countDidUpdate++;

        //呼ばれて3回目で0回目でリセット
        if (this.countDidUpdate === 3) {
            this.countDidUpdate = 0;
            return;
        }

        //1回目であれば、喋る
        if (this.countDidUpdate === 1) {
            this.speaking();
        }
    }

    /**
     * 音声の制御
     */
    speaking() {
        const synthes = new SpeechSynthesisUtterance();
        synthes.voiceURI = 'native';
        synthes.volume = 1.0; //音量 min 0 ~ max 1
        synthes.rate = 1.0;   //速度 min 0 ~ max 10
        synthes.pitch = 1.0;　//音程 min 0 ~ max 2
        synthes.lang = 'ja-UP';
        synthes.text = this.state.voiceText;
        speechSynthesis.speak(synthes);

        //音声の再生中の処理
        synthes.onstart = () => {
            document.getElementById('character').src = opneMouth;
        }

        //音声の再生が終わった後の処理
        synthes.onend = () => {
            document.getElementById('character').src = closeMouth;
        }
    }

    render() {
        return (
            <div>
                <img id='character' src={this.state.faceState} alt='' />
            </div>
        );
    }
}