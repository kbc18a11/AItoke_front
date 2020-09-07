import React, { Component } from 'react';
import { Button, ButtonProps } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import userStore from '../../flux/user/UserStore';
import { actions } from '../../flux/user/userActions';
import axios from 'axios';
import { _APIURL } from '../../apiURL/AITalk_outApiCall_and_Auth';

interface Props {
	aimodel_id: number;
}
interface State {
	buttonText: string; //ボタンのテキスト
	variant: string; //ボタンの装飾タイプ
	favorite_id: number; //お気に入り登録情報のid
	nowlogin: boolean; //現在のログインの状態
	buttonDisabled: boolean; //ボタンの無効か有効かの状態
	buttonClickEvent: () => Promise<void>; //ボタンクリック時のイベント
}

//ボタンテキストの種類
const buttonTextPattern: { [key: string]: string } = {
	notregistered: 'お気に入り登録', //お気に入り登録してない（初期状態）
	registered: 'お気に入りを解除', //お気に入り登録済み
	notLogin: 'ログインしていいねしよう', //ログインしてない
};

//ボタンの装飾の種類
const variantPattern: { [key: string]: string } = {
	registerFavoriteButton: 'primary',
	removeFavoriteButton: 'outline-danger',
};

export default class FavoriteAimodelButton extends Component<Props, State> {
	state = {
		buttonText: buttonTextPattern.notregistered,
		variant: variantPattern.registerFavoriteButton,
		favorite_id: 0,
		nowlogin: userStore.nowLogin,
		buttonDisabled: false,
		buttonClickEvent: this.registerFavorite.bind(this),
	};

	/**
	 * ログインの状態をログアウトに変更
	 * @returns {void}
	 */
	doLogout(): void {
		//ログアウトを実行
		actions.logout();
		//ログアウトの状態を変更
		this.setState({ nowlogin: false });
	}

	/**
	 * ログインしてない場合のボタンの状態を変更
	 * @returns {void}
	 */
	setNotLoginButtonState(): void {
		//空のメソッドをセット
		this.setState({ buttonClickEvent: async (): Promise<void> => {} });
		//ボタンのテキストを変更
		this.setState({ buttonText: buttonTextPattern.notLogin });
		//ボタンを無効な状態にする
		this.setState({ buttonDisabled: true });
	}

	/**
	 * お気に入り登録を実行
	 * @returns {Promise<void>}
	 */
	async registerFavorite(): Promise<void> {
		//ヘッダーを設定
		axios.defaults.headers.common = {
			Authorization: `Bearer ${userStore.token}`,
		};

		try {
			//通信開始
			const resultData = await (
				await axios.post(_APIURL + `/aimodel/${this.props.aimodel_id}/favorite`)
			).data;

			//お気に入り登録情報のidをセット
			this.setState({ favorite_id: resultData.favoriteData.id });
			//ボタンのテキストを変更
			this.setState({ buttonText: buttonTextPattern.registered });
			//ボタンの装飾を変更
			this.setState({ variant: variantPattern.removeFavoriteButton });
			//お気に入り解除のメソッドをセット
			this.setState({ buttonClickEvent: this.removeFavorite.bind(this) });
		} catch (error) {
			console.log(error.response);

			//エラーステータスは401か？(未ログイン,トークンの期限切れ)
			if (error.response.status === 401) {
				this.doLogout();
			}
		}
	}

	/**
	 * お気に入り解除を実行
	 * @returns {Promise<void>}
	 */
	async removeFavorite(): Promise<void> {
		//ヘッダーを設定
		axios.defaults.headers.common = {
			Authorization: `Bearer ${userStore.token}`,
		};

		try {
			//通信開始
			await (
				await axios.delete(
					_APIURL + `/aimodel/favorite/${this.state.favorite_id}`
				)
			).data;

			//お気に入り登録情報のidを初期化
			this.setState({ favorite_id: 0 });
			//ボタンのテキストを変更
			this.setState({ buttonText: buttonTextPattern.notregistered });
			//ボタンの装飾を変更
			this.setState({ variant: variantPattern.registerFavoriteButton });
			//お気に入り解除のメソッドをセット
			this.setState({ buttonClickEvent: this.registerFavorite.bind(this) });
		} catch (error) {
			console.log(error.response);

			//エラーステータスは401か？(未ログイン,トークンの期限切れ)
			if (error.response.status === 401) {
				this.doLogout();
			}
		}
	}

	/**
	 *　お気に入り登録情報を取得
	 * @returns {Promise<void>}
	 */
	async setFavoriteState(): Promise<void> {
		//ヘッダーを設定
		axios.defaults.headers.common = {
			Authorization: `Bearer ${userStore.token}`,
		};

		try {
			//通信開始
			const resultData = await (
				await axios.get(
					_APIURL + `/aimodel/${this.props.aimodel_id}/favorite/user/`
				)
			).data;

			//お気に入り登録されていたか？
			if (resultData.favoriteData) {
				//お気に入り登録情報のidをセット
				this.setState({ favorite_id: resultData.favoriteData.id });
				//ボタンのテキストを変更
				this.setState({ buttonText: buttonTextPattern.registered });
				//ボタンの装飾を変更
				this.setState({ variant: variantPattern.removeFavoriteButton });
				//お気に入り解除のメソッドをセット
				this.setState({ buttonClickEvent: this.removeFavorite.bind(this) });
				return;
			}
		} catch (error) {
			console.log(error.response);

			//エラーステータスは401か？(未ログイン,トークンの期限切れ)
			if (error.response.status === 401) {
				this.doLogout();
			}
		}
	}

	componentDidMount() {
		//ログイン中か？
		if (userStore.nowLogin) {
			this.setFavoriteState();
			return;
		}

		//ログインしてない場合
		this.setNotLoginButtonState();
	}

	render() {
		return (
			<Button
				onClick={this.state.buttonClickEvent}
				variant={this.state.variant as ButtonProps['variant']}
				disabled={this.state.buttonDisabled}
			>
				{this.state.buttonText}
			</Button>
		);
	}
}
