const express = require("express");
const path = require('path');
const User = require('./Schemas/Users');
const emailmodule = require('./email');

const router = express.Router();


router
.route('/')
.get((req,res)=>{

res.sendFile(path.join(__dirname,'./public','location.html'));
})
.post(async(req,res,next)=>{
    const {username,email,password} = req.body;

const user =await User.findOne({emailid : email});

if(user.password == password){

console.log("correct password");
req.userva = user;
}else{
    req.userva = null;
console.error("wrong password");
}


    next();
},
    
    
async(req,res)=>{
    const {username,email,password} = req.body;

try{
const user = await User.findByIdAndUpdate(req.userva.id ,
    {
name:username,
emailid:email,
password:password
        
    },{

new:true

    });
    res.send("Updatred successfully");
}
catch(error){
    res.send("Error");
}
    

});

router
.route('/updatepassword')
.get((req,res)=>{

    res.sendFile(path.join(__dirname,'./public','resetpassword.html'));

});

router.post("/sendresetmailurl",async(req,res)=>{

    
const {mymail} = req.body;
console.log(mymail);
const user = await User.findOne({emailid : mymail});

const token =  user.entertoken();
await user.save();

const url = `${req.protocol}://${req.get('host')}/api/updatepage/resetroute/:${token}`;

await emailmodule(mymail,url);

res.json({
    status:"success"
})

});

router
.route('/resetroute/:token')
.get(async(req,res)=>{

         res.sendFile(path.join(__dirname,'./public','changepass.html'));

})
.post(async(req,res)=>{

    const {pp,np} = req.body;

    try{
    const token = req.params.token;
  const newtoken = token.replace(':','');
console.log(pp , token ,np);
    const user =await User.findOne({
        passwordresettoken:newtoken
    });
    console.log(user);

 user.password = np;
 await user.save();

 res.json({
     status:"success"
 });
    }
    catch(error){
        console.log(error);
        res.json({
            status:"error"
        });
    }

});



module.exports = router;