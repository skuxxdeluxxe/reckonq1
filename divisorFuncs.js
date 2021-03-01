const _ = require('lodash');

const range = (rangeInfo) => { return [...Array(rangeInfo.upper - 1).keys()].map(i => i + rangeInfo.lower + 1) };
  
const calculateResult = (number, divisorData) => {
    var divisors = divisorData.outputDetails;
    var result = _.chain(divisors)
                    .map((divisor) => (number % divisor.divisor) ? '' : divisor.output)
                    .join('')
                    .value();
    return { 'number':number, 'result': result };
}

const getResult = (rangeInfo, divisorInfo) => {
    const numbers = range(rangeInfo);
    return  _.chain(numbers)
                .map((number) => calculateResult(number, divisorInfo))
                .map((divided) => `${divided.number}: ${divided.result}`)
                .join('<br/>')
                .value();
}

module.exports = {
    range: range,
    calculateResult: calculateResult,
    getResult: getResult
}