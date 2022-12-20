const dotenv1 = require('dotenv').config({path: './.env.local'});


const makeUppercase = require('./makeUppercase');
const addMessage = require('./addMessage');
exports.makeUppercase = makeUppercase.makeUppercase;
exports.addMessage = addMessage.addMessage;
