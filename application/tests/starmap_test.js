var testCase  = require('nodeunit').testCase;

module.exports = testCase({
    "Randomize starmap": function(test) {
        var starmapModel = require(__dirname + '/../model/starmap.js');
        test.ok(typeof starmapModel !== 'undefined');

        starmapModel.randomizeStarmap(100);

        test.done();
    }
});
