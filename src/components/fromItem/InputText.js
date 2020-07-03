import React, { Component } from 'react'
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

export default class InputText extends Component {
    constructor(props) {
        super(props);

        this.state = {
            label: props.label,
            type: props.type,
            
        }
    }
    
    render() {
        return (
            <Form.Group className="name">
                <Form.Label>{}</Form.Label>
                <Form.Control type="text" placeholder="名前を入力" onChange={this.setName} />
                <Form.Text className="error">{this.state.erroeMessages.name}</Form.Text>
            </Form.Group>
        )
    }
}
