const express = require('express');
const app = express();
const cors = require('cors');

const data_model = require('./data_model')

const port = 5000;

app.use(cors());


app.get('/', (req, res) => {
    data_model.getData().then(response => {
        res.status(200).send(response);
    })
    .catch(error => {
        res.status(500).send(error);
    })
})


// var server = 
app.listen(port, function () {
    console.log(`Server is running on Port: ${port}`);
});