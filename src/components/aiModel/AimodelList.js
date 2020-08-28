import React, { Component } from 'react'
import { ListGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import PagenationList from '../pagenations/PagenationList';
import AimodelListItem from './AimodelListItem';
import { _S3URL } from '../../apiURL/s3';
import userStore from '../../flux/user/UserStore';
import { actions } from '../../flux/user/userActions';

export default class AimodelList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentPage: 1,//現在のページネーションのページ数
            fristPage: 1,//ページネーション最初のページ数
            lastPage: 1,//ページネーションの最後のページ数
            aimodelListData: [],//リストデータの一覧
            user_id: props.user_id,//対象のユーザーid
            getaimodelListDataUri: props.getaimodelListDataUri,//データを取得するURL
            listItemUrl: props.listItemUrl,//リストアイテムのリンク先
            requestErrorAfterDoing: props.requestErrorAfterDoing//データが習得できずにエラーが発生した後に行うメソッド
        };

        this.setCurrentPage = this.setCurrentPage.bind(this);
    }

    /**
     * 現在見ているページを変更
     * @param {number} nextPage
     */
    setCurrentPage(nextPage) {
        //ページネーションのDOMのテキストを値にセット
        this.setState({ currentPage: nextPage });

        this.getaimodelListData(nextPage);
    }

    /**
     * AIモデルの一覧情報を取得する
     * @param {number} page 
     */
    async getaimodelListData(page = this.state.currentPage) {
        //ユーザーidの指定はあるか？
        const _URI = this.state.user_id ?
            //ユーザーidを指定
            `${this.state.getaimodelListDataUri + page}&user_id=${this.state.user_id}`
            //全てを取得
            : this.state.getaimodelListDataUri + page;

        console.log(_URI);

        //ログインはしているか？
        if (userStore.nowLogin) {
            //ヘッダーを設定
            axios.defaults.headers.common = {
                Authorization: `Bearer ${userStore.token}`,
            };
        }

        try {
            const responceData =
                await (await axios.get(_URI)).data;
            this.setState({ lastPage: responceData.last_page });
            this.setState({ aimodelListData: responceData.data });
        } catch (error) {
            console.log(error.response);

            //エラーステータスは401か？(未ログイン,トークンの期限切れ)
            if (error.response.status === 401) {
                //ログアウトを実行
                actions.logout();
                if (this.state.requestErrorAfterDoing) {
                    this.state.requestErrorAfterDoing();
                }
                this.setState({ nowLogin: false });
            }
        }

    }

    /**
     * AIモデルのリストアイテムを生成
     * @returns{JSX.Element[]}
     */
    createAimodelListItems() {
        return this.state.aimodelListData.map((params) => {
            return (<AimodelListItem name={params.name}
                close_mouth_image={_S3URL + params.close_mouth_image}
                linkTo={this.state.listItemUrl + params.id} />);
        });
    }

    componentDidMount() {
        //AIモデルの一覧情報を取得
        this.getaimodelListData();
    }

    render() {
        return (
            <div>
                <ListGroup as="ul">
                    {this.createAimodelListItems()}
                </ListGroup>
                <PagenationList currentPage={this.state.currentPage}
                    fristPage={this.state.fristPage} lastPage={this.state.lastPage}
                    setParentValue={this.setCurrentPage} />
            </div>
        )
    }
}
