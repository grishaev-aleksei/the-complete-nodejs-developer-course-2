const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
        unique: true,
        validate: {
            validator: (value) => {
                return validator.isEmail(value)
            },
            message: props => `${props.value} is not a valid email!`
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
});

userSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();

    return _.pick(userObject, ['_id', 'email'])
};

userSchema.methods.generateAuthToken = function () {
    const user = this;
    const access = 'auth';
    const token = jwt.sign({_id: user._id.toString(), access}, process.env.JWT_SECRET).toString();

    user.tokens = user.tokens.concat([{access, token}]);
    return user.save()
        .then(() => {
            return token
        })
};

userSchema.methods.removeToken = function (token) {
    const user = this;

    return user.updateOne({
        $pull: {
            tokens: {
                token
            }
        }
    })
};

userSchema.statics.findByToken = function (token) {
    const user = this;
    let decoded;

    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (e) {
        return Promise.reject()
    }
    return user.findOne({
        '_id': decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'
    })
};

userSchema.statics.findByCredentials = function (email, password) {
    const user = this;

    return user.findOne({email})
        .then(resUser => {
            if (!resUser) return Promise.reject('user not found');
            return new Promise((resolve, reject) => {
                bcrypt.compare(password, resUser.password, (err, success) => {
                    if (err || !success) reject('bad password');
                    else resolve(resUser);
                })
            })
        })
        .catch(err => {
            throw err
        })

};

userSchema.pre('save', function (next) {
    const user = this;

    if (user.isModified('password')) {
        bcrypt.hash(user.password, 10, function (err, hash) {
            user.password = hash;
            next()
            // Store hash in your password DB.
        });
    } else {
        next();
    }
});

const user = mongoose.model('user', userSchema);

module.exports = {user};