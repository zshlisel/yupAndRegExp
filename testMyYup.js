import assert from 'assert'

const ourYup = {
    validations: [],
    string: function () {
        this.validations.push('string')
        return this;
    },
    number: function () {
        this.validations.push('number')
        return this;
    },
    length: function (n) {
        this.validations.push({ validation: 'length', length: n })
        return this;
    },
    validate: function (str) {
        for (const validation of this.validations) {
            if (validation === 'string' || validation === 'number') {
                assert(typeof str === validation)
            }
            if (typeof validation === 'object') {
                assert(str.length === validation.length)
            }
        }
        return this;
    }
}

ourYup.string().length(5).validate('abfgctr')




const myChecker = {
    arrToBeChecked: [],
    regExpArr: [],
    check: function (input) {
        this.arrToBeChecked.push(input)
        return this;
    },
    match: function (regExp, message) {
        this.regExpArr.push({ regExp: regExp, message: message })
        return this;
    },
    email: function() {
        this.regExpArr.push({ regExp: /^[\w]+@[\w]+\.[\w]{3,}/, message: 'Is a valid Email'})
        return this;
    },
    phone: function() {
        this.regExpArr.push({ regExp: /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/, message: 'Is a valid Phone number'})
        return this;
    },
    url: function() {
        this.regExpArr.push({ regExp: /^(http:\/\/)?(www\.)?[\w-]+\.(org|com|net)(\/[^\s]*)?$/i, message: 'Is a valid URL'})
        return this;
    },
    run: function () {
        const checked = {}
        for (const each of this.arrToBeChecked) {
            checked[each] = [];
            this.regExpArr.forEach(eachExp => {
                if (eachExp.regExp.test(each)) {
                    checked[each].push(eachExp.message)
                }
            });
        }
        return checked;
    }

};

const result = myChecker
    .check("abc")
    .check("abcd")
    .check("123")
    .check("347-585-9865")
    .check(" ")
    .check("a@b.abc")
    .match(/^[a-z]{3}$/, "three letter word")
    .match(/^[a-z0-9]/, "starts with a letter or number")
    .email()
    .phone()
    .run()

console.log(result)

const result2 = myChecker
    .check("http://www.tr.com")
    .check("www.trt.com")
    .check("trd.com")
    .url()
    .run()

console.log(result2)