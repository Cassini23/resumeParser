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
        type:String
        //validate:[validateEmail ,'bad email address detected']
    },
    phone:{
        type:String
                //validate:[validateNumber, 'bad phone number detected']
    }
});

module.exports = resumeModel;