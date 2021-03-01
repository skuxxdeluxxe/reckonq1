const express = require("express");
const axios = require('axios').default;
const axiosRetry = require('axios-retry');
const Promise = require("bluebird");
const app = express();
const divisorFuncs = require('./divisorFuncs.js');
const port = 9999;

axiosRetry(axios, { retries: 3 });

app.get("/", (req, res) => {
  Promise.all([
    axios.get('https://join.reckon.com/test1/rangeInfo'),
    axios.get('https://join.reckon.com/test1/divisorInfo')
  ])
  .spread((rangeInfo, divisorInfo) => { res.send(divisorFuncs.getResult(rangeInfo.data, divisorInfo.data)) });
});


app.listen(port, function() {
  console.log(`Server listening on port ${port}`);
});