const express = require('express');

const fs = require("fs");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const rateLimit = require("express-rate-limit");
const cors = require("cors");
// require("dotenv").config();
const app = express();
app.use(cors(), bodyParser.json())
const PORT = process.env.PORT || 4000;

app.use(morgan('dev'));


const data = require('./data');
app.use('/data', data);

const reset = require('./reset');
app.use('/reset', reset);

const add = require('./add');
app.use('/add', add);

const edit = require('./edit');
app.use('/edit', edit);

const search = require('./search');
app.use('/search', search)

app.listen(PORT, ()=> {
    console.log(`Server is listening on port ${PORT}`);
})