import React, { Component } from 'react'
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import MyMessageForm from '../../components/talk/MyMessageForm';
import SpeechBubble from '../../components/talk/SpeechBubble';
import TalkingLog from '../../components/talk/TalkingLog';

export default class Wada extends Component {
    constructor(props) {
        super(props);

        this.state = {
            voiceText: '　',
            log: { who: '', text: '' }
        }

    }

    setVoice(text) {

        this.setState({ voiceText: text});
    }

    setLog(inLog) {
        console.log(inLog);

        this.setState({ log: { who: inLog.who, text: inLog.text } });
    }

    render() {
        return (
            <div>
                <h1>{this.state.voiceText}</h1>
                <MyMessageForm setVoice={e => this.setVoice(e)} setLog={e => this.setLog(e)} />
                <SpeechBubble text={this.state.voiceText} />
                <TalkingLog log={this.state.log} />
            </div>
        )
    }
}
