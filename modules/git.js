/**
 * Created by Sam on 2015/10/4 0004.
 */
var logHelper = require('./logHelper'),
    path = require('path');

require('shelljs/global');

function pull(pwd, func) {
    cd(pwd);
    exec('git pull', {silent:true}, pull_callback);

    function pull_callback(code, output) {
        logHelper.logH('Exit code:', code);
        logHelper.logH('git pull output:\n', output);

        func();
    }
}

function clone(pwd, url, func) {
    cd(pwd);
    exec('git clone ' + url, {silent:true}, clone_callback);

    function clone_callback(code, output) {
        logHelper.logH('Exit code:', code);
        logHelper.logH('git clone output:\n', output);

        func();
    }
}

function update(pwd, url, func) {
    if(test('-e', pwd)) {
        pull(pwd, func);
    }else {
        var p = path.dirname(pwd);
        if(test('-e', p)) {
            clone(p, url, func);
        }else {
            logHelper.logH('path %s doesn\'t exist.', p);
            logHelper.logH('please checkout the config file.');
        }
    }
}

module.exports = {
    pull: pull,
    clone: clone,
    update: update
};