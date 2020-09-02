import React, { Component } from 'react';
import {
	Button,
	ButtonProps,
	Container,
	Form,
	FormControl,
	Row,
	Col,
	Modal,
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import RecordingButton from './RecordingButton';

interface Props {}
interface State {
	show: boolean; //モーダルウィンドウを表示させるかさせないか？
	recordedText: string; //マイクから出力されたしたテキスト
	webkitSpeechRecognition: any; //音声認識のインスタンス
}

export default class SpeechRecordingModal extends Component<Props, State> {
	state = {
		show: false,
		recordedText: '',
		webkitSpeechRecognition: Window['webkitSpeechRecognition'],
	};

	constructor(props: Props) {
		super(props);

		//音声認識した時の実行内容を定義
		this.state.webkitSpeechRecognition.onresult = (event): void => {
			console.log(event.results[0][0].transcript);
			this.setState({ recordedText: event.results[0][0].transcript });
		};
		//認識する言語を設定
		this.state.webkitSpeechRecognition.lang = 'ja-JP';

		this.modalOpne = this.modalOpne.bind(this);
		this.modalClose = this.modalClose.bind(this);
		this.resetRecordedText = this.resetRecordedText.bind(this);
	}

	/**
	 * モーダルウィンドウを開く
	 * @returns {void}
	 */
	modalOpne(): void {
		this.setState({ show: true });
	}

	/**
	 * モーダルウィンドウを閉じる
	 * @returns {void}
	 */
	modalClose(): void {
		this.setState({ show: false });
	}

	startRecording() {
		console.log('start');
		this.state.webkitSpeechRecognition.start();
	}

	stopRecording() {
		console.log('stop');
		this.state.webkitSpeechRecognition.stop();
	}

	/**
	 * 音声入力された内容をリセットする
	 */
	resetRecordedText(): void {
		this.setState({ recordedText: '' });
	}

	render() {
		return (
			<div>
				<Button variant='primary' block className='' onClick={this.modalOpne}>
					自分の声で喋る
				</Button>
				<Container>
					<Modal show={this.state.show} onHide={this.modalClose}>
						<Modal.Header closeButton>
							<h1>音声入力</h1>
							<p>※マイクを有効にして下さい</p>
						</Modal.Header>
						<Modal.Body>{this.state.recordedText}</Modal.Body>
						<Modal.Footer>
							<Button variant='secondary' onClick={this.modalClose}>
								閉じる
							</Button>
							<Button
								variant='outline-primary'
								onClick={this.resetRecordedText}
							>
								リセット
							</Button>
							<RecordingButton
								startEvent={this.startRecording}
								stopEvent={this.stopRecording}
							/>
						</Modal.Footer>
					</Modal>
				</Container>
			</div>
		);
	}
}
