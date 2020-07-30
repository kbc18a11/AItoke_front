import React, { Component } from 'react'
import { ListGroup, Media, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/inputImage.css';
import '../../css/linkCharacter.css';
import { Link } from 'react-router-dom';

export default class AimodelListItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: props.name,
            //AIモデルの画像
            close_mouth_image: props.close_mouth_image,
            //自己紹介文
            self_introduction:
                //自己紹介文は存在しているか？
                props.self_introduction ?
                    this.substrSelf_introduction(String(props.self_introduction)) : ''
        }
    }

    /**
     * 変数MAX_LENGTHより大きい自己紹介文をMAX_LENGTH以下にする
     * MAX_LENGTH以下の引数はそのまま返す
     * @param {string} self_introduction 
     * @returns {string} カットされた文字
     */
    substrSelf_introduction(self_introduction) {
        //最大文字数
        const MAX_LENGTH = 60;
        //指定改行数よりも多く改行してる場合、指定改行数以下の文章にする
        const afterSelf_introduction =
            this.cutTextLine(self_introduction);

        //自己紹介文は15文字より大きいか？
        if (afterSelf_introduction.length > MAX_LENGTH) {
            return afterSelf_introduction.substr(0, MAX_LENGTH) + '...';
        }
        return afterSelf_introduction;
    }

    /**
     * MAX_LINEより大きい改行文をMAX_LINE以下にする
     * MAX_LINE以下の場合は、そのまま返す
     * @param {string} text 
     */
    cutTextLine(text) {
        //最大文字数
        const MAX_LINE = 2;
        //改行ごとの配列
        const textLineArray = text.split('\n');

        if (textLineArray.length > MAX_LINE) {
            //2行にした後の空テキスト
            let afterText = new String();

            //MAX_LINE以下までの改行文を代入する
            for (var i = 0; i < MAX_LINE; i++) {
                afterText += textLineArray[i] + '\n';
            }
            return afterText;
        }

        return text;
    }

    componentWillReceiveProps(nextProps) {
        //nameの変更はあったか？
        if (nextProps.name) {
            this.setState({ name: nextProps.name });
        }

        //画像の変更はあったか？
        if (nextProps.close_mouth_image) {
            this.setState({ close_mouth_image: nextProps.close_mouth_image });
        }
    }

    render() {
        const self_introductionStyle = { whiteSpace: 'pre-line' };

        return (
            <ListGroup.Item as="li">
                <Media>
                    <Link to="/">
                        <img
                            width={64} height={64}
                            className="imageFile"
                            src={this.state.close_mouth_image}
                            alt="Generic placeholder" />
                    </Link>
                    <Media.Body className="text-left">
                        <Link className="linkCharacter" to="/"><h3>{this.state.name}</h3></Link>
                        <Link className="linkCharacter" to="/">
                            <p style={self_introductionStyle}>{this.state.self_introduction}</p>
                        </Link>
                    </Media.Body>
                </Media>
            </ListGroup.Item>
        )
    }
}
