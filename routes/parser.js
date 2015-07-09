var router = require('express').Router();
var multer = require('multer');
var fs = require('fs');
var path = require('path');
var initial = [] , final = [];
//var pdfUtil = require('pdf-to-text');
var pdf_path = "./uploads/pdf/";
var read_from_path = "./uploads/txt/";

/*Check files in directory initially*/
fileChecked(initial);

router.get('/', function (req, res) {
    res.send('upload');
});


router.post('/', function (req, res) {

    fileChecked(final);
    console.log('after post', final.diff(initial));

    parseMe(final.diff(initial));

    res.send('parse');
});


/**
 * @function diff
 * @param a
 * @returns {Array.<T>}
 */
Array.prototype.diff = function(a) {
    return this.filter(function(i) {return a.indexOf(i) < 0;});
};

function fileChecked(fileList){
    fileList = [];
    fs.exists(read_from_path, function (exists) {
        if(exists){
          //  console.log('Aye it exists!');
            fs.readdir(read_from_path, function(err, files){
                if(files.length > 0){
   //                 console.log(files);
            //        console.log('There are files downloaded');
                    fileList = files;
                    return fileList;
                }
                else{
     //               console.log('directory '+read_from_path + ' is empty');
                    return [];
                }
            })
        }
    });
}

function parseMe(fileList){
    console.log('Parsing.....', fileList);
    fileList.forEach(function(item){

        fs.readFile(read_from_path + item, 'utf8', function (err,data) {
            if (err) {
                return console.log(err);
            }
            console.log('done deal ',data);
        });
    });
}

/***
 * @function validateNumber
 * @param phoneNumber
 * @returns {boolean}
 */
var validateNumber = function(phoneNumber){
    //var re1 = /^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$/;
    var re2 = /^(\([0-9]{3}\)|[0-9]{3}-)[0-9]{3}-[0-9]{4}$/;
    var re3 = /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/;
    return (re2.test(phoneNumber) || re3.test(phoneNumber));
};

/***
 * @function validateEmail
 * @param email
 * @returns {boolean}
 */
var validateEmail = function(email){
    var re = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
    return  re.test(email);
};


module.exports = router;