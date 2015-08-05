/*eslint-disable*/
var fs = require('fs');
var path = require('path');
var execSync = require('child_process').execSync;

exports.port = 8848;
exports.directoryIndexes = true;
exports.documentRoot = __dirname;
exports.getLocations = function () {
    return [
        {
            location: /\/$/,
            handler: home( 'index.html' )
        },

        // 特殊公共资源处理
        {
            location: /\.css($|\?)/,
            handler: [
                publicResourceHandler(),
                autocss()
            ]
        },
        {
            location: /\.(less)($|\?)/,
            handler: [
                publicResourceHandler(),
                file(),
                less()
            ]
        },
        {
            location: /\.(styl|stylus)($|\?)/,
            handler: [
                publicResourceHandler(),
                file(),
                stylus()
            ]
        },

        // Wise搜索和log转发到测试环境
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

        // php 处理
        {
            location: /\.php($|\?)/,
            handler: [
                phpHandler(),
                livereload()
            ]

        },

        // 处理剩余请求
        {
            location: /^.*$/,
            handler: [
                remainHandler(),
                livereload()
            ]
        }
    ];
};

exports.injectResource = function (res) {
    for (var key in res) {
        global[key] = res[key];
    }
};

// 对每一次资源文件请求进行处理
function publicResourceHandler() {
    return function (context) {
        // 禁止浏览器端缓存
        context.header['Cache-Control'] = 'no-cache, must-revalidate';
        var req = context.request;
        var path = req.pathname;
        // context.request.pathname = path.replace(/^\/public\//, '/');
    };
}

// 后缀为php的文件，直接进行处理
function phpHandler() {
    return [
        php()
    ];
}

// 处理找不到具体文件的，
// 若请求路径是一个文件，则返回， 不是，则认为是伪静态路径，转发到php-cgi处理, 如：/search
function remainHandler() {

    var phpFn = php('php-cgi', '', function (context) {
        var req = context.request;
        var path = req.pathname || '';
        var search = req.search || '';

        search = search
                + (search.indexOf('?') === -1 ? '?' : '&')
                + '__mypathname__='
                + path

        console.log('php request with >>>>', '/mock/lib/main.php' + search);

        return {
            pathname: '/mock/lib/main.php',
            search: search
        };
    });

    var fileFn = file();

    return [
        function (context) {
            var req = context.request;
            var path = req.pathname;
            var filepath = exports.documentRoot + req.pathname;
            if (isAccessScard(context)) {
                scardHander(context, function () {
                    phpFn(context);
                });
            }
            else {
                // 若请求路径是一个文件，则返回， 不是，则认为是伪静态路径，转发到php-cgi处理
                if (fs.existsSync(filepath) && fs.statSync(filepath).isFile()) {
                    fileFn(context);
                }
                else {
                    phpFn(context);
                }
            }

        }
    ];
}

function isAccessScard(context) {
    console.log(context.request.pathname);
    if ((/^\/scards\//).test(context.request.pathname) &&
        !(/^\/scards\/.+?\/pages\//).test(context.request.pathname) ) {
        return true;
    }
    else {
        return false;
    }
}

function scardHander(context, callback) {

    var req = context.request;
    var pathname = req.pathname;
    var srcDir = path.join(exports.documentRoot, 'src');
    var pageDir = path.join(srcDir,  pathname);
    var pageSrcPath = path.join(pageDir,  '_page.tpl');
    var pagePath = path.join(pageDir,  'page.tpl');

    if (!fs.existsSync(pageSrcPath)) {
        callback();
        return;
    }

    var content = fs.readFileSync(pageSrcPath, {encoding:'utf8'});
    // console.log(content);
    var conf = {
        debug: true
    };

    //
    function complete(cont) {
        console.log('cont: ', cont);
        fs.writeFileSync(pagePath, '/*eslint-disable*/\n' + cont);
        callback();
    }

    var reg = /{%\*include\s+file\s*=\s*"?(.*?)"?\s*\*%}/gi;

    function doHandler(result) {
        var str = result[0];
        var resName = result[1];
        var resPath = path.resolve(pageDir, resName);
        console.log('match: ', resPath);

        // 文件不存在
        if (!fs.existsSync(resPath)) {
            console.log('match: ', resPath, ' not exist' );
            next();
        }

        var ext = path.extname(resPath);
        var resourceCont = fs.readFileSync(resPath, {encoding:'utf8'});
        console.log(ext);
        if (ext === '.js') {
            console.log('js: ', str, '   ',   resPath );
            console.log(resourceCont);
            content = content.replace(str, resourceCont);

            next();
        }

        if (ext === '.less' || ext === '.css') {

            // console.log(exec);
            var cmd = ['lessc ', resPath];
            // if (!conf.debug) {
            //     cmd.push('-x');
            // }
            var output = execSync(
                cmd.join(' '),
                {encoding: 'utf-8'},
                function (error, stdout, stderr) {
                    console.log('stdout: ' + stdout);
                    console.log('stderr: ' + stderr);
                    if (error !== null) {
                      console.log('exec error: ' + error);
                    }


                }
            );
            content = content.replace(str, output);
            console.log('less: ', content);
            next();
        }
    }

    function next() {
        result = reg.exec(content);
        if (result != null) {
            doHandler(result);
        }
        else {
            complete(content);
        }
    }

    next();
}
