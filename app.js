const express = require('express');
const bodyParser = require('body-parser')
const multer = require('multer');
var fs = require('fs');

const uploadsDir = './uploads';

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (!fs.existsSync(uploadsDir)){
            fs.mkdirSync(uploadsDir);
        }
        cb(null, uploadsDir)
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname)
    }
});


const filesParser = multer({ storage }).any();
const jsonParser = bodyParser.json();


const app = express();
const port = 3000;

let requests = 0;

const CONTENT_TYPE_MULTIPART_FORM_DATA = 'multipart/form-data';
const CONTENT_TYPE_JSON = 'application/json';

app.use((req, res, next) => {
    // console.log(req);
    const serverTimestamp = new Date();
    requests += 1;
    console.log(`requests: ${requests}`);
    // next();

    const contentType = req.headers['content-type'];
    console.log(contentType);

    // console.log(`Content type: ${contentType}`);
    if(!contentType){
        res.send('OK!')
    }else if(contentType.indexOf(CONTENT_TYPE_MULTIPART_FORM_DATA)>-1){
        filesParser(req, res, function (err) {
            if (err) {
                // A Multer error occurred when uploading.
                // An unknown error occurred when uploading.
                console.error(err);
                res.status(500);
                res.send('Error');
            }else{
                jsonData = req.body['json']
                // console.log(jsonData)
                const event = JSON.parse(jsonData);
                const eventTimestamp = event['data']['timestamp']

                console.log(`Event Timestamp: ${eventTimestamp}`)
                console.log(`Server Timestamp: ${serverTimestamp}`)

                console.log('---------------------');
                

                res.send('OK!')
            }
         });
    }else{
        jsonParser(req, res, function(){
            console.log(JSON.stringify(req.body));
            res.send('OK!')
        });
    }
});


// app.get('/', (req, res) => {
//     res.send('Hello World!')
// });


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});
