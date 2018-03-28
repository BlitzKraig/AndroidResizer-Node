var resizer = require('../index.js');

// resizer.addImage('../testdata/mdpi/testimg.jpeg');
resizer.addFolder('../testdata/xxxhdpi')
    .then(resizer.setInputDensity('xxxhdpi')
        .then(resizer.setOutputFolder('../testdata')
            .then(resizer.start().then(() => {
                console.log('Successful run');
            }, () => {
                console.log('Failed run');
            }), () => {
                console.log('setOutput Fail');
            }), () => {
                console.log('inputDensity Fail');
            }), () => {
            console.log('addFolder Fail');
        });
