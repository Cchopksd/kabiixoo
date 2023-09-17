const express = require('express');
const router = express.Router()
const { getAllAccounts,removeAccount, } = require('../controllers/manageAccountController')


router.get('/accounts', getAllAccounts);
// router.get('/accounts', singleAccount);
router.delete('/account/:slug', removeAccount);


module.exports = router;