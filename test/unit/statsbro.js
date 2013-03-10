// Load modules
var Chai = require('chai');
var sinon = require('sinon');
var StatsBro = process.env.TEST_COV ? require('../../lib-cov/statsbro') : require('../../lib');

// Declare internals

var internals = {};

// Test shortcuts

var expect = Chai.expect;

describe('statsbro', function () {

    before(function () {
        internals.statsbro = new StatsBro();
    })

    describe('should have property', function () {


        it('platform', function () {
            expect(internals.statsbro.platform).to.exist;
        });

        it('should have property arch', function () {
            expect(internals.statsbro.arch).to.exist;
        });

        it('should have property release', function () {
            expect(internals.statsbro.release).to.exist;
        });

    })


    describe('should log', function () {

        it(' platform and arch', function () {

            internals.statsbro.setLog(function (message) {
                expect(message).to.exist;
            });

            internals.statsbro.systemInfo();
        });

    })

    describe('timers', function () {

        var clock;

        before(function () {
            clock = sinon.useFakeTimers();
            internals.statsbro = new StatsBro();
        });
        after(function () {
            clock.restore();
        });

        it('should configure a timer for supplied value', function () {

                internals.statsbro.setLog(function (message) {
                    expect(message).to.exist;
                });

                var callback = sinon.spy();

                var logStatsContext = internals.statsbro.logStats(1000, callback);

                logStatsContext();

                clock.tick(1500);

                expect(callback.calledOnce).is.true;

            }
        );

    })


});

