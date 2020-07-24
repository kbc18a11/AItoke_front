import React, { Component } from 'react'
import { Form, Button, Container, Row, Col, Image } from 'react-bootstrap';
import InputText from '../../components/fromItem/InputText';
import InputImage from '../../components/fromItem/InputImage';
import Textarea from '../../components/fromItem/Textarea';
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

export default class CreateAiModel extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            self_introduction: '',
            open_mouth_image: null,
            close_mouth_image: null,

            //項目ごとのバリエーションルール
            rules: {
                name: 'required|max:255',
                self_introduction: 'max:255',
                open_mouth_image: 'required',
                close_mouth_image: 'required'
            },

            //項目ごとのエラーメッセージ
            errorMessages: {
                name: [],
                self_introduction: [],
                open_mouth_image: [],
                close_mouth_image: []
            },

            //バリデーションルールごとのエラーメッセージ
            ruleTypeErrorMessages: {
                required: '必須項目です',
                max: '255文字以下入力してください',
            },

            //リダイレクト先
            //ログインしていたら、初期状態ではリダイレクトしない
            redirectTo: userStore.nowLogin ? '' : '/login',
        }

        this.setName = this.setName.bind(this);
        this.setSelf_introduction = this.setSelf_introduction.bind(this);
        this.setopen_mouth_image = this.setopen_mouth_image.bind(this);
        this.setClose_mouth_image = this.setClose_mouth_image.bind(this);
        this.doSubmit = this.doSubmit.bind(this);
    }

    setName(e) {
        this.setState({ name: e.target.value });
    }

    setSelf_introduction(e) {
        this.setState({ self_introduction: e.target.value });
    }

    setopen_mouth_image(file) {
        this.setState({ open_mouth_image: file[0] });
    }

    setClose_mouth_image(file) {
        this.setState({ close_mouth_image: file[0] });
    }

    /**
     * バリデーションの実行
     * @returns {boolean} バリエーションエラーの存在
     */
    doValidation() {
        //setState用にthis.state.errorMessagesをコピー
        let errorMessagesCopy = Object.assign({}, this.state.errorMessages);

        const validationManager = new ValidationManager();

        //checkValidationデータの対象
        const targetData = {
            name: this.state.name,
            self_introduction: this.state.self_introduction,
            open_mouth_image: this.state.open_mouth_image,
            close_mouth_image: this.state.close_mouth_image
        };
        //新しいエラーを返す
        errorMessagesCopy = validationManager.checkValidation(targetData, this.state.rules,
            this.state.ruleTypeErrorMessages);

        //新しいエラーに変更
        this.setState({ errorMessages: errorMessagesCopy });

        //最終的にエラーがあったか？
        return validationManager.isError;
    }

    async requestCreate() {
        //リクエストボディの構築
        const formData = new FormData();
        formData.append('name', this.state.name);
        formData.append('self_introduction', this.state.self_introduction);
        formData.append('open_mouth_image', this.state.open_mouth_image);
        formData.append('close_mouth_image', this.state.close_mouth_image);

        try {
            //ヘッダーを設定
            axios.defaults.headers.common = {
                Authorization: `Bearer ${userStore.token}`
            };
            //通信開始
            await (await axios.post(_URL + '/aimodel',
                formData));
            
            return true;
        } catch (error) {
            console.log(error.response);

            //エラーステータスは422か？(バリデーションエラー)
            if (error.response.status === 422) {
                //エラーメッセージを格納
                this.setState({ errorMessages: error.response.data.error });
                return false;
            }


            //エラーステータスは401か？(未ログイン,トークンの期限切れ)
            if (error.response.status === 401) {
                //エラーメッセージを格納
                this.setState({ redirectTo: '/logout' });
                return false;
            }
        }
    }


    doSubmit() {
        //バリエーションに問題があったか？
        if (this.doValidation()) {
            return
        }

        this.requestCreate();
    }

    render() {
        //リダイレクトするか？
        if (this.state.redirectTo) {
            return (<Redirect to={this.state.redirectTo} />);
        }

        return (
            <Container>
                <Col md={{ span: 6, offset: 3 }}>
                    <h1>AIキャラクター新規登録</h1>
                    <Form>
                        <InputText className="name" label="キャラクターネーム" type="text"
                            placeholder="名前を入力" outPutErrotMeaagages={this.state.errorMessages.name}
                            setValue={this.setName} value={this.state.name} />
                        <Textarea className="self_introduction" label="自己紹介文" type="text"
                            placeholder="自己紹介を入力" outPutErrotMeaagages={this.state.errorMessages.self_introduction}
                            setValue={this.setSelf_introduction} value={this.state.self_introduction} />
                        <InputImage className="open_mouth_image" label="口を開けた画像"
                            outPutErrotMeaagages={this.state.errorMessages.open_mouth_image}
                            setValue={this.setopen_mouth_image} />
                        <InputImage className="close_mouth_image" label="口を閉じた画像"
                            outPutErrotMeaagages={this.state.errorMessages.close_mouth_image}
                            setValue={this.setClose_mouth_image} />
                        <Button variant="primary" onClick={this.doSubmit}>登録</Button>
                    </Form>
                </Col>
            </Container>
        )
    }
}
