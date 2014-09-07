var engine = require('./core/engine'),
    Sequencer = require('./core/sequencer');

engine.setSounds({
    'bass': 'audio/bass/bass1.mp3',
    'hat': 'audio/drums/hat1.mp3',
    'kick': 'audio/drums/kick1.mp3',
    'snare': 'audio/drums/snare1.mp3'
});

engine.ready(function(items) {

    console.log('ENGINE READY', engine);

    var seq = new Sequencer(engine, {

        bars: 4,
        tempo: 70

    });

    seq.addPattern('basic', function(e, t, b, s, x) {

        e.play('kick', 0, t);
        e.play('snare', 0, t + 2 * x);
        e.play('kick', 0, t + 5 * x + (x * 0.5));
        e.play('snare', 0, t + 6 * x);

        for (var i = 0; i < 8; ++i) {
            e.play('hat', 0, t + i * x);
        }

    });

    seq.addPattern('buzz', function(e, t, b, s, x) {

        e.play('bass', 0, t, 4 * x);
        e.play('bass', -4, t + 4 * x, 4 * x);

    });

    seq.play();

});


window.addEventListener('load', engine.init, false);

