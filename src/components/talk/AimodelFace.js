import React, { Component } from 'react';
import '../../css/characterFace.css';
import axios from 'axios';
import { _APIURL } from '../../apiURL/AITalk_outApiCall_and_Auth';
import { _S3URL } from '../../apiURL/s3';

export default class AimodelFace extends Component {

    constructor(props) {
        super(props);
        this.state = {
            //モデルに喋らせる内容
            voiceText: this.props.voiceText,
            //AIモデルのid
            aimodel_id: props.aimodel_id,
            //口を閉じた顔
            close_mouth_image: '',
            //口を開いた顔
            open_mouth_image: ''

        }
        //componentDidUpdate()が呼ばれた回数
        this.countDidUpdate = 0;
    }

    /**
     * 顔画像を取得
     */
    async setAimodelFace() {
        //ユーザー情報を取得
        const aimodelData = await (await axios(_APIURL + `/aimodel/${this.state.aimodel_id}`)).data;

        this.setState({ open_mouth_image: aimodelData.open_mouth_image });
        this.setState({ close_mouth_image: aimodelData.close_mouth_image });
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
            if (this.state.open_mouth_image) {
                document.getElementById('character').src = _S3URL + this.state.open_mouth_image;
            }
        }

        //音声の再生が終わった後の処理
        synthes.onend = () => {
            if (this.state.close_mouth_image) {
                document.getElementById('character').src = _S3URL + this.state.close_mouth_image;
            }
        }
    }

    componentDidMount() {
        //顔画像を取得
        this.setAimodelFace();
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

    render() {
        return (
            <div>
                <img id='character' src={_S3URL + this.state.close_mouth_image} alt='' />
            </div>
        );
    }
}