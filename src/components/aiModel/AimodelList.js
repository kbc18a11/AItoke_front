import React, { Component } from 'react'
import { Form, Button, Container, Row, Col, Image } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import PagenationList from './PagenationList';
import { _APIURL } from '../../apiURL/AITalk_outApiCall_and_Auth';

export default class AimodelList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentPage: 1,//現在のページネーションのページ数
            fristPage: 1,//ページネーション最初のページ数
            lastPage: 1,//ページネーションの最後のページ数
            aimodelListData: []//リストデータの一覧
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
    }

    async getaimodelListData() {
        const responceData =
            await (await axios.get(_APIURL + `/aimodel?page=${this.state.currentPage}`)).data;

        this.setState({ lastPage: responceData.last_page });
        this.setState({ aimodelListData: responceData.data });
    }

    createAimodelListItems() {
        this.state.aimodelListData.forEach(element => {
            
        });
    }

    componentDidMount() {
        this.getaimodelListData();
    }

    render() {
        return (
            <div>
                <PagenationList currentPage={this.state.currentPage}
                    fristPage={this.state.fristPage} lastPage={this.state.lastPage}
                    setParentValue={this.setCurrentPage} />
            </div>
        )
    }
}
