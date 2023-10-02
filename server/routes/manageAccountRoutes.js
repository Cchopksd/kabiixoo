const express = require('express');
const router = express.Router()
const { getAllAccounts,removeAccount,singleAccount,updateAccount,isSuspendAccount } = require('../controllers/manageAccountController');


router.get('/accounts', getAllAccounts);
router.get('/account/:mem_slug', singleAccount);
router.delete('/account/:mem_slug', removeAccount);
router.patch('/account/:mem_slug',updateAccount);
router.patch('/accounts/:mem_slug', isSuspendAccount);



module.exports = router;