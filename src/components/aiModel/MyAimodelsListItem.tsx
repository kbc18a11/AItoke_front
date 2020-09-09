import React, { Component } from 'react';
import { ListGroup, Media, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/inputImage.css';
import '../../css/linkCharacter.css';
import { Link } from 'react-router-dom';
import DeleteAimodelButton from './DeleteAimodelButton';

interface Props {
	id: number; //AIモデルのid
	name: string; //AIモデルの名前
	close_mouth_image: string; //画像のリンク
	linkTo: string; //Linkの指定先
	deleteButtonEvent: Function; //削除ボタンを押したときの親に対するイベント
}

export default class MyAimodelsListItem extends Component<Props> {
	constructor(props: Props) {
		super(props);
		this.handleDeleteButton = this.handleDeleteButton.bind(this);
	}

	/**
	 * 削除ボタンを押したときのイベント
	 * @returns {void}
	 */
	handleDeleteButton(): void {
		this.props.deleteButtonEvent(this.props.id);
	}

	render() {
		return (
			<ListGroup.Item as='li'>
				<Media>
					<Link to={this.props.linkTo}>
						<img
							width={64}
							height={64}
							className='imageFile'
							src={this.props.close_mouth_image}
							alt='Generic placeholder'
						/>
					</Link>
					<Media.Body className='text-left'>
						<Link className='linkCharacter' to={this.props.linkTo}>
							<h3>{this.props.name}</h3>
						</Link>
						<Link to={'/register'}>
							<Button>編集</Button>
						</Link>
						&nbsp;
						<DeleteAimodelButton
							ai_model_id={this.props.id}
							clickParentEvent={this.handleDeleteButton}
						/>
					</Media.Body>
				</Media>
			</ListGroup.Item>
		);
	}
}
