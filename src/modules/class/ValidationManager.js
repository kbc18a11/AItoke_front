import Validator from 'validatorjs';

export default class ValidationManager {
    constructor() {
        //バリデーションの結果
        this.isError = false;
    }



    /**
         * バリデーションチェック
         * @param {object} targetData //バリデーションの値
         * @param {object} rule //バリデーションのルール
         * @param {object} ruleTypeErrorMessages //エラーの種類ごとのエラーのメッセージ
         */
    checkValidation(targetData, rules, ruleTypeErrorMessages) {
        //バリデーションを検証
        const validation = new Validator(
            targetData,
            rules,
            ruleTypeErrorMessages
        );

        //バリデーションの結果
        this.isError = validation.fails();
        //バリデーションエラーはあるか？
        if (this.isError) {
            //エラーを返す
            return validation.errors.all();
        }

        //バリデーションエラーはなかった
        return {};
    }
}