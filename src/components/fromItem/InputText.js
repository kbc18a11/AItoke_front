import React, { Component } from 'react'
import { Form } from 'react-bootstrap';
import '../../css/errorText.css';

export default class InputText extends Component {
    constructor(props) {
        super(props);

        this.state = {
            label: props.label,//Form.Labelの表示文字
            type: props.type,//Form.Control type
            placeholder: props.placeholder,//Form.Control placeholder
            outPutErrotMeaagages: props.outPutErrotMeaagages,//表示するバリデーションエラーメッセージ
            rules: props.rules,//バリデーションルール
            setValue: props.setValue,//親のプロパティに対するセッター
        }

    }

    componentWillReceiveProps(nextProps) {
        this.setState({ outPutErrotMeaagages: nextProps.outPutErrotMeaagages });
    }

    render() {
        return (
            <Form.Group>
                <Form.Label>{this.state.label}</Form.Label>
                <Form.Control type={this.state.type} placeholder={this.state.placeholder} onChange={this.state.setValue} />
                <Form.Text className="error">{this.state.outPutErrotMeaagages}</Form.Text>
            </Form.Group>
        )
    }
}
