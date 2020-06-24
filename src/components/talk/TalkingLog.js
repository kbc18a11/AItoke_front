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

    /**
     * ログリストの末尾に新しいログを入れる
     * @param {*} log 
     */
    addList(log) {
        //console.log(log);
        //ログのリストの要素が１以上 && 末尾のテキストと新しいログのテキストが一緒か？
        if (this.state.logList.length > 0
            && this.state.logList[this.state.logList.length - 1].text === log.text) {
            return;
        }

        this.state.logList.push(log);
    }

    componentWillReceiveProps(nextProps) {
        //ログの内容が空白文字やundifindじゃないか？
        if (nextProps.log.who || nextProps.log.text) {
            //送られてきた新しいセリフを末尾に追加
            this.addList(nextProps.log);
        }
    }

    /**
     * '時:分:秒'を返す
     */
    getTime() {
        //現在の時間を取得
        const time = new Date();

        //表示させる時間をフォーマット化
        return `${time.getHours()} : ${time.getMinutes()} : ${time.getSeconds()}`;
    }

    render() {
        //console.log(this.state.logList);

        //ログのTableタグの行を展開
        const log = this.state.logList.map((log) =>
            <tr>
                <td className="who">{log.who}</td>
                <td>{log.text}</td>
                <td>{this.getTime()}</td>
            </tr>
        );

        return (
            <div id="talkingLog">
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th className="who">名前</th>
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
