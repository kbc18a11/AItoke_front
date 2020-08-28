import React, { Component } from 'react';
import AimodelList from '../../components/aiModel/AimodelList';
import { _APIURL } from '../../apiURL/AITalk_outApiCall_and_Auth';
import axios from 'axios';
import userStore from '../../flux/user/UserStore';
import { actions } from '../../flux/user/userActions';
import { Redirect } from 'react-router-dom';

interface Props {}
interface State {
	nowLogin: boolean; //ログインの状態
}

export default class FavoriteAiModel extends Component<Props, State> {
	state = {
		nowLogin: userStore.nowLogin,
	};

	constructor(props: Props) {
		super(props);

		this.tokenWasInvalid = this.tokenWasInvalid.bind(this);
	}

	/**
	 * トークンが無効だった場合ログアウト処理を実行
	 */
	tokenWasInvalid() {
		actions.logout();
		this.setState({ nowLogin: false });
	}

	render() {
		//ログインしていなかったか？
		if (!this.state.nowLogin) {
			return <Redirect to={'/login'} />;
		}

		return (
			<div>
				<AimodelList
					getaimodelListDataUri={_APIURL + '/favorite?page='}
					listItemUrl='/aimode/'
					requestErrorAfterDoing={this.tokenWasInvalid}
				/>
			</div>
		);
	}
}
