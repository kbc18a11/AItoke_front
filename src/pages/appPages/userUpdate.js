import React, { Component } from 'react'
import { Form, Button, Container, Row, Col, Image } from 'react-bootstrap';
import InputText from '../../components/fromItem/InputText';
import InputImage from '../../components/fromItem/InputImage';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/container.css';
import '../../css/errorText.css';
import axios from 'axios';
import { _URL } from '../../apiURL/AITalk_outApiCall_and_Auth';
import ValidationManager from '../../modules/class/ValidationManager';
import { actions } from '../../flux/user/userActions';
import userStore from '../../flux/user/UserStore';
import { Redirect } from "react-router-dom";
import Logout from './Logout';


export default class userUpdate extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: userStore.userStatus.name,
            email: userStore.userStatus.email,
            //アイコンのURL
            iconURL: 'https://aitoke.s3-ap-northeast-1.amazonaws.com/' + userStore.userStatus.icon,
            //アップロードするアイコンファイル
            iconFile: null,
            //fromの項目ごとのバリデーションルール
            rules: {
                name: 'required|max:255',
                email: 'required|email|max:255',
            },
            //項目ごとのエラーメッセージ
            errorMessages: {
                name: [],
                email: [],
                icon: [],
            },
            //バリデーションルールごとのエラーメッセージ
            ruleTypeErrorMessages: {
                required: '必須項目です',
                max: '255文字以下入力してください',
                email: 'メールアドレスを入力してください',
                image: '画像を選択してください'
            },
            //リダイレクト先
            //ログインしていたら、初期状態ではリダイレクトしない
            redirectTo: userStore.nowLogin ? '' : '/login',
        }

        this.setName = this.setName.bind(this);
        this.setEmail = this.setEmail.bind(this);
        this.setIcon = this.setIcon.bind(this);
        this.doSubmit = this.doSubmit.bind(this);
    }

    setName(e) {
        this.setState({ name: e.target.value });
    }

    setEmail(e) {
        this.setState({ email: e.target.value });
    }

    setIcon(files) {
        console.log(files);
        this.setState({ iconFile: files[0] });
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
     * @returns {boolean} ユーザー情報の更新に成功したかどうか？
     */
    async requestUpdate() {
        const formData = new FormData();
        formData.append('name', this.state.name);
        formData.append('email', this.state.email);

        //リクエストボディ
        const requestBody = {
            name: this.state.name,
            email: this.state.email,
        };

        //アップロードするアイコン画像は存在するか？
        if (this.state.iconFile) {
            formData.append('icon', this.state.iconFile);
            //requestBody.icon = this.state.iconFile;
        }

        //console.log(...formData.entries());

        //{ headers: { Authorization: `Bearer ${userStore.token}` } }
        try {
            //ヘッダーを設定
            axios.defaults.headers.common = {
                'X-HTTP-Method-Override': 'PUT',
                Authorization: `Bearer ${userStore.token}`
            };
            //通信開始
            await (await axios.post(_URL + `/user/${userStore.userStatus.userId}`,
                formData));
        } catch (error) {
            console.log(error.response);

            //エラーステータスは422か？(バリデーションエラー)
            if (error.response.status === 422) {
                //エラーメッセージを格納
                const errorMessagesCopy = Object.assign({}, this.state.errorMessages);

                const errorMessages = error.response.data.error;
                errorMessagesCopy.email = errorMessages.email;
                errorMessagesCopy.icon = errorMessages.icon;

                this.setState({ errorMessages: errorMessagesCopy });
                return false;
            }

            //エラーステータスは401か？(トークンの期限切れ)
            if (error.response.status === 401) {
                console.log('Expired token');
                this.setState({ redirectTo: '/logout' });
                return false;
            }

            alert('サーバー側でエラーが発生しました');
            return false;
        }

        return true;
    }

    /**
     * 新しいユーザー情報をuserStoreに登録する
     * @returns {boolean} 新しいユーザー情報をuserStoreに登録したか？
     */
    async setNewUserStatus() {
        //ユーザーの情報
        let userData;
        try {
            //ユーザー情報取得
            userData = await (await axios.get(_URL + '/me',
                { headers: { Authorization: `Bearer ${userStore.token}` } })).data;
        } catch (error) {
            console.log(error.response);

            //エラーステータスは401か？(トークンの期限切れ)
            if (error.response.status === 401) {
                console.log('Expired token');
                this.setState({ redirectTo: '/logout' });
                return false;
            }

            return false;
        }

        //userStoreにセットするユーザー情報
        const setUserStoreData = {
            nowLogin: userStore.nowLogin,
            token: userStore.token,
            userId: userData.id,
            name: userData.name,
            email: userData.email,
            icon: userData.icon
        }

        actions.register(setUserStoreData);

        //console.log(userStore.userStatus);
        //console.log(userStore.nowLogin);
        //console.log(userStore.token);

        return true;
    }

    async doSubmit() {
        //バリデーションは問題なかったか？
        if (this.doValidation()) {
            return;
        }

        //更新はできたか？ && 新しいユーザー情報をuserStoreに登録したか？
        if (await this.requestUpdate() && this.setNewUserStatus()) {
            this.setState({ redirectTo: '/' });
            return;
        }
    }

    render() {
        //リダイレクトするか？
        if (this.state.redirectTo) {
            //ログアウトの場合
            if (this.state.redirectTo === '/logout') {
                return (<Logout goTo="/login" />);
            }

            return (<Redirect to={this.state.redirectTo} />);
        }

        return (
            <Container>
                <Row>
                    <Col md={{ span: 6, offset: 3 }}>
                        <h1>ユーザー情報更新</h1>
                        <Form>
                            <InputText className="name" label="名前" type="text"
                                placeholder="名前を入力" outPutErrotMeaagages={this.state.errorMessages.name}
                                setValue={this.setName} value={this.state.name} />
                            <InputText className="email" label="メールアドレス" type="email"
                                placeholder="メールアドレスを入力" outPutErrotMeaagages={this.state.errorMessages.email}
                                setValue={this.setEmail} value={this.state.email} />
                            <InputImage className="icon" label="アイコン画像"
                                outPutErrotMeaagages={this.state.errorMessages.icon}
                                setValue={this.setIcon} image={this.state.iconURL} />
                            <Button variant="primary" onClick={this.doSubmit}>登録</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        )
    }
}
