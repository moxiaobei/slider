/*eslint-disable*/
exports.port = 8848;
exports.directoryIndexes = true;
exports.documentRoot = __dirname;
exports.getLocations = function () {
    return [
        { 
            location: /\/$/, 
            handler: home( 'index.html' )
        },
        { 
            location: /^\/redirect-local/, 
            handler: redirect('redirect-target', false) 
        },
        { 
            location: /^\/redirect-remote/, 
            handler: redirect('http://www.baidu.com', false) 
        },
        { 
            location: /^\/redirect-target/, 
            handler: content('redirectd!') 
        },
        { 
            location: '/empty', 
            handler: empty() 
        },
        { 
            location: /\.css($|\?)/, 
            handler: [
                autocss()
            ]
        },
        { 
            location: /\.less($|\?)/, 
            handler: [
                file(),
                less()
            ]
        },
        { 
            location: /\.styl($|\?)/, 
            handler: [
                file(),
                stylus()
            ]
        },
        {
            location: function (req) {
                var pathname = req.pathname;
                var paths = [
                    '/api/proxy/search',
                    '/api/log'
                ];
                for (var i = 0, len = paths.length; i < len; i++) {
                    if (new RegExp(paths[i]).test(pathname)) {
                        return true;
                    }
                }
                return false;
            },
            handler: [
                proxy('dev058.baidu.com', 8092)
            ]
        },
        // ajax
        {
            location: function (req) {
                return req.query.isajax;
            },
            handler: [
                php('php-cgi', '', function (context) {

                    var request = context.request;
                    var pathname = request.pathname;
                    var search = request.search || '';
                    var query = request.query || {};

                    return {
                        pathname: '/mock/ajax.php',
                        search: search + (search.indexOf('?') === -1 ? '?' : '&') + 'pathname=' + pathname + '&webroot=' + __dirname
                    };
                })
            ]
        },
        // 后缀为php的请求重定向
        {
            location: function (req) {
                return /\.php($|\?)/.test(req.pathname) || !(/\./.test(req.pathname));
            },
            handler: [
                php('php-cgi', '', function (context) {

                    var request = context.request;
                    var pathname = request.pathname;
                    var search = request.search || '';
                    var query = request.query || {};

                    return {
                        pathname: '/mock/index.php',
                        search: search + (search.indexOf('?') === -1 ? '?' : '&') + 'pathname=' + pathname + '&webroot=' + __dirname
                    };
                }),
                livereload({
                    port: 8899
                })
            ]
        },
        {
            location: /^.*$/,
            handler: [
                file(),
                proxyNoneExists()
            ]
        }
    ];
};

exports.overrideProxyRequestHeader = function (reqHeaders) {
    if (/^(localhost|x.baidu.com)/.test(reqHeaders.host)) {
        delete reqHeaders.host;
    }
};

exports.injectResource = function ( res ) {
    for ( var key in res ) {
        global[ key ] = res[ key ];
    }
};
