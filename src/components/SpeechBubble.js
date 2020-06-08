import React, { Component } from 'react'
import { Button, Form, FormControl, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class SpeechBubble extends Component {
    constructor(props) {
        super(props);

        this.state = {
            text: this.props.text
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
        
        this.setState({ text: nextProps.text });
    }

    render() {
        return (
            <div>
                <h1>{this.state.text}</h1>
            </div>
        )
    }
}
