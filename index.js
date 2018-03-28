var exports = module.exports = {};

const jimp = require('jimp');
const logger = require('./logger');
const config = require('./config/config.json');
const constants = require('./config/const.json');
const fs = require('fs');
const _ = require('lodash');

exports.options = config.defaultOptions;

exports.setInputDensity = (density) => new Promise((res, rej) => {
    if(_.includes(_.get(constants.density, exports.options.platform), density)){
        logger.info('Density changed to ' + density);

        return res(exports.options.sourceDensity = density);
    }else{
        exports.options.sourceDensity = '';

        return rej('Density invalid: ' + density);
    }
});

// Add Output Density
// Set output density

exports.addOutputDensity = (density) => new Promise((res, rej) => {
    if(_.includes(_.get(constants.density, exports.options.platform), density)){
        exports.options.outputDensity.push(density);
        logger.info('Output density added: ' + density);

        return res(logger.info('Current output density list: ' + exports.options.outputDensity));
    }else{

        return rej('Output density invalid: ' + density);
    }
});

exports.clearOutputDensity = () => new Promise((res, rej) =>{
    return res(exports.options.outputDensity = '');
});

exports.setOutputDensity = (density) => new Promise((res, rej) => {
    if(_.includes(_.get(constants.density, exports.options.platform), density)){
        exports.options.outputDensity = '';
        exports.options.outputDensity.push(density);
        logger.info('Output density added: ' + density);

        return res(logger.info('Current output density list: ' + exports.options.outputDensity));
    }else{

        return rej('Output density invalid: ' + density);
    }
});


exports.addImage = (imagePath) => new Promise((res) => {
    // Verify file here
    exports.options.inputFiles.push(imagePath);

    return res(logger.info('Added ' + imagePath));
});

exports.addFolder = (directoryPath) => new Promise((res, rej) => {

    try {
        logger.info('Adding folder: ' + directoryPath);
        // Verify folder contains images, loop through and add here
        fs.readdirSync(directoryPath).forEach(file => {
            exports.addImage(directoryPath + '/' + file);
        });
    } catch (e) {
        logger.debug(e);

        return rej(logger.error('Error attempting to add ' + directoryPath));
    }

    return res(logger.info('Folder added'));
});

exports.setOutputFolder = (outputPath) => new Promise((res, rej) => {
    try{
    exports.options.outputFolder = outputPath;
    }catch(e){
        logger.debug(e);

        return rej(logger.error('Error attempting to set output folder to ' + outputPath));
    }

    return res(logger.info('Output folder set: ' + outputPath));
});

exports.start = () => new Promise((res, rej) => {
    var ready = true;
    _.forOwn(exports.options, (value, key) => {
        if (value.length === 0) {
            ready = false;
            logger.info('Please define option: ' + key);
        }
    });

    if (ready) {
        logger.info('Options valid. Processing...');

        return res(processFiles().then(logger.info('Files processed')));
    } else {
        return rej(logger.error('Missing options. Aborting.'));
    }
});

exports.clear = () => new Promise((res) => {
    exports.options = {};

    return res(exports.options = config.defaultOptions);
});

exports.returnPlatform = () => {
    return _.get(constants, exports.options.platform);
};

var calculateScale = (input, output, platform) => {

    var inputFactor = _.get(constants.density, platform + '.' + input);
    var outputFactor = _.get(constants.density, platform + '.' + output);

    return outputFactor / inputFactor;
};

var processFiles = () => new Promise((res, rej) => {
    _.forOwn(exports.options.inputFiles, (value, key) => {
        logger.info(key + ' : ' + value);
        var fileName = value.split('/').pop();

        _.forOwn(exports.options.outputDensity, (density) => { // TODO check PNGs, gifs etc. work
            jimp.read(value).then(function(image) {
                return image.scale(calculateScale(exports.options.sourceDensity, density, exports.options.platform))
                    .quality(60)
                    .write(exports.options.outputFolder + '/' + density + '/' + fileName); // TODO Ensure slash exists in option
            }).catch(function(err) {
                console.error(err);

                return rej(console.error('Err in processFiles: ' + err));
            });
        });
    });

    return res('Success');
});
