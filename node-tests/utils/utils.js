module.exports.add = (a, b) => a + b;

module.exports.asyncAdd = (a, b, callback) => {
    setTimeout(() => {
        callback(a + b)
    }, 500)

};

module.exports.promiseAdd = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(a + b)
        }, 500);

    })
};

module.exports.square = (a) => a * a;

module.exports.asyncSquare = (a) => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(a * a)
        }, 500)
    })
};

module.exports.setName = (user, fullName) => {
    const names = fullName.split(' ');
    user.firstName = names[0];
    user.lastName = names[1];
    return user
};