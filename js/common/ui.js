define(['Util'], function (Util) {
    var btnLogo;
    var btnDetails;
    var btnRecord;
    return {
        createButton: function (x, y, key, clickFunc) {
            var btn;
            if (clickFunc) {
                btn = game.add.button(x, y, key, clickFunc);
            } else {
                btn = game.add.button(x, y, key);
            }

            btn.input.pixelPerfectOver = true;
            btn.input.pixelPerfectClick = true;

            return btn;
        },
        createZeroButton: function (key, clickFunc) {
            return this.createButton(0, 0, key, clickFunc);
        },
        createLogoButton: function () {
            btnLogo = game.add.button(0, 0, '', onLogoClick);

            //Logo因為是文字所以需自訂點擊範圍
            btnLogo.hitArea = new Phaser.Rectangle(0, 0, 260, 100);

            function onLogoClick() {
                Util.ga('index', 'activity', '1111購物節');
                location.href = 'http://www.softmobile.com.tw/';
            }
        },
        createLogAndDetailsButton: function (detailsKey, recordKey) {
            if (detailsKey) {
                btnDetails = this.createButton(0, 0, detailsKey, onDetailsClick);
            }

            if (recordKey) {
                btnRecord = this.createButton(0, 0, recordKey, onRecordClick);
            }

            function onDetailsClick() {
                location.href = 'http://www.softmobile.com.tw/';
            }

            // var self = this;
            function onRecordClick() {
                // if (Util.verifyGuid()) {
                    game.state.start('Record', true, false, {});
                // } else {
                    // game.state.start('Notice', true, false, {});
                // }
            }
        },
        createMoreButton: function (key) {
            this.createButton(0, 0, key, onMoreClick);

            function onMoreClick() {
                Util.ga('index', 'activity', '今日商品');
                location.href = 'http://www.softmobile.com.tw/';
            }
        },
        disabledHeaderButton: function () {
            btnLogo.input.enabled = false;
            btnDetails.input.enabled = false;
            btnRecord.input.enabled = false;
        },
        enabledHeaderButton: function () {
            btnLogo.input.enabled = true;
            btnDetails.input.enabled = true;
            btnRecord.input.enabled = true;
        },
        createColorBackground: function () {
            var bmd = game.add.bitmapData(game.world.width, game.world.height);
            bmd.ctx.beginPath();
            bmd.ctx.rect(0, 0, game.world.width, game.world.height);
            bmd.ctx.fillStyle = '#000000';
            bmd.ctx.fill();
            var sprite = game.add.sprite(0, 0, bmd);
            sprite.alpha = 0.0;
            return sprite;
        },
        getRandomText: function () {
            var arrayText = [
                '11/1~11/9 每天10AM超殺\n商品天天等你來搶～我先\n出發囉',
                '11/10-13 雙11購物節 五折\n下殺上億折扣! 12AM準時\n開搶，預備備GO!',
                '11/9 晚上9點還有雙11直播\n狂歡夜，快來一起與我同\n歡A好康'
            ];
            var rndIndex = game.rnd.integerInRange(0, arrayText.length - 1);
            var rndText = game.add.text(0, 0, arrayText[rndIndex], { fontSize: '28px', boundsAlignV: 'middle' });
            rndText.setTextBounds(65, 670, 310, 210);
        }
    }
});