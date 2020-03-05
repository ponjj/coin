app = app || {};
define(['Util', 'UI', 'Api'], function (Util, UI, Api) {

    var mBtnStart;
    var mBtnResult;

    var mLoader;

    app.Index = function (game) {

    };
    app.Index.prototype = {
        preload: function () {

        },
        create: function () {

            sessionStorage.guid = Util.randomGuid();
            // if (Util.verifyIsMobile() == false) {
            //     game.state.start('Notice', true, false, {});
            // }

            UI.createLogoButton();
            UI.createLogAndDetailsButton('base_detail_btn', 'base_record_btn');

            game.add.sprite(0, 0, 'index_title');
            game.add.sprite(0, 0, 'index_subtitle');
            game.add.sprite(0, 0, 'index_sun');

            mBtnStart = UI.createButton(game.world.centerX, game.world.centerY, 'index_start_btn');
            mBtnStart.onInputUp.addOnce(startGame, this);
            mBtnStart.anchor.setTo(0.5, 0.5);

            game.add.tween(mBtnStart.scale).from({ x: 0, y: 0 }, 500, Phaser.Easing.Back.Out, true);

            // if (!Util.verifyGuid()) {
            //     game.state.start('Notice', true, false, {});
            // }
        },
        update: function () {

        }
    };

    function startGame() {
        Util.ga('index', 'start', 'none');
        // Api.queryIsDraw({
        //     success: function (data) {
                game.state.start('Game');
            // },
            // error: function (data) {
            //     game.state.start('Notice', true, false, data);
            // }
        // });

    }
});