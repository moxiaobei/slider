/*eslint-disable*/
exports.input = __dirname;

var path = require( 'path' );
var fs = require('fs');
exports.output = path.resolve( __dirname, 'output' );

// var moduleEntries = 'html,htm,phtml,tpl,vm,js';
// var pageEntries = 'html,htm,phtml,tpl,vm';

exports.getProcessors = function () {
    var lessProcessor = new LessCompiler();
    var cssProcessor = new CssCompressor();
    var moduleProcessor = new ModuleCompiler();
    var jsProcessor = new JsCompressor();
    var pathMapperProcessor = new PathMapper();
    var addCopyright = new AddCopyright();


    // 对tpl中的smarty输出变量escape
    var tplEscaper = {
        files: [
            'src/**/*.tpl'
        ],
        name: 'tplEscaper',
        process: function (file, processContext, callback) {
            file.setData(
                file.data.replace(/(\{%\s*\$.*?)(%\})/g, function (match, start, end) {
                    if (match.indexOf('escape') == -1 && match.indexOf('=') == -1) {
                        return start + '|escape:html' + end;
                    }
                    return match;
                })
            );
            callback();
        }
    };

    var now = new Date();
    var month = now.getMonth() + 1;
    var yyyyMMdd = now.getFullYear() + (month < 10 ? '0' : '') + month + now.getDate();
    var variable = new VariableSubstitution({
        files: ['*.tpl'],
        variables: {
            version: process.env.BUILD_NUMBER || yyyyMMdd
        }
    });

    var tplCoper = {
        files: [
            '*.tpl'
        ],
        name: 'tplCoper',
        process: function (file, processContext, callback) {
            var sep = path.sep;
            var tplPath = file.path.replace('src' + sep, 'output' + sep + 'template' + sep);
            var pathArr = tplPath.split(sep);
            var curPath = __dirname;
            for (var i = 0, len = pathArr.length; i < len - 1; i++) {
                curPath = path.resolve(curPath, pathArr[i]);
                if (!fs.existsSync(curPath)) {
                    fs.mkdirSync(curPath);
                }
            }
            fs.writeFileSync(tplPath, file.data);
            callback();
        }
    }

    var cleanerProcessor = new OutputCleaner({
        files: ['*.tpl']
    });

    // 把第二步生成的tpl.js文件从src目录移除
    var buildScards = {
        files: [
            'src/scards/**/_page.tpl'
        ],
        name: 'buildScards',
        process: function (file, processContext, callback) {
            var execSync = require('child_process').execSync;

            var fs = require('fs');
            var pageSrcPath = file.fullPath;
            var pageDir = path.dirname(file.fullPath);
            var pagePath = path.join(pageDir,  'page.tpl');
            var content = file.data;

            var reg = /{%\*include\s+file\s*=\s*"?(.*?)"?\s*\*%}/gi;

            function getCompressContent(path) {
                var cmdPath = '/usr/local/lib/node_modules/edp-build/node_modules/uglify-js/bin/uglifyjs';
                var cmd = [cmdPath, path, '--compress'];

                var output = execSync(
                    cmd.join(' '),
                    {encoding: 'utf-8'}
                );
                return output;
            }

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
                // console.log(ext);
                if (ext === '.js') {
                    content = content.replace(str, getCompressContent(resPath));
                    next();
                }

                if (ext === '.less' || ext === '.css') {
                    // var destPath = path.join(pageDir,  'page.css');
                    var cmd = ['lessc ', resPath, '--compress'];
                    var output = execSync(
                        cmd.join(' '),
                        {encoding: 'utf-8'}
                    );
                    content = content.replace(str, output);
                    // console.log('less: ', content);
                    next();
                }
            }

            function next() {
                result = reg.exec(content);
                if (result != null) {
                    doHandler(result);
                }
                else {
                    fs.writeFileSync(pagePath, '/*eslint-disable*/\n' + content);
                    callback();
                    // complete(content);
                }
            }

            next();
        }
    };

    var replaceFile = {
        files: [
            'src/search/**/*.tpl'
        ],
        name: 'replaceFile',
        process: function (file, processContext, callback) {
            var execSync = require('child_process').execSync;

            var fs = require('fs');
            var dir = path.dirname(file.fullPath);
            var content = file.data;

            var reg = /{%\*include\s+file\s*=\s*"?(.*?)"?\s*\*%}/gi;

            function getCompressContent(path) {
                var cmdPath = '/usr/local/lib/node_modules/edp-build/node_modules/uglify-js/bin/uglifyjs';
                var cmd = [cmdPath, path, '--compress'];

                var output = execSync(
                    cmd.join(' '),
                    {encoding: 'utf-8'}
                );
                return output;
            }

            function doHandler(result) {
                var str = result[0];
                var resName = result[1];
                var resPath = path.resolve(dir, resName);
                console.log('match: ', resPath);

                // 文件不存在
                if (!fs.existsSync(resPath)) {
                    console.log('match: ', resPath, ' not exist' );
                    next();
                }

                var ext = path.extname(resPath);
                var resourceCont = fs.readFileSync(resPath, {encoding:'utf8'});
                // console.log(ext);
                if (ext === '.js') {
                    content = content.replace(str, getCompressContent(resPath));
                    next();
                }

                if (ext === '.less' || ext === '.css') {
                    // var destPath = path.join(pageDir,  'page.css');
                    var cmd = ['lessc ', resPath, '--compress'];
                    var output = execSync(
                        cmd.join(' '),
                        {encoding: 'utf-8'}
                    );
                    content = content.replace(str, output);
                    // console.log('less: ', content);
                    next();
                }
            }

            function next() {
                result = reg.exec(content);
                if (result != null) {
                    doHandler(result);
                }
                else {
                    file.setData(content);
                    // fs.writeFileSync(pagePath, '/*eslint-disable*/\n' + content);
                    callback();
                    // complete(content);
                }
            }

            next();
        }
    };


    return {
        'default': [
            lessProcessor, buildScards, moduleProcessor, pathMapperProcessor,

            variable, tplCoper, cleanerProcessor
        ],
        'release': [
            lessProcessor, replaceFile, buildScards, cssProcessor, moduleProcessor,
            jsProcessor, pathMapperProcessor, addCopyright,

            // 模板相关
            variable, addCopyright, tplEscaper, tplCoper, cleanerProcessor
        ]
    };
};


exports.exclude = [
    'tool',
    'doc',
    'test',
    'module.conf',
    'package.json',
    'README',
    'dep/packages.manifest',
    'dep/*/*/test',
    'dep/*/*/doc',
    'dep/*/*/demo',
    'dep/*/*/tool',
    'dep/*/*/*.md',
    'mock/*',
    'dep/*/*/package.json',
    'edp-*',
    '.edpproj',
    '.svn',
    '.git',
    '.gitignore',
    '.idea',
    '.project',
    'Desktop.ini',
    'Thumbs.db',
    '.DS_Store',
    'node_modules',
    '.scm',
    '*.sh',
    '*.tmp',
    '*.bak',
    '*.swp'
];

exports.injectProcessor = function ( processors ) {
    for ( var key in processors ) {
        global[ key ] = processors[ key ];
    }
};

