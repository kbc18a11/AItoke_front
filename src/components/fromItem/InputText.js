import React, { Component } from 'react'
import { Form } from 'react-bootstrap';
import '../../css/errorText.css';

export default class InputText extends Component {
    constructor(props) {
        super(props);

        let outPutErrotMeaagages = [];
        //props.outPutErrotMeaagagesは存在しているか？
        if (props.outPutErrotMeaagages) {
            outPutErrotMeaagages = props.outPutErrotMeaagages
        }

        this.state = {
            label: props.label,//Form.Labelの表示文字
            type: props.type,//Form.Control type
            placeholder: props.placeholder,//Form.Control placeholder
            outPutErrotMeaagages: outPutErrotMeaagages,//表示するバリデーションエラーメッセージ
            setValue: props.setValue,//親のプロパティに対するセッター
        }

    }

    componentWillReceiveProps(nextProps) {
        //nextProps.outPutErrotMeaagagesは存在しているか？
        if (nextProps.outPutErrotMeaagages) {
            this.setState({ outPutErrotMeaagages: nextProps.outPutErrotMeaagages });
            return;
        }

        this.setState({ outPutErrotMeaagages: [] });
    }

    render() {
        return (
            <Form.Group>
                <Form.Label>{this.state.label}</Form.Label>
                <Form.Control type={this.state.type} placeholder={this.state.placeholder}
                    onChange={this.state.setValue} value={this.props.value} />
                <Form.Text className="error">{this.state.outPutErrotMeaagages.toString()}</Form.Text>
            </Form.Group>
        )
    }
}
