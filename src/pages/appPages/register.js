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
            },
        };

        this.setName = this.setName.bind(this);
        this.setEmail = this.setEmail.bind(this);
        this.setPassword = this.setPassword.bind(this);
        this.setPassword_confirmation = this.setPassword_confirmation.bind(this);
        this.doSubmit = this.doSubmit.bind(this);
    }

    setName(e) {
        this.setState({ name: e.target.value });
    }

    setEmail(e) {
        this.setState({ email: e.target.value });
    }

    setPassword(e) {
        this.setState({ password: e.target.value });
    }

    setPassword_confirmation(e) {
        this.setState({ password_confirmation: e.target.value });
    }

    /**
     * nameの入力チェック
     */
    checkName() {
        //255文字以下名前は入力済みか？
        if (0 < this.state.name.length && this.state.name.length < 255) {
            //エラーメッセージを空にする
            const erroeMessagesCopy = this.state.erroeMessages;
            erroeMessagesCopy.name = '';
            this.setState({ erroeMessages: erroeMessagesCopy });
            return true;
        }

        //エラーメッセージを格納
        const erroeMessagesCopy = this.state.erroeMessages;
        erroeMessagesCopy.name = '255文字以下の名前を入力してください';
        this.setState({ erroeMessages: erroeMessagesCopy });
        return false;
    }

    /**
     * emailの入力チェック
     */
    checkEmail() {
        const pattern = /^([a-zA-Z0-9])+([a-zA-Z0-9\._-])*@([a-zA-Z0-9_-])+([a-zA-Z0-9\._-]+)+$/;
        //255文字以下メールアドレスは入力済みか？
        if (pattern.test(this.state.email) && this.state.email.length < 255) {
            //エラーメッセージを空にする
            const erroeMessagesCopy = this.state.erroeMessages;
            erroeMessagesCopy.email = '';
            this.setState({ erroeMessages: erroeMessagesCopy });
            return true;
        }

        //エラーメッセージを格納
        const erroeMessagesCopy = this.state.erroeMessages;
        erroeMessagesCopy.email = '255文字以下のメールアドレスを入力してください';
        this.setState({ erroeMessages: erroeMessagesCopy });
        return false;
    }

    /**
     * passwordの入力チェック
     */
    checkPassword() {
        //８文字以上のパスワードは入力済みか？
        if (this.state.password.length > 8) {
            //エラーメッセージを空にする
            const erroeMessagesCopy = this.state.erroeMessages;
            erroeMessagesCopy.password = '';
            this.setState({ erroeMessages: erroeMessagesCopy });
            return true;
        }

        //エラーメッセージを格納
        const erroeMessagesCopy = this.state.erroeMessages;
        erroeMessagesCopy.password = '8文字以上のパスワードを入力してください';
        this.setState({ erroeMessages: erroeMessagesCopy });
        return false;
    }

    /**
     * password_confirmationの入力チェック
     */
    checkPasswordConfirmation() {
        //入力したパスワードと確認入力したものが一致しているか？
        if (this.state.password_confirmation === this.state.password) {
            //エラーメッセージを空にする
            const erroeMessagesCopy = this.state.erroeMessages;
            erroeMessagesCopy.password_confirmation = '';
            this.setState({ erroeMessages: erroeMessagesCopy });
            return true;
        }

        //エラーメッセージを格納
        const erroeMessagesCopy = this.state.erroeMessages;
        erroeMessagesCopy.password_confirmation = 'パスワードが一致していません';
        this.setState({ erroeMessages: erroeMessagesCopy });
        return false;
    }

    /**
     * 全てのバリデーションを実施する
     */
    doValidation() {
        //それぞれのバリデーションのパターンにあってるか結果を返す    
        return this.checkName() &
            this.checkEmail() &
            this.checkPassword() &&
            this.checkPasswordConfirmation();
    }

    /**
     * 登録ボタンを押したときに作動
     */
    doSubmit() {
        //バリデーションにマッチしてないか？
        if (!this.doValidation()) {
            return;
        }
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col md={{ span: 6, offset: 3 }}>
                        <Form>
                            <Form.Group className="name">
                                <Form.Label>名前</Form.Label>
                                <Form.Control type="text" placeholder="名前を入力" onChange={this.setName} />
                                <Form.Text className="error">{this.state.erroeMessages.name}</Form.Text>
                            </Form.Group>
                            <Form.Group className="email">
                                <Form.Label>メールアドレス</Form.Label>
                                <Form.Control type="email" placeholder="メールアドレスを入力" onChange={this.setEmail} />
                                <Form.Text className="error">{this.state.erroeMessages.email}</Form.Text>
                            </Form.Group>
                            <Form.Group className="password">
                                <Form.Label>パスワード</Form.Label>
                                <Form.Control type="password" placeholder="パスワードを入力" onChange={this.setPassword} />
                                <Form.Text className="error">{this.state.erroeMessages.password}</Form.Text>
                            </Form.Group>
                            <Form.Group className="password_confirmation">
                                <Form.Label>パスワードの確認</Form.Label>
                                <Form.Control type="password" placeholder="パスワードの確認入力" onChange={this.setPassword_confirmation} />
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
