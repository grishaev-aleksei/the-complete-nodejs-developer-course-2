const asyncAdd = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (typeof a === 'number' && typeof b === 'number') {
                resolve(a + b)
            } else reject('arguments must be numbers')
        }, 1500)
    })
};


asyncAdd('3', 6)
    .then((result) => {
        console.log(result);
        return 'success'
    })
    .then((secondRes) => {
        console.log(secondRes)
    })
    .catch(err => {
        err += ', it was an error';
        throw (err)
    })
    .catch((secondLevelError) => {
        console.log(secondLevelError)
    });

const somePromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        if (1 === 1) resolve('resolved');
        else reject('rejected')
    }, 2500);
});

somePromise.then((result) => {
    console.log('result:', result)
}).catch((result) => {
    console.log('result:', result)
});
