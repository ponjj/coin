app = app || {};
define(function () {
    app.Preloader = function (game) {

    };
    app.Preloader.prototype = {
        preload: function () {
            game.load.onLoadComplete.add(this.loadComplete, this);

            this.loadAssets();
        },
        loadAssets: function () {
            game.load.image('base_logo', 'images/base_logo.png');

            game.load.image('base_detail_btn', 'images/base_detail_btn.png');
            game.load.image('base_record_btn', 'images/base_record_btn.png');

            game.load.image('index_start_btn', 'images/index_start_btn.png');
            game.load.image('index_title', 'images/index_title.png');
            game.load.image('index_subtitle', 'images/index_subtitle.png');
            game.load.image('index_sun', 'images/index_sun.png');

            game.load.image('game_subtitle', 'images/game_subtitle.png');
            game.load.image('game_subtitle2', 'images/game_subtitle2.png');
            game.load.image('game_popup_correct', 'images/game_popup_correct.png');
            game.load.image('game_popup_mistake', 'images/game_popup_mistake.png');
            game.load.image('game_popup_mistakeok', 'images/game_popup_mistakeok.png');
            game.load.image('game_popup_mistake2', 'images/game_popup_mistake2.png');
            game.load.spritesheet('game_coin_correct', 'images/game_coin_correct.png', 168, 168);
            game.load.spritesheet('game_coin_correct2', 'images/game_coin_correct.png', 168, 168);
            game.load.spritesheet('game_coin_mistake', 'images/game_coin_mistake.png', 168, 168);

            game.load.image('result_title', 'images/result_title.png');
            game.load.image('result_bottom_info', 'images/result_bottom_info.png');
            game.load.image('result_dialog_1111', 'images/result_dialog_1111.png');
            game.load.image('result_dialog_mall', 'images/result_dialog_mall.png');
            game.load.image('result_dialog_shp', 'images/result_dialog_shp.png');
            game.load.image('result_dialog2_mall', 'images/result_dialog2_mall.png');
            game.load.image('result_dialog2_mall_link', 'images/result_dialog2_mall_link.png');
            game.load.image('result_dialog2_shp', 'images/result_dialog2_shp.png');
            game.load.image('result_dialog2_shp_link', 'images/result_dialog2_shp_link.png');
            game.load.image('result_record_btn', 'images/result_record_btn.png');

            game.load.image('record_title', 'images/record_title.png');
            game.load.image('record_list', 'images/record_list.png');
            game.load.image('record_list_link', 'images/record_list_link.png');
            game.load.image('record_back_btn', 'images/record_back_btn.png');

            game.load.image('error_title_notice', 'images/error_title_notice.png');
            game.load.image('error_title_remind', 'images/error_title_remind.png');
            game.load.image('error_dialog', 'images/error_dialog.png');
            game.load.image('error_dialog_link', 'images/error_dialog_link.png');
        },
        loadComplete: function () {
            game.state.start('Index');
        }
    }

});