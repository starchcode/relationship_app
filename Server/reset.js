const reset = require('express').Router();
const dbReset = require('./reset_dB');


reset.get('/', (req, res)=> {
    dbReset();
    res.send('db reset');
})

module.exports = reset;