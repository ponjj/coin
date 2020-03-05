define(['MD5'], function (MD5) {
    return {
        getParameterByName: function (name, url) {
            if (!url) {
                url = window.location.href;
            }
            name = name.replace(/[\[\]]/g, "\\$&");
            var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
                results = regex.exec(url);
            if (!results) return null;
            if (!results[2]) return '';
            return decodeURIComponent(results[2].replace(/\+/g, " "));
        },
        toDataUrl: function (request) {
            var xhr = new XMLHttpRequest();
            xhr.onload = function () {
                var reader = new FileReader();
                reader.onloadend = function () {
                    request.onSuccess(reader.result);
                }
                reader.readAsDataURL(xhr.response);
            };
            xhr.onerror = function () {
                if (request.onError) {
                    request.onError();
                }
            }
            xhr.open('GET', request.url);
            xhr.responseType = 'blob';
            xhr.send();
        },
        getHash: function (ActivityId) {
            var date = new Date();
            // var guid = this.getParameterByName('guid');
            var guid = sessionStorage.guid;
            return MD5(date.getFullYear() + ActivityId + 's0ftm0bile' + (date.getMonth() + 1) + guid + date.getDate() + date.getHours() + date.getMinutes());
        },
        //驗證guid
        verifyGuid: function () {
            var guid = this.getParameterByName('guid');
            var myRe = new RegExp(/^[A-Z0-9]{26}$/);
            if (!guid || !myRe.test(guid)) {
                return false;
            }
            return true;
        },
        //非手機裝置不能玩
        verifyIsMobile: function () {
            return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        },
        startTimer: function (delay, callback) {
            var timer = game.time.create();
            timer.add(delay, callback);
            timer.start();
        },
        ga: function (category, action, label) {
            ga('send', 'event', category, action, label);
            ga('softmobile.send', 'event', category, action, label);
        },
        randomGuid: function(){
            var str = '',
                range = 26,
                arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
         
            for(var i=0; i<range; i++){
                pos = Math.round(Math.random() * (arr.length-1));
                str += arr[pos];
            }
            return str;
        }
    }
});