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
import { Link, withRouter } from "react-router-dom";

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            //現在のログインの状態
            nowLogin: userStore.nowLogin,
            email: '',
            password: '',
            //fromの項目ごとのバリデーションルール
            rules: {
                email: 'required|email|max:255',
                password: 'required|max:255'
            },
            //項目ごとのエラーメッセージ
            errorMessages: {
                email: [],
                password: [],
            },
            //バリデーションルールごとのエラーメッセージ
            ruleTypeErrorMessages: {
                required: '必須項目です',
                max: '255文字以下入力してください',
                email: 'メールアドレスを入力してください'
            },
        };

        this.setEmail = this.setEmail.bind(this);
        this.setPassword = this.setPassword.bind(this);
        this.doSubmit = this.doSubmit.bind(this);
    }

    setEmail(e) {
        this.setState({ email: e.target.value });
    }

    setPassword(e) {
        this.setState({ password: e.target.value });
    }

    /**
     * 全てのバリデーションを実施する
     * @returns {boolean} //バリデーションエラーの存在
     */
    doValidation() {
        //checkValidationデータの対象
        const targetData = {
            email: this.state.email,
            password: this.state.password,
        };

        //setState用にthis.state.errorMessagesをコピー
        let errorMessagesCopy = Object.assign({}, this.state.errorMessages);

        const validationManager = new ValidationManager();
        //新しいエラーを返す
        errorMessagesCopy = validationManager.checkValidation(targetData, this.state.rules,
            this.state.ruleTypeErrorMessages);

        //新しいエラーに変更
        this.setState({ errorMessages: errorMessagesCopy });

        //最終的にエラーがあったか？
        return validationManager.isError;
    }

    /**
     * @returns {boolean} ログインができたかどうかの判定
     */
    async requestLogin() {
        //リクエストボディ
        const requestBody = {
            email: this.state.email,
            password: this.state.password,
        }

        //jwtトークン
        let jwtToken;
        try {
            //ログインして、jwtトークンを取得
            jwtToken = await (await axios.post(_URL + '/login', requestBody)).data.access_token;
            //console.log(jwtToken);
        } catch (error) {
            console.log(error);
            //エラーメッセージをsetStateようにコピー
            const errorMessagesCopy = Object.assign({}, this.state.errorMessages);

            //エラーメッセージを格納
            errorMessagesCopy.email = 'メールアドレスが違います。';
            errorMessagesCopy.password = 'パスワードが違います。';

            //新しいエラーに変更
            this.setState({ errorMessages: errorMessagesCopy });
            return false;
        }

        //ユーザーの情報
        let userData;
        try {
            //ユーザー情報取得
            userData = await (await axios.get(_URL + '/me',
                { headers: { Authorization: `Bearer ${jwtToken}` } })).data;
        } catch (error) {
            console.log(error.response);
            return false;
        }

        //userStoreにセットするユーザー情報
        const setUserStoreData = {
            nowLogin: true,
            token: jwtToken,
            userId: userData.id,
            name: userData.name,
            icon: userData.icon
        }
        actions.register(setUserStoreData);

        //console.log(userStore.userStatus);
        //console.log(userStore.nowLogin);
        //console.log(userStore.token);

        return true;
    }

    async doSubmit() {
        //エラーメッセージは存在するか？
        if (this.doValidation()) {
            return;
        }

        //ログインは出来たか？
        if (this.requestLogin()) {
            //ログインの状態をログイン済みに変更
            this.setState({ nowLogin: true });
        }
    }

    render() {
        //既にログインしてていたら、'/'に移動
        if (this.state.nowLogin) {
            console.log('nowLogin');
            //'/'にリダイレクト
            this.props.history.replace("/");
        }

        return (
            <Container>
                <Row>
                    <Col md={{ span: 6, offset: 3 }}>
                        <h1>ログイン</h1>
                        <Form>
                            <InputText className="email" label="メールアドレス" type="email"
                                placeholder="メールアドレスを入力" outPutErrotMeaagages={this.state.errorMessages.email}
                                setValue={this.setEmail} />
                            <InputText className="password" label="パスワード" type="password"
                                placeholder="パスワードを入力" outPutErrotMeaagages={this.state.errorMessages.password}
                                setValue={this.setPassword} />
                            <Button variant="primary" onClick={this.doSubmit}>ログイン</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        )
    }
}
