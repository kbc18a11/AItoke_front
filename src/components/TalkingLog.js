import React, { Component } from 'react'

export default class TalkingLog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            //会話のログを表す配列
            logList: []
        }
    }

    addList(text) {
        this.state.logList.push(text);
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
        //送られてきた新しいセリフを末尾に追加
        this.addList(nextProps.text);
    }

    render() {

        const log = this.state.logList.map((text) => <p>{text}</p>);

        return (
            <div>
                {log}
            </div>
        )
    }
}
