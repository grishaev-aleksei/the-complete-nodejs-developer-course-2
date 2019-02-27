const saveUser = (user) => {
    console.log('user =',user)
};

const save = (user, callback) => {
    console.log(user);
    callback('some value')
};

module.exports = {
    saveUser,
    save
};