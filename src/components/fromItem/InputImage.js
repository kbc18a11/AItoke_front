import React, { Component } from 'react'
import { Form, Image } from 'react-bootstrap';
import '../../css/errorText.css';
import '../../css/inputImage.css';


export default class InputImage extends Component {
    constructor(props) {
        super(props);

        let outPutErrotMeaagages = [];
        //props.outPutErrotMeaagagesは存在しているか？
        if (props.outPutErrotMeaagages) {
            outPutErrotMeaagages = props.outPutErrotMeaagages
        }

        this.state = {
            image: this.props.image,//画像
            label: props.label,//Form.Labelの表示文字
            outPutErrotMeaagages: outPutErrotMeaagages,//表示するバリデーションエラーメッセージ
            setValue: props.setValue,//親のプロパティに対するセッター
        }

        this.changePreview = this.changePreview.bind(this);
    }

    componentWillReceiveProps(nextProps) {

        //新しいエラーメッセージの存在はしているか？
        if (nextProps.outPutErrotMeaagages && nextProps.outPutErrotMeaagages.length) {
            this.setState({ outPutErrotMeaagages: nextProps.outPutErrotMeaagages });
            return;
        }


        if (this.state.image === 'https://aitoke.s3-ap-northeast-1.amazonaws.com/' && nextProps.image) {
            this.setState({ image: nextProps.image });
            return;
        }

        this.setState({ outPutErrotMeaagages: [] });
    }

    /**
     * 画像のプレビューを変更
     * @param {Event} e 
     */
    changePreview(e) {
        const createObjectURL = (window.URL || window.webkitURL).createObjectURL || window.createObjectURL;

        //アップロードされた画像のURLを取得
        const imageURL = createObjectURL(e.target.files[0]);
        //プレビュー用の画像URLをセット
        this.setState({ image: imageURL });

        //親に画像を送信する
        this.state.setValue(e.target.files);
    }

    render() {

        return (
            <Form.Group>
                <Form.Label>{this.state.label}</Form.Label>
                <div>
                    <Image className='imageFile' src={this.state.image} thumbnail />
                    <input type="file" onChange={this.changePreview} />
                </div>
                <Form.Text className="error">{this.state.outPutErrotMeaagages.toString()}</Form.Text>
            </Form.Group>
        )
    }
}
