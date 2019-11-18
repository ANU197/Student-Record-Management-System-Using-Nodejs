const express = require('express');
const router = express.Router();
const { ensureAuthenticated} = require('../config/auth');

router.get('/', (req, res) => res.render('welcome'));

// dashboard
router.get('/dashboard',ensureAuthenticated, (req, res) => res.render('dashboard',{
    name: req.user.name,
    father: req.user.father,
    address: req.user.address,
    mobile: req.user.mobile,

}));


module.exports = router;
