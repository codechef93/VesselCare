const api = require("../api");
const moment = require('moment')
var assert = require('assert');
module.exports = {
  areSameRecord : (a,b,mapping) => {
    Object.keys(mapping).forEach(key => {
      if (mapping[key].type == "identity") {
        return
      } else if (a[key] == null || b[key] == null) {
        assert(a[key] == b[key], `${key} failed`)
      } else if (mapping[key].type == "datetime") {
        assert.strictEqual(moment(a[key]).format("YYYY-MM-DD HH:mm:ss"), moment(b[key]).format("YYYY-MM-DD HH:mm:ss"))
      } else if (mapping[key].type == "integer") {
        assert.strictEqual(parseInt(a[key]), parseInt(b[key]), `${key} failed`)
      } else if (mapping[key].type == "decimal") {
        assert.strictEqual(parseFloat(a[key]), parseFloat(b[key]), `${key} failed`)
      } else {
        assert.strictEqual(a[key], b[key], `${key} failed`)
      }
    })
  },
  packageResponse : (res,value,err) => {
    if (err === null) {
      res.status(200).send({ success: true, value : value });
    } else {
      console.log(err)
      res.status(400).send({ success: false, error : err });
    }
  },
  callback : (res,value,err) => {
      if (err === null) {
        res.send({ success: true, value : value }).status(200);
      } else {
        console.log(err)
        res.send({ success: false, error : err }).status(500);
      }
  },
  authorize : async (res, req, callback)=>{
    try {
      let decoded = await api.VerifyJWT(req,res)
      callback(decoded)
    } catch (err) {
      res.status(401).send({ success : false, error : err})
    }
  },
  IsEmpty : (val) => {
    return val == undefined || val == null || val.toString() == ''
  },
  IsValidFileName : (val) => {
    return !(val.includes('.') || val.includes('\\') || val.includes('/'))
  },
  updateObjForPG : (val,field,obj) => {
    if (val !== undefined) {
      obj[field] = val
    }
    return obj
  }
}