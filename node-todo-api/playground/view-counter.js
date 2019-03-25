const cookieSession = require('cookie-session');
const express = require('express');

const app = express();

app.set('trust proxy', 1) // trust first proxy

app.use(cookieSession({
    name: 'ekekekekek',
    keys: 'very secret'
}))

app.get('/', function (req, res, next) {
    // Update views
    req.session.views = (req.session.views || 0) + 1

    // Write response
    res.end(req.session.views + ' views')
})

app.listen(3000)