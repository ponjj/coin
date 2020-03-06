app = app || {};
define(['Util', 'UI', 'Api'], function (Util, UI, Api) {
    var mCoinColumn = 4;        //欄(橫)
    var mCoinRow = 4;           //列(直)
    var mFPS = 60;              //動畫播放速率(幀/秒)
    var mCoinSize = 120;        //硬幣大小
     var mCoinRndNum = 50;       //硬幣隨機偏移值
    var mTurnWaitTime = 1000;   //開始多久後翻背面

    var mDesTitle;
    var mCoinGroup;             //硬幣群組
    var mCorrectCoinIdx;        //正確硬幣位置
    var mCorrectCoinIdx2;
    var mMisstakeNum = 0;       //錯誤次數
    var mCorrecttakeNum = 0;
    var mResultBackground;

    var mStartToEnd = 'StartToEnd';     //硬幣翻轉動畫名
    var mMidToStart = 'MidToStart';     //進畫面時的動畫名

    app.Game = function (game) { };
    app.Game.prototype = {
        preload: function () {

        },
        create: function () {
            UI.createLogoButton();
            // UI.createLogAndDetailsButton('base_detail_btn', 'base_record_btn');

            var title = game.add.sprite(0, 0, 'index_title');
            // game.add.tween(title).to({ y: 0 }, 500, Phaser.Easing.Bounce.Out, true);
            game.add.tween(title).from({ y: -200 }, 1000, Phaser.Easing.Elastic.Out, true);

            mCoinGroup = new Phaser.Group(game);
            //隨機數為正確硬幣位置
            mCorrectCoinIdx = game.rnd.integerInRange(0, (mCoinRow * mCoinColumn) - 1);
             mCorrectCoinIdx2 = game.rnd.integerInRange(0, (mCoinRow * mCoinColumn) - 1);
             console.log(mCorrectCoinIdx+' '+mCorrectCoinIdx2);
            if( mCorrectCoinIdx==mCorrectCoinIdx2){
                mCorrectCoinIdx2++;
            }
            console.log(mCorrectCoinIdx+' '+mCorrectCoinIdx2);
            mDesTitle = game.add.image(0, 0, 'game_subtitle');

            initCoin();
            startTurnTime();

            mResultBackground = UI.createColorBackground();

            Util.ga('index', 'moduleView', 'game');
        },
        update: function () {
        },
    };

    //初始化硬幣
    function initCoin() {
        var coinBtn; //每個硬幣
        var currentCoinIdx = 0; //for迴圈當前索引值
        var coinTexture;
        for (var i = 0; i < mCoinRow; i++) {
            for (var j = 0; j < mCoinColumn; j++) {
                //當前索引值等於隨機數就換上正確硬幣圖
                if (currentCoinIdx == mCorrectCoinIdx2) {
                    coinTexture = 'game_coin_correct';
                console.log(coinTexture);
                }
                else if(currentCoinIdx == mCorrectCoinIdx) {
                     coinTexture = 'game_coin_correct';
                     console.log(coinTexture);
                 }
                else  {
                    coinTexture = 'game_coin_mistake';
                }

                var x = mCoinSize * (j * 1.1);
                var y = mCoinSize * (i * 1.1);
                coinBtn = UI.createButton(x, y, coinTexture, onCoinClick);

                //一開始先顯示背面圖
                coinBtn.frame = 12;
                //加入動畫
                coinBtn.animations.add(mMidToStart, [5, 4, 3, 2, 1, 0]);
                // coinBtn.animations.refreshFrame();
                coinBtn.animations.add(mStartToEnd);
                //一開始不能點擊
                coinBtn.input.enabled = false;
                //將索引值存到按鈕本身中
                coinBtn.data = {
                    index: currentCoinIdx,
                    texture: coinTexture
                };

                //按鈕加入群組
                mCoinGroup.addChild(coinBtn);
                currentCoinIdx++;
            }
        }
        //群組頁面置中
        mCoinGroup.x = (game.world.width - mCoinGroup.width) * 0.5;
        mCoinGroup.bottom = game.world.height - 100;
        // mCoinGroup.y = ((650 - mCoinGroup.height) * 0.5) + 320;

        //沒用Timer的話, 手機裝置第一次開啟動畫會卡住
        Util.startTimer(0, function () {
            mCoinGroup.children.forEach(function (coinBtn) {
                //隨機偏移值
                // coinBtn.x += game.rnd.integerInRange(-mCoinRndNum, mCoinRndNum);
                // coinBtn.y += game.rnd.integerInRange(-mCoinRndNum, mCoinRndNum);

                //播放動畫
                // coinBtn.animations.getAnimation(mMidToStart).reversed = true;
                coinBtn.animations.play(mMidToStart, mFPS);
            }, this);
        });

    }

    //開始準備翻轉
    function startTurnTime() {
        Util.startTimer(mTurnWaitTime, function () {
            mCoinGroup.children.forEach(function (coinBtn) {
                mDesTitle.loadTexture('game_subtitle2');
                //播放動畫
                coinBtn.animations.play(mStartToEnd, mFPS);
                //可以點擊
                coinBtn.input.enabled = true;
            }, this);
        });
    }

    //硬幣點擊時
    function onCoinClick() {
        var self = this;
        //點過就不能在點
        this.input.enabled = false;
        //動畫反轉
        this.animations.getAnimation(mStartToEnd).reversed = true;
        this.animations.play(mStartToEnd, mFPS);

        Util.startTimer(500, function () {
            if (self.data.index != mCorrectCoinIdx&&self.data.index != mCorrectCoinIdx2) {
                mMisstakeNum++;
                if (mMisstakeNum < 2) {
                    showResult('game_popup_mistake', onMistakeClick);
                } else {
                    showResult('game_popup_mistake2', onCorrectClick);
                }
            } else {
                mCorrecttakeNum++;
                if(mCorrecttakeNum<2){
                    showResult('game_popup_mistakeok', onMistakeClick);
                }else{
                    showResult('game_popup_correct', onCorrectClick);
                }
               
            }
        });
    }

    function showResult(imageName, clickCallback) {
        //顯示半透明背景
        game.add.tween(mResultBackground).to({ alpha: 0.8 }, 300, Phaser.Easing.Linear.None, true);
        mResultBackground.inputEnabled = true; //開啟才不會點到下面的硬幣

        var self = this;
        var btn = UI.createButton(game.world.centerX, game.world.centerY, imageName, clickCallback);
        // var mistake = game.add.button(game.world.centerX, game.world.centerY, imageName, clickCallback);;
        btn.input.enabled = false;
        btn.anchor.setTo(0.5, 0.5);

        game.add.tween(btn).from({ alpha: 0 }, 300, Phaser.Easing.Linear.None, true);
        var tween = game.add.tween(btn.scale).from({ x: 0, y: 0 }, 300, Phaser.Easing.Back.Out, true);
        tween.onComplete.add(function () {
            btn.input.enabled = true;
        }, this);
    }

    function onCorrectClick() {
        //點過就不能在點
        this.input.enabled = false;
        
        Api.queryDrawResult({
            success: function (data) {
                location.href = 'index.html';
            },
            error: function () {
                location.href = 'index.html';
            }
        });
    }

    function onMistakeClick() {
        //隱藏半透明背景
        game.add.tween(mResultBackground).to({ alpha: 0.0 }, 300, Phaser.Easing.Linear.None, true);
        mResultBackground.inputEnabled = false;
        //隱藏結果按鈕
        game.add.tween(this).to({ alpha: 0 }, 300, Phaser.Easing.Linear.None, true);
        game.add.tween(this.scale).to({ x: 0, y: 0 }, 300, Phaser.Easing.Linear.None, true);
    }

});