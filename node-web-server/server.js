const express = require('express');
const pug = require('pug');

const app = express();

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.render('home', {
        name: 'Aleksei',
        likes: [
            'smoke',
            'drink',
            'sex'
        ],
    })
});

app.get('/help', (req, res) => {
    res.sendFile(__dirname + '/public/help.html')
});

app.get('/about', (req, res) => {
        res.render('about', {
            title: 'about title',
            message: 'about body',
        })
    }
);

app.get('/bad', (req, res) => {
        res.send('Error')
    }
);

app.listen(3000, () => {
    console.log('listening on port 3000')
});
