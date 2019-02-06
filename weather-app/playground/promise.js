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
