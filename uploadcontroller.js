const multer = require('multer');
const fs = require('fs');


var multerstorage = multer.diskStorage({
destination:(req,file,cb)=>{
console.log(file);
    if(file.mimetype.split('/')[0] == 'image'){
        cb(null,'public/images');

    }else {
        cb(null,'public/audios');

    }
},
filename:(req,file,cb)=>{

const extension = file.mimetype.split('/')[1];

    cb(null,`myimage.${extension}`);
}

});

const upload = multer({storage:multerstorage});

exports.uploadimage = upload.fields([

{name:'photo',maxCount:1},
{name:'audio',maxCount:1}

])

exports.savefilename = async(req,res)=>{

console.log(req.files);


res.json({
status:'success'

})


}

// TO DO

// image resizing
// stripe full
// aggregation pipeline
// exceptional handling