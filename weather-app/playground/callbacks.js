const getUser = (id, callback) => {
    const user = {
        id: id,
        name: 'Vikram'
    };
    setTimeout(() => {
        callback(user)
    }, 3000)
};

getUser(5, (user) => {
    console.log(user)
});