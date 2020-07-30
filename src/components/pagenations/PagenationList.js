import React, { Component } from 'react'
import { Pagination } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


export default class PagenationList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentPage: props.currentPage,//現在のページネーションのページ数
            fristPage: props.fristPage,//ページネーション最初のページ数
            lastPage: props.lastPage,//ページネーションの最後のページ数
            setParentValue: props.setParentValue//ページ変更時の親の動作
        };

        this.changePage = this.changePage.bind(this);
    }

    /**
     * ページチェンジのイベント
     * @param {Event} e 
     */
    changePage(e) {
        const nextPage = Number(e.target.textContent);

        //現在の開いているページを変更する
        this.setState({ currentPage: nextPage });
        //親にも変更を知らせる
        this.state.setParentValue(nextPage);
    }

    /**
     * lastPageの分だけページネーションアイテムを返す
     * @returns{JSX.Element[]}
     */
    createPaginationItems() {
        const paginationItems = [];

        //ページネーションアイテムの生成
        for (var i = 1; i <= this.state.lastPage; i++) {
            paginationItems.push(
                <Pagination.Item
                    active={i === this.state.currentPage}
                    onClick={this.changePage} >
                    {i}
                </Pagination.Item >
            );
        }

        return paginationItems;
    }

    componentWillReceiveProps(nextProps) {
        //lastPageの変更はあったか？
        if (nextProps.lastPage) {
            this.setState({ lastPage: nextProps.lastPage })
        }
    }

    render() {
        return (
            <Pagination>
                {this.createPaginationItems()}
            </Pagination>
        )
    }
}
