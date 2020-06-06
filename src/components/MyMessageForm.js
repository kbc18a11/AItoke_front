import React, { Component } from 'react'
import { Button, Form, FormControl, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class MyMessageForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            message: '',
        }
    }

    doGetNobyAPI() {
    }


    render() {
        const marginStyle = {
            margin: '1px'
        }


        return (
            <Container>
                <Form>
                    <Row>
                        <Col xs={12} md={6}><FormControl type="text" style={marginStyle} placeholder="メッセージを入力してください" className="" /></Col>
                        <Col xs={6} md={3}><Button variant="primary" block className="">自分の声で喋る</Button></Col>
                        <Col xs={6} md={3}><Button variant="primary" block className="">メッセージを届ける</Button></Col>
                    </Row>
                </Form>
            </Container>

        )
    }
}
