app = app || {};
define(['Util', 'UI'], function (Util, UI) {
    var mData = {};
    app.Notice = function (game) {

    };
    app.Notice.prototype = {
        init: function (data) {
            mData = data;
        },
        preload: function () {

        },
        create: function () {
            UI.createLogoButton();
            UI.createLogAndDetailsButton('base_detail_btn', 'result_record_btn');
            game.add.image(0, 0, 'error_dialog');
            UI.createMoreButton('error_dialog_link');
            game.add.image(0, 0, 'result_bottom_info');

            UI.getRandomText();

            var errorText;
            if (mData.RtCode != '0000') {
                game.add.image(0, 0, 'error_title_notice');
                errorText = '請確認一下您所使用的手機顯\n示時間是否正常\n請檢查設定/時間，並選擇自動\n設定後再次進入本遊戲';
                Util.ga('recommend', 'moduleView', 'system_busy');
            } else {
                switch (mData.Status || '') {
                    case '1':
                        game.add.image(0, 0, 'error_title_remind');
                        errorText = '您今天已經參加了唷!\n百萬大獎還沒送完喲\n記得明天再來!\n11/01~11/09每帳號限玩乙次';
                        break;
                    case '2':
                        game.add.image(0, 0, 'error_title_remind');
                        errorText = '活動尚未開始';
                        break;
                    case '3':
                        game.add.image(0, 0, 'error_title_remind');
                        errorText = '活動已經結束了喲\n但是還有很多好康優惠等你唷';
                        break;
                    case '4':
                    case '9999':
                    default:
                        game.add.image(0, 0, 'error_title_notice');
                        errorText = '哇!遊戲反應熱烈\n系統繁忙，請稍後再試';
                        Util.ga('recommend', 'moduleView', 'system_busy');
                        break;
                }
            }

            var strErrorText = game.add.text(0, 0, errorText, { fontSize: '36px', align: 'center', boundsAlignH: 'center', boundsAlignV: 'middle' });
            strErrorText.setTextBounds(30, 220, 575, 260); //設置文字區域(置中用)
        },
        update: function () {

        }
    }
});