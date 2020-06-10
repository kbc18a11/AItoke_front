import React, { Component } from 'react'
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import MyMessageForm from '../../components/MyMessageForm';
import SpeechBubble from '../../components/SpeechBubble';
import TalkingLog from '../../components/TalkingLog';

export default class Wada extends Component {
    constructor(props) {
        super(props);

        this.state = {
            voiceText: '　',
            voiceURL: ''
        }

    }

    setVoice(e) {
        
        this.setState({ voiceText: e.voiceText, voiceURL: e.voiceURL });
    }

    render() {
        return (
            <div>
                <h1>{this.state.voiceText}</h1>
                <MyMessageForm onChange={e => this.setVoice(e)} />
                <SpeechBubble text={this.state.voiceText} />
                <TalkingLog text={this.state.voiceText}/>
            </div>
        )
    }
}
