import React, { Component } from 'react'
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import MyMessageForm from '../../components/MyMessageForm';

export default class Wada extends Component {
    constructor(props) {
        super(props);

        this.state = {
            voice: ''
        }

    }

    setVoice(e) {
        this.setState({ voiceText: e.voice });
    }

    render() {
        return (
            <div>
                <Button variant="primary">Primary</Button>
                <h1>{this.state.voice}</h1>
                <MyMessageForm onChange={e => this.setVoice(e)}/>
            </div>
        )
    }
}
