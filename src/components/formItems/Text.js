import React, { Component } from 'react'
import { Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/container.css';

export default class Text extends Component {
    constructor(props) {
        super(props);

        this.state = {
            lavelText: this.props.lavelText,
            type: this.props.type,
            placeholder: this.props.placeholder,
            underMessage: this.props.underMessage,
            validationRules: this.props.validationRules
        }
    }

    render() {
        return (
            <Form.Group>
                <Form.Label>{this.state.lavelText}</Form.Label>
                <Form.Control type={this.state.type} placeholder={this.state.placeholder} />
                <Form.Text className="text-muted">{this.state.underMessage}</Form.Text>
            </Form.Group>
        )
    }
}
