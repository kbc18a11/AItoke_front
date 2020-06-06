import React, { Component } from 'react'
import { Button, Form, FormControl, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { _URL } from '../apiURL/AITalk_outApiCall_and_Auth';

export default class MyMessageForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            //送信するメッセージの内容
            message: '',
        }

        this.doChange_message = this.doChange_message.bind(this);
        this.validation = this.validation.bind(this);
        this.doGetNobyAPI = this.doGetNobyAPI.bind(this);
    }

    /**
     * バリデーション
     * 妥当性に問題が無ければ、false
     */
    validation() {
        const errorList = [];//エラーメッセージのリスト

        //送信するメッセージは、空文字列か？
        if (!this.state.message) {
            errorList.push('メッセージがありません。')
        }

        //エラーメッセージは存在するか？
        if (errorList.length > 0) {
            alert(errorList);
            return true;
        }


        return false;
    }


    /**
     * messageの値の変更を受け付ける
     * @param {*} e 
     */
    doChange_message(e) {
        this.setState({ message: e.target.value });
    }
    /**
     * APIとの通信
     * @param {*} e 
     */
    doGetNobyAPI(e) {
        //バリデーションの検証
        if (this.validation()) return;

        //リクエストするデータ
        const data = new URLSearchParams();
        data.set('text', this.state.message);

        fetch(_URL + 'talkText' + data.toString,
            {
                method: 'GET',
                headers: { "Content-Type": "application/json; charset=utf-8" },
            })
            .then((res) => {
                console.log(res);
            })
            .catch((error) => {
                console.log(error);
            })
    }




    render() {
        const marginStyle = {
            margin: '1px'
        }


        return (
            <Container>
                <Form>
                    <Row>
                        <Col xs={12} md={6}><FormControl type="text" style={marginStyle} value={this.state.message}
                            placeholder="メッセージを入力してください"
                            className="" onChange={this.doChange_message} /></Col>
                        <Col xs={6} md={3}><Button variant="primary" block className="">自分の声で喋る</Button></Col>
                        <Col xs={6} md={3}><Button variant="primary" block className="" onClick={this.doGetNobyAPI}>メッセージを届ける</Button></Col>
                    </Row>
                </Form>
            </Container>

        )
    }
}
