var resizer = require('../index.js');

// resizer.addImage('../testdata/mdpi/testimg.jpeg');
resizer.addFolder('../testdata/mdpi');
// resizer.addImage('../testdata/mdpi/testimg2.jpeg');
resizer.setOutputFolder('../testdata');
resizer.start().then(() => {
    console.log('Successful run');
}, () => {
    console.log('Failed run');
});
