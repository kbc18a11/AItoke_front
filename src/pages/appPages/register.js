import React, { Component } from 'react'
import { Form, FormControl, Button, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/container.css';

export default class register extends Component {
    render() {
        return (
            <Container>
                <Row>
                    <Col>
                        <Form>
                            <Form.Group className="name">
                                <Form.Label>名前</Form.Label>
                                <Form.Control type="text" placeholder="名前を入力" />
                                <Form.Text className="error"></Form.Text>
                            </Form.Group>
                            <Form.Group className="email">
                                <Form.Label>メールアドレス</Form.Label>
                                <Form.Control type="email" placeholder="メールアドレスを入力" />
                                <Form.Text className="error"></Form.Text>
                            </Form.Group>
                            <Form.Group className="password">
                                <Form.Label>パスワード</Form.Label>
                                <Form.Control type="error" placeholder="パスワードを入力" />
                            </Form.Group>
                            <Form.Group className="password_confirmation">
                                <Form.Label>パスワードの確認</Form.Label>
                                <Form.Control type="error" placeholder="パスワードの確認入力" />
                            </Form.Group>
                            <Button variant="primary">登録</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        );
    }
}
