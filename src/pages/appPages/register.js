import React, { Component } from 'react'
import { Form, FormControl, Button, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/container.css';
import '../../css/errorText.css';

export default class register extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            password: '',
            //パスワードの確認
            password_confirmation: '',
            //それぞれのエラーメッセージ
            erroeMessages: {
                name: '',
                email: '',
                password: '',
                password_confirmation: ''
            }
        };

        this.setName = this.setName.bind(this);
        this.setEmail = this.setEmail.bind(this);
        this.setPassword = this.setPassword_confirmation.bind(this);
        this.setPassword_confirmation = this.setPassword_confirmation.bind(this);
        this.doSubmit = this.doSubmit.bind(this);
    }

    setName(e) {
        this.setState({ name: e.target.value})
    }

    setEmail(e) {
        this.setState({ email: e.target.value })
    }

    setPassword(e) {
        this.setState({ password: e.target.value })
    }

    setPassword_confirmation(e) {
        this.setState({ password_confirmation: e.target.value })
    }

    checkName() {

    }

    doValidation() {

    }

    doSubmit() {
        
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col>
                        <Form>
                            <Form.Group className="name">
                                <Form.Label>名前</Form.Label>
                                <Form.Control type="text" placeholder="名前を入力" onChange={this.setName}/>
                                <Form.Text className="error">{this.state.erroeMessages.name}</Form.Text>
                            </Form.Group>
                            <Form.Group className="email">
                                <Form.Label>メールアドレス</Form.Label>
                                <Form.Control type="email" placeholder="メールアドレスを入力" onChange={this.setEmail}/>
                                <Form.Text className="error">{this.state.erroeMessages.email}</Form.Text>
                            </Form.Group>
                            <Form.Group className="password">
                                <Form.Label>パスワード</Form.Label>
                                <Form.Control type="error" placeholder="パスワードを入力" onChange={this.setPassword}/>
                                <Form.Text className="error">{this.state.erroeMessages.password}</Form.Text>
                            </Form.Group>
                            <Form.Group className="password_confirmation">
                                <Form.Label>パスワードの確認</Form.Label>
                                <Form.Control type="error" placeholder="パスワードの確認入力" onChange={this.setPassword_confirmation}/>
                                <Form.Text className="error">{this.state.erroeMessages.password_confirmation}</Form.Text>
                            </Form.Group>
                            <Button variant="primary" onClick={this.doSubmit}>登録</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        );
    }
}
