import React, { Component } from 'react'
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import InputText from '../../components/fromItem/InputText';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/container.css';
import '../../css/errorText.css';
import axios from 'axios';
import { _URL } from '../../apiURL/AITalk_outApiCall_and_Auth';
import Validator from 'validatorjs';


export default class Register extends Component {

    constructor(props) {
        super(props);

        //hogehogeNumber -> errorMessagesの格納場所
        this.state = {
            name: '',
            nameErrorNumber: 0,
            email: '',
            emailErrorNumber: 0,
            password: '',
            passwordErrorNumber: 0,
            //パスワードの確認
            password_confirmation: '',
            password_confirmationErrorNumber: 0,
            //fromの項目ごとのバリデーションルール
            rules: {
                name: 'required|max:255',
                email: ''
            },
            //項目ごとのエラーメッセージ
            errorMessages: ['', '', '', ''],
            //バリデーションルールごとのエラーメッセージ
            ruleTypeErrorMessages: {
                required: '必須項目です。',
                max: '255文字以下入力してください',
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
     * バリデーションチェック
     * @param {string} targetKey //バリデーション対象の値の名前
     * @param {string} targetValue //バリデーションの値
     * @param {string} rule //バリデーションのルール
     * @param {number} errorMessagesNumber //エラーメッセージを格納させる対象配列の添え字
     */
    checkValidation(targetKey, targetValue, rules, errorMessagesNumber) {
        //console.log({ [targetKey]: targetValue });
        //console.log(rules);


        //バリデーションを検証
        const validation = new Validator(
            { [targetKey]: targetValue },
            { [targetKey]: rules },
            this.state.ruleTypeErrorMessages
        );
        console.log(validation.fails(), targetValue);

        //バリデーションエラーはあるか？
        if (validation.fails()) {
            console.log(validation.errors.all());

            //配列をコピーして、エラーメッセージを格納
            const errorMessages_copy = this.state.errorMessages.slice();
            errorMessages_copy[errorMessagesNumber] = validation.errors.all().undefined;
            this.setState({ errorMessages: errorMessages_copy });

            return false;
        }

        //バリデーションエラーはなかった
        return true;
    }



    /**
     * 全てのバリデーションを実施する
     */
    doValidation() {
        //それぞれのバリデーションのパターンにあってるか結果を返す    
        return this.checkValidation('name', this.state.name, this.state.rules.name, this.state.nameErrorNumber);
        /** 
            this.checkEmail() &
            this.checkPassword() &&
            this.checkPasswordConfirmation();
            */
    }

    async requestRegister() {
        //リクエストボディ
        const requestBody = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password_confirmation: this.state.password_confirmation,
        }


        //ユーザー登録APIにリクエスト
        try {
            await axios.post(_URL + '/register', requestBody);

            console.log();
        } catch (error) {
            console.log(error.response);
            const errorMessages = error.response.data.error;

            //バリデーションによるユーザー登録ができなかった場合
            if (!errorMessages.createResult) {
                //メールアドレスのバリデーションエラーか？
                if (errorMessages.email) {
                    //エラーメッセージを格納
                    const erroeMessagesCopy = this.state.erroeMessages;
                    erroeMessagesCopy.email = errorMessages.email;
                    this.setState({ erroeMessages: erroeMessagesCopy });
                }
            }
        }
    }

    /**
     * 登録ボタンを押したときに作動
     */
    doSubmit() {
        //バリデーションにマッチしてないか？
        if (!this.doValidation()) {
            return;
        }
        return;

        //ユーザー登録へリクエスト開始
        this.requestRegister();
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col md={{ span: 6, offset: 3 }}>
                        <Form>
                            <InputText className="name" label="名前" type="text"
                                placeholder="名前を入力" outPutErrotMeaagages={this.state.errorMessages[this.state.nameErrorNumber]}
                                setValue={this.setName} />
                            <InputText className="email" label="メールアドレス" type="text"
                                placeholder="メールアドレスを入力" outPutErrotMeaagages={this.state.errorMessages[this.state.emailErrorNumber]}
                                setValue={this.setEmail} />
                            <Button variant="primary" onClick={this.doSubmit}>登録</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        );
    }
}
