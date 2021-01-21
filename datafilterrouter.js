const express = require("express");
const Users = require("./Schemas/Users");
const Features =  require('./features');
const uploadcontroller = require('./uploadcontroller');

const router = express.Router();

router.route("/filter").get(async (req, res) => {
 
const feat = new Features(Users.find() , req.query).filter();

  const totalres = await feat.queryob;
  console.log(totalres);

  // const q = await Users.find();

  //console.log(query);
  //console.log(q);
});

router
.route('/upload')
.post(uploadcontroller.uploadimage,uploadcontroller.savefilename);

module.exports = router;
