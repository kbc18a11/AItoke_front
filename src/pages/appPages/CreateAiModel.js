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
            opne_mouth_image: null,
            close_mouth_image: null,

            errorMessages: {
                name: '',
                self_introduction: '',
                opne_mouth_image: null,
                close_mouth_image: null
            },

        }

        this.setName = this.setName.bind(this);
        this.setSelf_introduction = this.setSelf_introduction.bind(this);
        this.setOpne_mouth_image = this.setOpne_mouth_image.bind(this);
        this.setClose_mouth_image = this.setClose_mouth_image.bind(this);
        this.doSubmit = this.doSubmit.bind(this);
    }

    setName(e) {
        this.setState({ name: e.target.value });
    }

    setSelf_introduction(e) {
        this.setState({ self_introduction: e.target.value });
    }

    setOpne_mouth_image(file) {
        this.setState({ opne_mouth_image: file[0] });
    }

    setClose_mouth_image(file) {
        this.setState({ close_mouth_image: file[0] });
    }

    doSubmit() {

    }

    render() {
        return (
            <Container>
                <Col md={{ span: 6, offset: 3 }}>
                    <h1>AIキャラクター新規登録</h1>
                    <Form>
                        <InputText className="name" label="キャラクターネーム" type="text"
                            placeholder="名前を入力" outPutErrotMeaagages={this.state.errorMessages.name}
                            setValue={this.setName} value={this.state.name} />
                        <Textarea className="self_introduction" label="自己紹介文" type="text"
                            placeholder="自己紹介を入力" outPutErrotMeaagages={this.state.errorMessages.name}
                            setValue={this.setSelf_introduction} value={this.state.self_introduction} />
                        <InputImage className="opne_mouth_image" label="口を開けた画像"
                            outPutErrotMeaagages={this.state.errorMessages.name}
                            setValue={this.setOpne_mouth_image} />
                        <InputImage className="close_mouth_image" label="口を閉じた画像"
                            outPutErrotMeaagages={this.state.errorMessages.name}
                            setValue={this.setClose_mouth_image} />
                        <Button variant="primary" onClick={this.doSubmit}>登録</Button>
                    </Form>
                </Col>
            </Container>
        )
    }
}
