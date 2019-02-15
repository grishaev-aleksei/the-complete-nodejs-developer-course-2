const express = require('express');

const app = express();

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    // res.send('<h2>Hello Express');
    res.send({
        name: 'Aleksei',
        likes: [
            'smoke',
            'drink',
            'sex'
        ]
    })
});

app.get('/help', (req,res) => {
    res.sendFile(__dirname + '/public/help.html')
});

app.get('/about', (req, res) => {
        res.send('About Page')
    }
);

app.get('/bad', (req, res) => {
        res.send('Error')
    }
);

app.listen(3000, () => {
    console.log('listening on port 3000')
});