
const express  = require('express');
const path = require('path');
const User = require('./Schemas/Users');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const upload = multer();

const router = express.Router();

router.get('/signup',(req,res)=>{
res.sendFile(path.join(__dirname,'./public','contactact.html'));
});

router.patch('/send' , upload.none(),async(req,res)=>{

      const {naming,id,message,pass} = req.body;
   console.log(naming , req.body.naming); 
try{
    
    const user = await User.create({

          name:naming,      
          emailid:id,
         password:pass
          });

 const token =await jwt.sign({id:user._id} , 'secrettokeniusedforjsonwebtokendontcopyit' ,{expiresIn:24*24*(60*60)});

   res.cookie('jwt',token,{

   expires :new Date(Date.now() + 24*24*(60*60)),
   //secure : true,
  // httpOnly : true

   });
console.log(res);

res.json({

status:"success"

});

}
 catch(error){
console.log(error);
 }

});


module.exports = router;




