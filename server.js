const express = require('express');

const app = express();
const mongoose = require('mongoose');
const ratelimiter = require('express-rate-limit');
const bodyparser = require('body-parser');
const profilesrouter = require('./profilesroute');
const helmet = require('helmet');
const sanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const cookie = require('cookie-parser');

mongoose.connect('mongodb+srv://nicola:qObaF401D1ej4Vj4@cluster0.3uhra.mongodb.net/authusers?retryWrites=true&w=majority',

{
    useUnifiedTopology: true,
    useCreateIndex:true,
    useNewUrlParser:true,
    useFindAndModify:false
   
}
).then(()=>{

console.log('Connected to the database');

});

 const limit =  ratelimiter({     // limiting request for a particular ip address

       max:15,
       windowMs : 60 * 60 * 1000,
       message : "Limit exceeded"

});


// middleware function
//pp.use(helmet());
app.use(express.static('public'));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended : true}));
app.use(cookie());

app.use((req,res,next)=>{

    console.log(req.cookies);

next();
});
// data sanitization 
// app.use(sanitize()); // removes all the mongo query from request
// app.use(xss());
app.use('/api',limit);

app.use('/api/master',profilesrouter);
app.get('/api/locationurl' , (req,res)=>{

const {latitude , longitude} = req.query;
console.log(latitude , longitude);



});



const port = 3000;


app.listen(port , (req,res)=>{

console.log('connected');

});


