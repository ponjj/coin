define(function () {
    return {
        get: function (request) {
            var oReq = new XMLHttpRequest();

            var url = request.url;
            var success = request.success;
            var error = request.error;

            oReq.onreadystatechange = function () {

                if (oReq.readyState == 4 && (oReq.status == 200 || oReq.status == 204)) {

                    if (typeof success == 'function') {
                        console.log('GET status: ' + oReq.status + ", Url: " + url);
                        success(oReq.responseText);
                    }

                } else if (oReq.readyState == 4) {
                    if (typeof error == 'function') {
                        console.log('GET status: ' + oReq.status + ", Url: " + url);
                        error(oReq.status, oReq.responseText);
                    }
                }
            }

            oReq.open("get", url, true);
            oReq.send();
        },

        post: function (request) {
            var oReq = new XMLHttpRequest();

            var url = request.url;
            var success = request.success;
            var error = request.error;
            var body = request.body;
            
            oReq.onreadystatechange = function () {
                if (oReq.readyState == 4 && (oReq.status == 200 || oReq.status == 201 || oReq.status == 202)) {

                    if (typeof success == 'function') {
                        success(oReq.responseText);
                    }

                } else if (oReq.readyState == 4) {
                    if (typeof error == 'function') {
                        error(oReq.status, oReq.responseText);
                    }
                }
            }

            oReq.open("post", url, true);
            oReq.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            oReq.send('param=' + body);
        },

        put: function (request) {
            var oReq = new XMLHttpRequest();

            var url = request.url;
            var success = request.success;
            var error = request.error;
            // var head = request.head;
            var body = request.body;

            oReq.onreadystatechange = function () {
                if (oReq.readyState == 4 && oReq.status == 200) {

                    if (typeof success == 'function') {
                        console.log('PUT status: ' + oReq.status + ", Url: " + url);
                        success(oReq.responseText);
                    }

                } else if (oReq.readyState == 4) {
                    if (typeof error == 'function') {
                        console.log('PUT status: ' + oReq.status + ", Url: " + url);
                        error(oReq.status, oReq.responseText);
                    }
                }
            }

            oReq.open("put", url, true);

            oReq.send(body);
        },
        delete: function (request) {

            var oReq = new XMLHttpRequest();

            var url = request.url;
            var success = request.success;
            var error = request.error;

            oReq.onreadystatechange = function () {
                if (oReq.readyState == 4 && (oReq.status == 200 || oReq.status == 204)) {

                    if (typeof success == 'function') {
                        console.log('DELETE status: ' + oReq.status + ", Url: " + url);
                        success(oReq.responseText);
                    }

                } else if (oReq.readyState == 4) {
                    if (typeof error == 'function') {
                        console.log('DELETE status: ' + oReq.status + ", Url: " + url);
                        error(oReq.status, oReq.responseText);
                    }
                }
            }

            oReq.open("delete", url, true);

            oReq.send();
        }
    }
});