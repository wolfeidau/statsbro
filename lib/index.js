/*
 * statsbro
 * https://github.com/wolfeidau/ofuda
 *
 * Copyright (c) 2012 Mark Wolfe
 * Licensed under the MIT license.
 */
var os = require('os'),
    _ = require('lodash');

function StatsBro() {

    _.each(['platform', 'arch', 'release'], function (property) {
        this[property] = os[property]();
    }.bind(this));
}

StatsBro.prototype.setLog = function (logMethod) {
    this.log = logMethod;
};

StatsBro.prototype.systemInfo = function () {
    this.log(_.template(' platform: ${ platform } arch: ${ arch } release: ${ release }', this));
};

StatsBro.prototype.logStats = function (timeout, callback) {
    var timer,
        self = this,
        compiledTemplate = _.template("load: ${ data.load } memory: ${ data.memory }", null, { 'variable': 'data' });
    return function () {
        clearTimeout(timer);
        timer = setTimeout(function () {
            self.logMessage(compiledTemplate, callback);
        }.bind(this), timeout);
    };
};

StatsBro.prototype.logMessage = function (compiledTemplate, callback) {

    this.log(compiledTemplate({load: os.loadavg(), memory: [os.totalmem(), os.freemem()]}));

    if (typeof callback !== undefined) {
        callback();
    }
};

// currently just uses console.log this will be made configurable in the future
StatsBro.prototype.log = function (message) {
    console.log("[%s] %s", this._timestamp(), message);
};

StatsBro.prototype._timestamp = function () {
    return new Date().toISOString();
};


module.exports = StatsBro;