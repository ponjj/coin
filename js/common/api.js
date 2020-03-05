define(['Ajax', 'Util'], function (Ajax, Util) {
    var ActivityId = 'bb718feaab23474d976c070f853f9a4f';
    var host = 'https://campaigncms.megatime.com.tw/DrawWebService.asmx';
    return {
        queryIsDraw: function (opts) {
            Ajax.post({
                url: host + '/QueryIsDraw',
                body: JSON.stringify({
                    Guid: sessionStorage.guid,
                    ActivityId: ActivityId,
                    Hash: Util.getHash(ActivityId),
                    Auth: ''
                }),
                success: function (data) {
                    data = JSON.parse(data);
                    if (data.RtCode != '0000') {
                        errorFunc(opts, data);
                        return;
                    }
                    switch (data.Status) {
                        case '0':
                            opts.success(data);
                            break;
                        default:
                            errorFunc(opts, data);
                            break;
                    }
                },
                error: function (status, data) {
                    errorFunc(opts, data);
                }
            });
        },
        queryDrawResult: function (opts) {
            Ajax.post({
                url: host + '/QueryDrawResult',
                body: JSON.stringify({
                    Guid: sessionStorage.guid,
                    ActivityId: ActivityId,
                    Hash: Util.getHash(ActivityId),
                    Auth: ''
                }),
                success: function (data) {
                    data = JSON.parse(data);
                    if (data.RtCode != '0000') {
                        errorFunc(opts, data);
                        return;
                    }

                    switch (data.Status) {
                        case '0':
                            opts.success(data);
                            break;
                        default:
                            errorFunc(opt, data);
                            break;
                    }
                },
                error: function (status, data) {
                    errorFunc(opts, data);
                }
            });
        },
        queryList: function (opts) {
            Ajax.post({
                url: host + '/QueryDrawLog',
                body: JSON.stringify({
                    Guid: sessionStorage.guid,
                    ActivityId: ActivityId,
                    Hash: Util.getHash(ActivityId),
                    Auth: ''
                }),
                success: function (data) {
                    data = JSON.parse(data);
                    if (data.RtCode != '0000') {
                        errorFunc(opts, data);
                        return;
                    }
                    opts.success(data);
                },
                error: function (status, data) {
                    errorFunc(opts, data);
                }
            });
        }
    }

    function errorFunc(opts, data) {
        opts.error(data);
        game.state.start('Notice', true, false, data);
    }
});