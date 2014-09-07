/*
 * Simple sequencer
 */

var Pattern = function(id, engine) {

    this.id = id;
    this.engine = engine;

};

Pattern.prototype.tic = function(e, t, b, s, x) {

    // e = engine, t = time at start of bar, b = bar no,
    // s = sequencer, x = tic duratio

};

var Sequencer = function(engine, data) {

    this.engine = engine;
    this.data = data;

    this.tic = (60 / this.data.tempo) / 2;   // 16th

    this.patterns = {};

};

Sequencer.prototype.addPattern = function(id, fn) {

    var p = new Pattern(id, this.engine);
    p.tic = fn;
    this.patterns[id] = p;

};

Sequencer.prototype.play = function() {

    var startTime = this.engine._context.currentTime + 0.2;

    for (var bar = 0; bar < this.data.bars; bar++) {

        var time = startTime + bar * 8 * this.tic;

        for(var p in this.patterns) {
            this.patterns[p].tic(this.engine, time, bar, this, this.tic);
        }

    }

};

module.exports = Sequencer;