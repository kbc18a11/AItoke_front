import React, { Component } from 'react'
import { Table, Button, Form, FormControl, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/talkingLog.css'

export default class TalkingLog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            //会話のログを表す配列
            logList: []
        }
    }

    addList(log) {
        this.state.logList.push(log);
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps.log);

        //ログの内容が空白文字やundifindじゃないか？
        if (nextProps.log.who || nextProps.log.text) {
            //送られてきた新しいセリフを末尾に追加
            this.addList(nextProps.log);
        }
    }

    getTime() {
        //現在の時間を取得
        const time = new Date();
        
        //表示させる時間をフォーマット化
        return `${time.getHours()} : ${time.getMinutes()} : ${time.getSeconds()}` 
    }

    render() {
        //ログのTableタグの行を展開
        const log = this.state.logList.map((log) =>
            <tr>
                <td>{log.who}</td>
                <td>{log.text}</td>
                <td>{this.getTime()}</td>
            </tr>
        );

        return (
            <div id="talkingLog">
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>名前</th>
                            <th>セリフ</th>
                            <th>時間</th>
                        </tr>
                    </thead>
                    {log}
                </Table>
            </div>
        );
    }
}
