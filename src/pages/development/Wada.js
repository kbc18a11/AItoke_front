import React, { Component } from 'react'
import {Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import MyMessageForm from '../../components/MyMessageForm';

export default class Wada extends Component {
    render() {
        return (
            <div>
                <MyMessageForm/>
                <Button variant="primary">Primary</Button>
            </div>
        )
    }
}
