import React, { Component } from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import MyMessageForm from '../../components/talk/MyMessageForm';
import SpeechBubble from '../../components/talk/SpeechBubble';
import TalkingLog from '../../components/talk/TalkingLog';
import '../../css/myMessageForm.css';

export default class Talking extends Component {
    constructor(props) {
        super(props);

        this.state = {
            voiceText: '　',
            log: { who: '', text: '' }
        }

    }

    /**
     * MyMessageFormから来たAIのセリフを受け取る
     * @param {*} text 
     */
    setVoice(text) {

        this.setState({ voiceText: text });
    }

    /**
     * MyMessageFormからTalkingLogに送る新しいログを生成する
     * @param {*} inLog 
     */
    setLog(inLog) {
        console.log(inLog);

        this.setState({ log: { who: inLog.who, text: inLog.text } });
    }

    render() {
        return (
            <Row>
                <Col md={4}><h1>{this.state.voiceText}</h1></Col>
                <Col md={8}>
                    <SpeechBubble text={this.state.voiceText} />
                    <MyMessageForm setVoice={e => this.setVoice(e)} setLog={e => this.setLog(e)} />
                    <TalkingLog log={this.state.log} />
                </Col>
            </Row>
        )
    }
}
