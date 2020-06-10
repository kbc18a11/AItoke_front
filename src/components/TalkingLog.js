import React, { Component } from 'react'

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
        //送られてきた新しいセリフを末尾に追加
        this.addList(nextProps.log);
    }

    render() {
        const log = this.state.logList.map((log) => <p>{log.who}:{log.text}</p>);

        return (
            <div>
                {log}
            </div>
        )
    }
}
