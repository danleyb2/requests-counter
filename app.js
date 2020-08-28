const express = require('express');
const app = express();
const port = 3000;

let requests = 0;


app.use((req, res, next) => {
    // console.log(req);
    requests += 1;
    console.log(`requests: ${requests}`);
    // next();
    res.send('Hello World!')
});


// app.get('/', (req, res) => {
//     res.send('Hello World!')
// });


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});
