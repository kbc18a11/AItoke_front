import React, { Component } from 'react'
import { Button, Form, FormControl, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { _URL } from '../apiURL/AITalk_outApiCall_and_Auth';

export default class MyMessageForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            message: '',
        }

        this.doChange_message = this.doChange_message.bind(this);
    }

    /**
     * messageの値の変更を受け付ける
     * @param {*} e 
     */
    doChange_message(e) {
        this.setState({ message: e.target.value });
        //console.log(this.state.message);
    }

    doGetNobyAPI(text) {
        fetch(_URL, { text: text })
            .then((res) => {
                console.log(res);
            })
            .catch((error) => {
                console.log(error);
            })
    }




    render() {
        const marginStyle = {
            margin: '1px'
        }


        return (
            <Container>
                <Form>
                    <Row>
                        <Col xs={12} md={6}><FormControl type="text" style={marginStyle} value={this.state.message}
                            placeholder="メッセージを入力してください"
                            className="" onChange={this.doChange_message} /></Col>
                        <Col xs={6} md={3}><Button variant="primary" block className="">自分の声で喋る</Button></Col>
                        <Col xs={6} md={3}><Button variant="primary" block className="">メッセージを届ける</Button></Col>
                    </Row>
                </Form>
            </Container>

        )
    }
}
