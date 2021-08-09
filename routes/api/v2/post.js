const express = require('express');
const router = express.Router();

const postApi = require('../../../controllers/api/v2/post_api');

router.get('/',postApi.index);

module.exports=router;
