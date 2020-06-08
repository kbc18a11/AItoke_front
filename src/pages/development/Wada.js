import React, { Component } from 'react'
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import MyMessageForm from '../../components/MyMessageForm';

export default class Wada extends Component {
    constructor(props) {
        super(props);

        this.state = {
            voiceText: '',
            voiceURL: ''
        }

    }

    setVoice(e) {
        console.log(e.voiceURL);
        
        this.setState({ voiceText: e.voiceText, voiceURL: e.voiceURL });
    }

    render() {
        return (
            <div>
                <Button variant="primary">Primary</Button>
                <h1>{this.state.voiceText}</h1>
                <h1>{this.state.voiceURL}</h1>
                <MyMessageForm onChange={e => this.setVoice(e)} />
            </div>
        )
    }
}
