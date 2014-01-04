var shell = require('shelljs');

namespace('tests', function () {

  desc('Run tests');
  task('run', [], function () {
    console.log('running tests');

    shell.exec('NODE_ENV=test mocha test/**/*');
  }, {async: true});
});
