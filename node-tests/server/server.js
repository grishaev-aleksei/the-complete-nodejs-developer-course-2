const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.status(404).send({
        error: 'page not found',
        name: 'to do app v1.0'
    })
});

app.get('/users', (req, res) => {
    res.status(200).send([
        {
            name: 'Andrew',
            age: 25
        },
        {
            name: 'Aleksei',
            age: 28
        }
    ])
});

app.listen(3000, () => {
    console.log(`listening on port = 3000 ...`)
});


module.exports.app = app;