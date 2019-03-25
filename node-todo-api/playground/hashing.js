const bcrypt = require('bcryptjs');

const password = '123abc!';

// bcrypt.genSalt(10, function (err, salt) {
//     bcrypt.hash(password, salt, function (err, hash) {
//         console.log(hash)
//         // Store hash in your password DB.
//     });
// });

const hashedPassword = '$2a$10$D0.WmZqX1NEao8g1oDRooOjh4uk0V3zTFRCwzZHB/z30fkxw.lFU.';

bcrypt.compare(password, hashedPassword, (err, res) => {
    console.log(res)
});


// const crypto = require("crypto");
//
// function sha256(data) {
//     return crypto.createHash("sha256").update(data).digest("hex");
// }
//
// const jwt = require('jsonwebtoken');
//
// const data = {
//     id: 10
// };
//
// const token = jwt.sign(data, 'abc123').toString();
//
// const decoded = jwt.verify(token, 'abc123');
//
// console.log(token);


// const data = {
//     id: 4
// };
//
// const token = {
//     data,
//     hash: sha256(JSON.stringify(data)+'some secret here')
// };
//
// token.data.id = 5;
// token.hash = sha256(JSON.stringify(token.data));
//
// const resultHash = sha256(JSON.stringify(token.data)+'some secret here');
//
// if (token.hash === resultHash) {
//     console.log('Data was not changed')
// } else {
//     console.log('Data was changed. Dont trust')
// }

