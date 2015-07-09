var mongoose = require('mongoose');

/***
 * @name resumeModel
 * @type {*|Model}
 */
var resumeModel = mongoose.model('resume',{
    nameOfFile:{
        type:String
    },
    email:{
        type:String,
        validate:[validateEmail ,'bad email address detected']
    },
    phone:{
        type:Number,
        trim: true,
        validate:[validateNumber, 'bad phone number detected']
    }
});

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

module.exports = resumeModel;