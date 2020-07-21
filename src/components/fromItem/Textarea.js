import React, { Component } from 'react'
import { Form } from 'react-bootstrap';
import InputText from './InputText';
import '../../css/errorText.css';

export default class Textarea extends InputText{
    
    render() {
        return (
            <Form.Group>
                <Form.Label>{this.state.label}</Form.Label>
                <Form.Control as="textarea" rows="3" type={this.state.type} placeholder={this.state.placeholder}
                    onChange={this.state.setValue} value={this.props.value} />
                <Form.Text className="error">{this.state.outPutErrotMeaagages.toString()}</Form.Text>
            </Form.Group>
        )
    }
}
