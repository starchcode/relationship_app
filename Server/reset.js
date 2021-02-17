const reset = require('express').Router();
const DbReset = require('./modules and classes/DbReset');


reset.get('/', (req, res)=> {
    DbReset();
    res.send('db reset done!');
})

module.exports = reset;