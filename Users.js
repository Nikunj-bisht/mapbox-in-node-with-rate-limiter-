const mongoose = require('mongoose');

const Userschema = new mongoose.Schema({

name:{
    type:String,
    required:true
},
emailid:{
    type:String
},
password:{
    type:String
},
mess:{
    type:String
},admin:{
    type:String,
    default:'admin'
}

});


const Usermodel =  mongoose.model('Users',Userschema);;

module.exports = Usermodel;

