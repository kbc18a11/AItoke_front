import React, { Component } from 'react';
import {
	Navbar,
	Nav,
	NavDropdown,
	Form,
	FormControl,
	Button,
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

interface Props {}
interface State {
	serchWord: string[]; //検索文字
}

export default class AimodelSerchber extends Component<Props, State> {
	state = {
		serchWord: [],
	};

	constructor(props: Props) {
		super(props);

		this.doSubmit = this.doSubmit.bind(this);
		this.setSerchWord = this.setSerchWord.bind(this);
	}

	/**
	 * 検索文字をセットさせる
	 * @param {React.ChangeEvent<HTMLInputElement>} e
	 * @returns {void}
	 */
	setSerchWord(e: React.ChangeEvent<HTMLInputElement>): void {
		//検索文字を区切るルール
		const splitRule: RegExp = /\s+/; //１文字以上の連続した空白

		this.setState({ serchWord: e.target.value.split(splitRule) });
	}

	/**
	 *　テキストに対して、Enterキーを押したときのイベントを無効か
	 * @param e
	 */
	doSubmit(e: any) {
		e.preventDefault();
	}

	render() {
		return (
			<Form inline onSubmit={this.doSubmit}>
				<FormControl
					type='text'
					placeholder='AIモデルを検索'
					className='mr-sm-2'
					onChange={this.setSerchWord}
				/>
				<Button
					href={`/aimodel/serch/${this.state.serchWord}`}
					variant='outline-light'
				>
					検索
				</Button>
			</Form>
		);
	}
}
