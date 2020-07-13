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

export default class userUpdate extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: userStore.userStatus.name,
            email: userStore.userStatus.email,
            icon: 'https://aitoke.s3-ap-northeast-1.amazonaws.com/' + userStore.userStatus.icon,
            //fromの項目ごとのバリデーションルール
            rules: {
                name: 'required|max:255',
                email: 'required|email|max:255',
                icon: 'required|image'
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
                min: '8文字以上入力してください',
                email: 'メールアドレスを入力してください',
                image: '画像を選択してください'
            },
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
        this.setState({ icon: files[0] });
    }

    doSubmit() {

    }

    render() {
        console.log(this.state.icon);
        
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
                                outPutErrotMeaagages={this.state.errorMessages.email}
                                setValue={this.setIcon} image={this.state.icon} />
                            <Button variant="primary" onClick={this.doSubmit}>登録</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        )
    }
}
