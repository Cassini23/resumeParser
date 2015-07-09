var router = require('express').Router();
var multer = require('multer');
var fs = require('fs');
var path = require('path');
var final = [];

var read_from_path = "./uploads/txt/";

var resumeModel = require('../models/resume');


/*Check files in directory initially*/
//fileChecked(lists.initial);
//console.log(lists.initial);

router.get('/', function (req, res) {
    res.send('upload');
});


router.post('/', function (req, res) {
    var dataObj;
    fs.exists(read_from_path, function (exists) {
        if(exists){
            fs.readdir(read_from_path, function(err, files){
                if(files.length > 0){
                    files.forEach(function(item){
                        fs.readFile(read_from_path + item, 'utf8', function (err,data) {
                            if (err) {
                                console.log(err);
                            }
                            else{
                                var dataCollection = [];
                                for(var i =0; i<500; i++ ){
                                    dataCollection.push(data[i]);
                                }
                                var rset = dataCollection.join('');
                                dataObj = {
                                    nameOfFile: item,
                                    email: validateEmail(rset),
                                    phone:validateNumber(rset)
                                };
                                new resumeModel(dataObj).save(function(err, results){
                                    if(err) res.status(500).json(err);
                                    else {
                                        res.status(200).json(results);

                                    }
                                });
                            }
                        });
                    });

                }
            });
        }
    });

});


/**
 * @function diff
 * @param a
 * @returns {Array.<T>}
 */
Array.prototype.diff = function(a) {
    return this.filter(function(i) {return a.indexOf(i) < 0;});
};
/*
function fileChecked(){
    fs.exists(read_from_path, function (exists) {
        if(exists){
            fs.readdir(read_from_path, function(err, files){
                if(files.length > 0){
                    return files;

                }
                else{
                    return [];
                }
            })
        }
    });
}

function parseMe(fileList){
    console.log('Parsing.....', fileList);

}
*/
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
    var re = /([a-zA-Z0-9.]+@[a-zA-Z0-9.]+\.[a-zA-Z0-9._-]+)/gi;
    return  email.match(re);
};



/*var validateEmail = function(email){
    var re = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
    return  re.test(email);
};
*/

module.exports = router;