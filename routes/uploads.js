var router = require('express').Router();
var multer = require('multer');
var fs = require('fs');
var path = require('path');
var pdfUtil = require('pdf-to-text');
var pdf_path = "./uploads/pdf/";
var saveTo = "./uploads/txt/";
router.use(multer({
    dest: './uploads/pdf/'

}));

router.get('/', function (req, res) {
    res.send('upload');
});

router.get('/all', function (req, res) {
    res.send('upload');
});


router.post('/', function (req, res) {
    var orig_Filename, txt_Filename;
    //console.log(req.files);
    for(var prop in req.files){
        orig_Filename = '';
        txt_Filename= '';
        var key = req.files[prop];
        for(var subprop in key){
            if(subprop === 'name'){
                orig_Filename = (key[subprop]);
                //console.log(pdf_path+orig_Filename);
                txt_Filename = orig_Filename.substr(0,orig_Filename.indexOf('.')) + '.txt';

                pdfUtil.pdfToText(pdf_path+orig_Filename, function(err, data) {
                    if (err) throw(err);
                    fs.writeFile(saveTo+txt_Filename, data, function (err) {
                        if (err) return console.log(err);
                        console.log('success');
                        res.status(200).json({messaged:'uploaded'});
                    });
                });
            }

        }

    }

    /*
    pdfUtil.info(pdf_path, function(err, info) {
        if (err) throw(err);
        console.log(info);
    });
    */
    /*
    pdfUtil.pdfToText(pdf_path, function(err, data) {
        if (err) throw(err);
        fs.writeFile(saveTo+'helloworld.txt', data, function (err) {
            if (err) return console.log(err);
            console.log('success');
        });
    });*/

    //res.status(200).json({messaged:'uploaded'});
});

module.exports = router;