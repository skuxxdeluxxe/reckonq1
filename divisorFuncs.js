const _ = require('lodash');

const range = (rangeInfo) => [...Array(rangeInfo.upper + 1).keys()].map(i => i + rangeInfo.lower);
  
const calculateResult = (number, divisorData) => {
    var result = _.chain(divisorData.outputDetails)
                    .map((divisor) => (number % divisor.divisor) ? '' : divisor.output)
                    .join('')
                    .value();
    return { 'number':number, 'result': result };
}

const getResult = (rangeInfo, divisorInfo) => _.chain(range(rangeInfo))
                                                .map((number) => calculateResult(number, divisorInfo))
                                                .map((divided) => `${divided.number}: ${divided.result}`)
                                                .join('<br/>')
                                                .value();


module.exports = {
    range: range,
    calculateResult: calculateResult,
    getResult: getResult
}