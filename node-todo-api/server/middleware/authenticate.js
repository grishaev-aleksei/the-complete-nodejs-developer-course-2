const {user} = require('./../models/user');

const authenticate = (req, res, next) => {
    const token = req.header('x-auth');

    user.findByToken(token)
        .then(user => {
            if (!user) {
                return Promise.reject()
            }
            req.user = user;
            req.token = token;
            next();
        })
        .catch(() => res.status(401).end('olololo, not allowed'))
};

module.exports = {authenticate};