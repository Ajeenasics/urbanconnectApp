require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const db = require('./dbConnection')
const app = express()
const cors = require('cors')
// const basPath='http://localhost:3000/quick_click'
// const basPath='

const path = require('path')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(`${__dirname}/upload`));

app.use(cors());
const route = require('./routes')
app.use('/quick_click_api', route)

app.listen(process.env.PORT || 4053
    , () => {
        console.log(`Server created successfully at ${process.env.PORT || 4053}`);
    })