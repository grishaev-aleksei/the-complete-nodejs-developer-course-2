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
            res.send(user);
        })
        .catch(() => res.status(401).end())
};

module.exports = {authenticate};