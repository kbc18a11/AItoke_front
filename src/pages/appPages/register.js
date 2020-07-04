import React, { Component } from 'react'
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import InputText from '../../components/fromItem/InputText';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/container.css';
import '../../css/errorText.css';
import axios from 'axios';
import { _URL } from '../../apiURL/AITalk_outApiCall_and_Auth';
import ValidationManager from '../../modules/class/ValidationManager';

export default class Register extends Component {

    constructor(props) {
        super(props);

        //hogehogeNumber -> errorMessagesの格納場所
        this.state = {
            name: '',
            email: '',
            password: '',
            //パスワードの確認
            password_confirmation: '',
            //fromの項目ごとのバリデーションルール
            rules: {
                name: 'required|max:255',
                email: 'required|email|max:255',
                password: 'required|min:8|max:255'
            },
            //項目ごとのエラーメッセージ
            errorMessages: {
                name: [],
                email: [],
                password: [],
                password_confirmation: []
            },
            //バリデーションルールごとのエラーメッセージ
            ruleTypeErrorMessages: {
                required: '必須項目です',
                max: '255文字以下入力してください',
                min: '8文字以上入力してください',
                email:'メールアドレスを入力してください'
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
     * パスワードの入力確認チェック
     * @returns {object} //エラーの結果
     */
    checktPassword_confirmation() {
        //パスワードとパスワードの入力確認は、同じ値か？
        if (this.state.password === this.state.password_confirmation) {
            return { error: false };
        }

        //エラー本文を返す
        return { error: true, message: 'パスワードが違います' };
    }

    /**
     * 全てのバリデーションを実施する
     * @returns {boolean} //バリデーションエラーの存在
     */
    doValidation() {
        //checkValidationデータの対象
        const targetData = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
        };

        //setState用にthis.state.errorMessagesをコピー
        let errorMessagesCopy = Object.assign({}, this.state.errorMessages);

        const validationManager = new ValidationManager();
        //新しいエラーを返す
        errorMessagesCopy = validationManager.checkValidation(targetData, this.state.rules, this.state.ruleTypeErrorMessages);

        //this.state.password_confirmationのバリデーション
        const resultObject = this.checktPassword_confirmation();
        //パスワード入力確認ができてなかったか？
        if (resultObject.error) {
            //エラーの存在があったため、trueにする
            validationManager.isError = true;
            errorMessagesCopy.password_confirmation = resultObject.message;
        }

        //新しいエラーに変更
        this.setState({ errorMessages: errorMessagesCopy })
        
        //最終的にエラーがあったか？
        return validationManager.isError;
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
                    const errorMessagesCopy = Object.assign({}, this.state.errorMessages);
                    errorMessagesCopy.email = errorMessages.email;
                    this.setState({ errorMessages: errorMessagesCopy });
                }
            }
        }
    }

    /**
     * 登録ボタンを押したときに作動
     */
    doSubmit() {
        //バリデーションにエラーは存在しているか？
        if (this.doValidation()) {
            return;
        }

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
                                placeholder="名前を入力" outPutErrotMeaagages={this.state.errorMessages.name}
                                setValue={this.setName} />
                            <InputText className="email" label="メールアドレス" type="email"
                                placeholder="メールアドレスを入力" outPutErrotMeaagages={this.state.errorMessages.email}
                                setValue={this.setEmail} />
                            <InputText className="password" label="パスワード" type="password"
                                placeholder="パスワードを入力" outPutErrotMeaagages={this.state.errorMessages.password}
                                setValue={this.setPassword} />
                            <InputText className="password_confirmation" label="パスワードの再入力" type="password"
                                placeholder="パスワードを再入力" outPutErrotMeaagages={this.state.errorMessages.password_confirmation}
                                setValue={this.setPassword_confirmation} />
                            <Button variant="primary" onClick={this.doSubmit}>登録</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        );
    }
}
