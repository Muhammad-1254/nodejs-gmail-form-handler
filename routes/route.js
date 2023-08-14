const router = require('express').Router();
const {signup,getbill} = require('../controller/appController.js')



// http req
router.post('/user/signup', signup) //this api send mail to ethereal
router.post('/product/getbill',getbill) //this api send mail to gmail.com -> Admin


module.exports = router;
