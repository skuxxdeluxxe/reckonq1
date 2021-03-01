const express = require("express");
const axios = require('axios').default;
const axiosRetry = require('axios-retry');
const Promise = require("bluebird");
const app = express();
const _ = require('lodash');
const port = 9999;

axiosRetry(axios, { retries: 3 });

function range(rangeInfo) { 
  return [...Array(rangeInfo.upper - 1).keys()].map(i => i + rangeInfo.lower + 1); 
}

function calculateResult(number, divisorData) {
  var divisors = divisorData.outputDetails;
  var finalDiviserResult = {};
  var result = _.chain(divisors)
                  .map((divisor) => (number % divisor.divisor) ? '' : divisor.output)
                  .join('')
                  .value();
  finalDiviserResult['number'] = number;
  finalDiviserResult['result'] = result;
  return finalDiviserResult;
}

app.get("/", (req, res) => {
  Promise.all([
    axios.get('https://join.reckon.com/test1/rangeInfo'),
    axios.get('https://join.reckon.com/test1/divisorInfo')
  ])
  .spread((rangeInfo, divisorInfo) => {
    console.log(rangeInfo.data);
    console.log(divisorInfo.data);
  
    const numbers = range(rangeInfo.data);
    
    var result = _.chain(numbers)
                    .map((number) => calculateResult(number, divisorInfo.data))
                    .map((divided) => `${divided.number}: ${divided.result}`)
                    .join('<br/>')
                    .value();
    res.send(result);
  })
});


app.listen(port, function() {
  console.log(`Server listening on port ${port}`);
});