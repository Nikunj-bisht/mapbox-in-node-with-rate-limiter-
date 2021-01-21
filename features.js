
class Apifeatures {
  constructor(queryob, queryStr) {
    this.queryob = queryob;
    this.queryStr = queryStr;
  }

  filter() {
    const queryobj = { ...this.queryStr }; // destructureing of query object
    console.log(queryobj);

    const pag = this.queryStr.page * 1;
    const limi = this.queryStr.limit * 1;
    const allpara = ["page", "limit"];
    allpara.forEach((element) => delete queryobj[element]);

    let querystring = JSON.stringify(queryobj);
    querystring = querystring.replace("gte", "$gte");
    console.log(JSON.parse(querystring));


    console.log(pag, limi);

    this.queryob.find(JSON.parse(querystring));

    this.queryob.sort("age");

    this.queryob.skip(pag).limit(limi);

return this;

  }
}
module.exports = Apifeatures;