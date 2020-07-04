import Validator from 'validatorjs';

export default class ValidationManager {
    constructor() {
        //バリデーションエラーの存在
        this.isError = false;
    }

    

    /**
         * バリデーションチェック
         * @param {string} targetKey //バリデーション対象の値の名前
         * @param {string} targetValue //バリデーションの値
         * @param {string} rule //バリデーションのルール
         * @param {number} errorMessagesNumber //エラーメッセージを格納させる対象配列の添え字
         */
    checkValidation(targetData, rules, errorMessagesNumber) {
        //console.log({ [targetKey]: targetValue });
        //console.log(rules);
        //バリデーションを検証
        const validation = new Validator(
            targetData,
            { [targetKey]: rules },
            this.state.ruleTypeErrorMessages
        );
        //console.log(validation.fails(), targetValue);

        //バリデーションエラーはあるか？
        if (validation.fails()) {
            console.log(validation.errors.all());

            //配列をコピーして、エラーメッセージを格納
            const errorMessages_copy = this.state.errorMessages.slice();
            errorMessages_copy[errorMessagesNumber] = validation.errors.all()[targetKey];

            this.setState({ errorMessages: errorMessages_copy });

            console.log(this.state.errorMessages);

            return false;
        }

        //バリデーションエラーはなかった
        return true;
    }
}