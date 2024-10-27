// CommonJS syntax
const express = require('express');
const { generateSignature } = require('../controllers/sign-upload.js');

const router = express.Router();

router.post('/sign', generateSignature);

export default router;