const expect = require('chai').expect
const divisorFuncs = require('../divisorFuncs');

describe('Divisor Functions', () => {
    describe('Range', () => {
        let range = { upper: 5, lower: 0 };

        it('should return a an array with a range of numbers', () => {
            expect(divisorFuncs.range(range)).to.eql([1,2,3,4]);
        });
    });

    describe('Calculate Result', () => {
        let outputText = 'Peppa'
        let outputText2 = 'Pig'
        let number = 3;
        describe('when the number is divisible by the divisor it returns the output text', () => {
            let divisor = { 'outputDetails': [ { 'divisor': 3, 'output': outputText } ] };
            let result = { 'number': number, result: outputText};
            it('should return an object with the number and divisor output text', () => {
                expect(divisorFuncs.calculateResult(number, divisor)).to.eql(result);
            });
        });

        describe('when the number is NOT divisible by the divisor it DOES NOT returns the output text', () => {
            let divisor = { 'outputDetails': [ { 'divisor': 2, 'output': outputText } ] };
            let result = { 'number': number, result: '' };
            it('should return an object with the number and divisor output text', () => {
                expect(divisorFuncs.calculateResult(number, divisor)).to.eql(result);
            });
        });

        describe('when the number is divisible by MORE than 1 divisor it returns the output text for only the divisble', () => {
            let divisor = { 'outputDetails': [ { 'divisor': 3, 'output': outputText }, { 'divisor': 5, 'output': outputText2 } ] };
            let number = 15;
            let result = { 'number': number, result: 'PeppaPig' };
            it('should return an object with the number and divisor output text', () => {
                expect(divisorFuncs.calculateResult(number, divisor)).to.eql(result);
            });
        });
    });

    describe('Get Result', () => {
        let outputText = 'Peppa'
        let outputText2 = 'Pig'
        let number = 3;
        describe('when given range and divisor information', () => {
            let range = { upper: 5, lower: 0 };
            let divisor = { 'outputDetails': [ { 'divisor': 3, 'output': outputText } ] };
            it('should return html text with the divisor result', () => {
                expect(divisorFuncs.getResult(range, divisor)).to.equal('1: <br/>2: <br/>3: Peppa<br/>4: ');
            });
        });
    });
});