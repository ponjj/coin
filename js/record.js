define(['Util', 'UI', 'Api', 'Scroller'], function (Util, UI, Api) {
    var mScroller;
    app.Record = function (game) {

    };
    app.Record.prototype = {
        preload: function () {

        },
        create: function () {
            UI.createLogoButton();
            UI.createLogAndDetailsButton('base_detail_btn');

            game.add.image(0, 0, 'record_title');
            game.add.image(0, 0, 'record_list');

            UI.createMoreButton('record_list_link');

            //創建scroll容器
            mScroller = game.add.existing(new ScrollableArea(70, 310, 510, 430));

            //取得紀錄
            Api.queryList({
                success: function (data) {
                    if (data) {
                        createText(data.DrawLogList);
                    }
                },
                error: function (status, data) {
                    game.state.start('Notice', true, false, data);
                }
            });

            UI.createZeroButton('record_back_btn', function () {
                game.state.start('Index');
            })
        },
        update: function () {

        }
    }

    function createText(datas) {
        var rowHeight = 48;
        var fontStyle = {
            fontSize: '24px'
        };
        var item;
        var timeArray;
        var prizeText;
        var extraSrc;
        for (var i = 0; i < datas.length; i++) {
            item = datas[i];
            //分割日期與時間
            timeArray = item.DrawDay.split(" ");
            extraSrc = item.ExtraTag ? JSON.parse(item.ExtraTag).src : '';
            switch (extraSrc) {
                case 'sto':
                    prizeText = '商城/' + item.PrizeName;
                    break;
                case 'shp':
                    prizeText = '購中/' + item.PrizeName;
                    break;
                default:
                    prizeText = item.PrizeName;
                    break;
            }

            // nameText.setTextBounds(0, 0, 260, 24); //設置文字區域(置中用)
            mScroller.addChild(game.make.text(0, i * rowHeight, timeArray[0].substr(5), fontStyle));
            // mScroller.addChild(game.make.text(200, i * rowHeight, timeArray[1], fontStyle));
            mScroller.addChild(game.make.text(85, i * rowHeight, prizeText, fontStyle));
        }
        mScroller.start();
    }

});