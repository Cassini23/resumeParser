document.addEventListener('DOMContentLoaded',function(){
    var box = document.querySelector('.drop-box');
    //console.log(box);
    box.addEventListener('dragenter',function(event){

    });
    box.addEventListener('dragleave',function(event){

    });
    box.addEventListener('dragover',function(event){
        if (event.preventDefault) event.preventDefault();
        if (event.stopPropagation) event.stopPropagation();
       // console.log('drag over event');

    });
    /***
     *
     */
    box.addEventListener('drop',function(event){
        //send files to backend
        if (event.preventDefault) event.preventDefault();
        console.log('Dropped!!!');

//        console.log(event.dataTransfer.files);
        var files = Array.prototype.slice.call(event.dataTransfer.files);
  //      console.log(files[0].name);
        var formdata = new FormData();

        files.forEach(function (file, index){
            /*get the pdf files alone*/
            if(file.type === 'application/pdf'){
                formdata.append('file' + index, file);
            }
        });
        makeAJAXCall('post', '/uploads',formdata);
    });
});

/***
 * @function
 * @name makeAJAXCall
 * @param HTTPVerb
 * @param url
 * @param data
 */
function makeAJAXCall(HTTPVerb, url, data){

    var xhr = new XMLHttpRequest();
    //xhr.open('post', '/uploads');
    xhr.open(HTTPVerb, url);
    xhr.addEventListener('readystatechange',function(){
        if(xhr.readyState === 4){
            console.log('Getting a response');
        }
    });
    xhr.send(data);
}

