const jimp = require('jimp');
const logger = require('./config/logger');
const config = require('./config/config.json');
const constants = require('./config/const.json');
const _ = require('lodash');

// resizer.addImage(image)
// resizer.addFolder(folder)
// resizer.options : {}
// resizer.start()
// resizer.clear()

exports.addImage = () => {
    return 'addImage';
};

exports.addFolder = () => {
    return 'addFolder';
};

exports.options = config.defaultOptions;

exports.start = () => {
    return 'start';
};

exports.clear = () => {
    return 'clear';
};

exports.returnPlatform = () => {
    return _.get(constants, exports.options.platform);
};


var exports = module.exports = {};
