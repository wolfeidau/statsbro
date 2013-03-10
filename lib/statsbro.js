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

    this.intervalId = null;
    this.compiledTemplate = _.template("load: ${ data.load } memory: ${ data.memory }", null, { 'variable': 'data' });

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

StatsBro.prototype.enableLogStatsTimer = function (timeout, callback) {

    if (!this.intervalId){
        this.intervalId = setInterval(function () {
            this.logMessage(this.compiledTemplate, callback);
        }.bind(this), timeout);
    }
    return this.intervalId;
};

StatsBro.prototype.disableLogStatsTimer = function(){
    if (this.intervalId){
        clearInterval(this.intervalId);
    }
}

StatsBro.prototype.logMessage = function (compiledTemplate, callback) {

    this.log(this.compiledTemplate({load: os.loadavg(), memory: [os.totalmem(), os.freemem()]}));

    if (typeof callback !== 'undefined') {
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