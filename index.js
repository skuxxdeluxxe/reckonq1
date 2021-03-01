const express = require("express");
const axios = require('axios').default;
const axiosRetry = require('axios-retry');
const Promise = require("bluebird");
const app = express();
const _ = require('lodash');
const divisorFuncs = require('./divisorFuncs.js');
const port = 9999;

axiosRetry(axios, { retries: 3 });

app.get("/", (req, res) => {
  Promise.all([
    axios.get('https://join.reckon.com/test1/rangeInfo'),
    axios.get('https://join.reckon.com/test1/divisorInfo')
  ])
  .spread((rangeInfo, divisorInfo) => {
    console.log(rangeInfo.data);
    console.log(divisorInfo.data);
  
    const numbers = divisorFuncs.range(rangeInfo.data);

    var result = _.chain(numbers)
                    .map((number) => divisorFuncs.calculateResult(number, divisorInfo.data))
                    .map((divided) => `${divided.number}: ${divided.result}`)
                    .join('<br/>')
                    .value();
    res.send(result);
  })
});


app.listen(port, function() {
  console.log(`Server listening on port ${port}`);
});