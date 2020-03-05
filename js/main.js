var game = {};
var app = {};

requirejs.config({
    baseUrl: 'js',
    paths: {
        Scroller: 'common/phaser-scrollable.min',
        MD5: 'common/md5.min',
        Ajax: 'common/ajax',
        Api: 'common/api',
        Util: 'common/util',
        UI: 'common/ui',
        Boot: 'boot',
        Preloader: 'preloader',
        Index: 'index',
        Game: 'game',
        Reward: 'reward',
        Record: 'record',
        Notice: 'notice'
    }
});

requirejs(['Boot', 'Preloader', 'Index', 'Game', 'Reward', 'Record', 'Notice'], function () {
    game = new Phaser.Game(640, 1000, Phaser.AUTO, 'content', {}, true);

    game.state.add('Boot', app.Boot);
    game.state.add('Preloader', app.Preloader);
    game.state.add('Index', app.Index);
    game.state.add('Game', app.Game);
    game.state.add('Reward', app.Reward);
    game.state.add('Record', app.Record);
    game.state.add('Notice', app.Notice);

    game.state.start('Boot');
});

