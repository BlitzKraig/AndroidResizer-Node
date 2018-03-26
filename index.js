var exports = module.exports = {};

const jimp = require('jimp');
const logger = require('./config/logger');
const config = require('./config/config.json');
const constants = require('./config/const.json');
const _ = require('lodash');

exports.options = config.defaultOptions;

// resizer.addImage(image)
// resizer.addFolder(folder)
// resizer.options : {}
// resizer.start()
// resizer.clear()
exports.addImage = (imagePath) => {
    // Verify file here
    exports.options.inputFiles.push(imagePath);

    return logger.info('Added ' + imagePath);
};

exports.addFolder = () => {
    // Verify folder contains images, loop through and add here
    return 'addFolder';
};

exports.setOutputFolder = (outputPath) => {
    exports.options.outputFolder = outputPath;
    
    return logger.info('Output folder set: ' + outputPath);
};

exports.start = () => {
    var ready = true;
    _.forOwn(exports.options, function(value, key) {
        if (value.length === 0) {
            ready = false;

            return logger.info('Please define option: ' + key);
        }
    });

    if (ready) {
        logger.info('Options valid. Processing...');
    
        return processFiles();
    } else {
        return logger.error('Missing options. Aborting.');
    }
};

exports.clear = () => {
    return 'clear';
};

exports.returnPlatform = () => {
    return _.get(constants, this.options.platform);
};

var processFiles = () => {
    _.forOwn(exports.options.inputFiles, function(value, key) {
        logger.info(key + ' : ' + value);
    });
};
