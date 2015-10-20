/**
 * Created by Sam on 2015/10/4 0004.
 */
var logHelper = require('./logHelper'),
    Thenjs = require('thenjs');

require('shelljs/global');

function pull(pwd, tasksArray) {
    var ta = tasksArray ? tasksArray : [] ;

    cd(pwd);
    exec('git pull', {silent:true}, pull_callback);

    function pull_callback(code, output){
        logHelper.logH('Exit code:'+ code);
        logHelper.logH('git pull output:\n' + output);

        Thenjs.series(ta);
    }
}

module.exports = {
    pull: pull
};