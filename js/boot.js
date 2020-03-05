app = app || {};
define(function () {
    app.Boot = function (game) { };
    app.Boot.prototype = {
        preload: function () {

        },
        create: function () {
            //自動縮放到可以顯示整個遊戲畫面
            game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            //水平居中
            game.scale.pageAlignHorizontally = true;
            //停用離開畫面暫停
            game.stage.disableVisibilityChange = true;
            //同時最多載入資源數(default 4)
            game.load.maxParallelDownloads = 10;

            //讓canvas可以滾動
            Phaser.Canvas.setTouchAction(game.canvas, "auto");
            game.input.touch.preventDefault = false;
            
            //產生一空白區塊讓畫面縮放
            var bmd = game.add.bitmapData(640, 1000);
            game.add.sprite(0, 0, bmd);
        },
        update: function () {
            game.state.start('Preloader');
        },
    }

});