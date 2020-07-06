import React, { Component } from 'react'
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import InputText from '../../components/fromItem/InputText';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/container.css';
import '../../css/errorText.css';
import axios from 'axios';
import { _URL } from '../../apiURL/AITalk_outApiCall_and_Auth';
import ValidationManager from '../../modules/class/ValidationManager';
import { actions } from '../../flux/user/userActions';
import userStore from '../../flux/user/UserStore';
import { Redirect } from "react-router-dom";

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        };

        this.setEmail = this.setEmail.bind(this);
        this.setPassword = this.setPassword.bind(this);
    }

    setEmail(e) {
        this.setState({ email: e.target.value });
    }

    setPassword(e) {
        this.setState({ password: e.target.value });
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col md={{ span: 6, offset: 3 }}>
                        <h1>ログイン</h1>
                        <Form>
                            <InputText className="email" label="メールアドレス" type="email"
                                placeholder="メールアドレスを入力" outPutErrotMeaagages={''}
                                setValue={this.setEmail} />
                            <InputText className="password" label="パスワード" type="password"
                                placeholder="パスワードを入力" outPutErrotMeaagages={''}
                                setValue={this.setPassword} />
                            <Button variant="primary" onClick={this.doSubmit}>登録</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        )
    }
}
