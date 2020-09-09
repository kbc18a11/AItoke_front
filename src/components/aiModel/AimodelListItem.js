import React, { Component } from 'react'
import { ListGroup, Media } from 'react-bootstrap';
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
            linkTo: props.linkTo//Linkの指定先
        }
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

        //リンク先の変更はあったか？
        if (nextProps.linkTo) {
            this.setState({ linkTo: nextProps.linkTo });
        }
    }

    render() {
        return (
            <ListGroup.Item as="li">
                <Media>
                    <Link to={this.state.linkTo}>
                        <img
                            width={64} height={64}
                            className="imageFile"
                            src={this.state.close_mouth_image}
                            alt="Generic placeholder" />
                    </Link>
                    <Media.Body className="text-left">
                        <Link className="linkCharacter" to={this.state.linkTo}><h3>{this.state.name}</h3></Link>
                    </Media.Body>
                </Media>
            </ListGroup.Item>
        )
    }
}
