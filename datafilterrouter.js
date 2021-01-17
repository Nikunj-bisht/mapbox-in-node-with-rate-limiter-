const express = require("express");
const Users = require("./Schemas/Users");

const router = express.Router();

router.route("/filter").get(async (req, res) => {
  const queryobj = { ...req.query }; // destructureing of query object
  console.log(queryobj);
  const allpara =['page','limit'];
  allpara.forEach(element=> delete queryobj[element])

  let querystring = JSON.stringify(queryobj);
  querystring = querystring.replace("gte", "$gte");
  console.log(JSON.parse(querystring));

  const pag = req.query.page * 1 ;
  const limi = req.query.limit * 1;
  
  console.log(pag,limi);
  

  let query = Users.find(JSON.parse(querystring))
  
//   .sort("age")
 

  query = query.sort("age");

  query = query.skip(pag).limit(limi);

  const totalres = await query;
  console.log(totalres);

  // const q = await Users.find();

  //console.log(query);
  //console.log(q);
});

module.exports = router;
