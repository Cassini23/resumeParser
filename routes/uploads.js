var router = require('express').Router();
var multer = require('multer');
var readline = require('readline');

router.use(multer({
    dest: './uploads/pdf/'

}));

router.get('/', function (req, res) {
    res.send('upload');
});

router.post('/', function (req, res) {

var pdfList = [];
    console.log('In post');
    var content = '';
    process.stdin.resume();
    process.stdin.on('data', function(buf) { content += buf.toString(); });
    process.stdin.on('end', function() {
        // your code here
        console.log(content.split('').reverse().join(''));
    });
    res.send('upload');
});

module.exports = router;