var resizer = require('../index.js');

resizer.addImage('../testdata/mdpi/testimg.jpeg');
// resizer.addImage('../testdata/mdpi/testimg2.jpeg');
resizer.setOutputFolder('../testdata/hdpi');
resizer.start();
