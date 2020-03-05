app = app || {};
define(['Util', 'UI'], function (Util, UI) {
    var mData;
    var mExtraTag;
    var mFontStyle = {
        fill: '#d95837',
        fontSize: '40px',
        boundsAlignH: 'center',
        boundsAlignV: 'middle'
    };

    app.Reward = function (game) {

    };
    app.Reward.prototype = {
        init: function (data) {
            mData = data;
            mExtraTag = mData.ExtraTag ? JSON.parse(mData.ExtraTag) : {};
        },
        preload: function () {

        },
        create: function () {
            UI.createLogoButton();
            UI.createLogAndDetailsButton('base_detail_btn', 'base_record_btn');

            game.add.image(0, 0, 'result_title');
            game.add.image(0, 0, 'result_bottom_info');

            var rndText = UI.getRandomText();

            if (mData.IsPrize == 1) {
                switch (mExtraTag.src) {
                    case '1111':
                        game.add.image(0, 0, 'result_dialog_1111');
                        Util.ga('recommend', 'moduleView', 'prize');
                        break;
                    case 'sto':
                        if (mData.PrizeUrl) {
                            game.add.image(0, 0, 'result_dialog2_mall');
                            var btn = UI.createZeroButton('result_dialog2_mall_link');
                            btn.onInputUp.addOnce(function () {
                                Util.ga('index', 'recommend', mData.PrizeUrl);
                                location.href = mData.PrizeUrl;
                            }, this);
                            Util.ga('recommend', 'moduleView', mData.PrizeUrl);
                        } else {
                            game.add.image(0, 0, 'result_dialog_mall');
                            Util.ga('recommend', 'moduleView', 'prize');
                        }
                        break;
                    case 'shp':
                        game.add.image(0, 0, 'result_dialog_shp');
                        Util.ga('recommend', 'moduleView', 'prize');
                        break;
                    default:
                        break;
                }
                mFontStyle.fontSize = getFontSize(mData.PrizeName);
                var strPrizeName = game.add.text(0, 0, mData.PrizeName, mFontStyle);
                strPrizeName.setTextBounds(50, 270, 550, 230); //設置文字區域(置中用)


            } else {
                game.add.image(0, 0, 'result_dialog2_shp');

                mFontStyle.fontSize = getFontSize(mData.RecommendedProductName);
                var strRecommendedName = game.add.text(0, 0, mData.RecommendedProductName, mFontStyle);
                strRecommendedName.setTextBounds(50, 270, 550, 230); //設置文字區域(置中用)

                Util.ga('recommend', 'moduleView', mData.RecommendedProductLink);
            }
        },
        update: function () {

        }
    }

    function getFontSize(text) {
        if (text.length > 10) {
            return '34px';
        } else {
            return '44px';
        }
    }
});