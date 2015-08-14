<!DOCTYPE html>
<html lang="zh_CN">
<head>
    <meta charset="utf-8">
    <title>{%block name="title"%}百度图像搜索结果{%/block%}</title>
    <meta name="baidu-tc-cerfication" content="cd6d870da0c693352f5418d08194950e">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    {%block name="seo"%}
        <meta name="description" content="百度图像搜索-领先的图像识别技术连接人与信息-为你搜寻所见 官网 百度轻拍是一款基于图像识别技术的搜索工具，是国内第一家成功实现图片对接信息与服务的移动平台。活动海报、商品广告、电影图书，一拍即达，畅享便捷的搜索之旅!">
        <meta name="keywords" content="拍立付,拍照购,轻拍付,识图,以图搜图,图像检索,图像识别,图片识别,图片搜索,图像搜索,识图,搜图,找图,拍图,拍照">
    {%/block%}
    <meta name="format-detection" content="telephone=no">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="author" content="zoumiaojiang, zoumiaojiang@gmail.com">
    <meta name="robots" content="index,follow">
    <meta name="viewport" content="width=device-width,initial-scale=1, maximum-scale=3, minimum-scale=1, user-scalable=no">
    <meta name="apple-mobile-web-app-title" content="百度图像搜索">
    <meta name="format-detection" content="telephone=no">
    <meta name="apple-itunes-app" content="app-id=886565698">
    <meta name="msapplication-TileColor" content="#000">
    <meta name="msapplication-TileImage" content="icon.png">
    <link rel="apple-touch-icon-precomposed" href="//bcscdn.baidu.com/resource/2231bbaa593dfa02f857ce4e47b61a51.png">
    <link rel="apple-touch-icon-precomposed" sizes="114x114" href="//bcscdn.baidu.com/resource/181ac0fbbe3da8968ab903a9f3d6028d.png">
    <link rel="apple-touch-startup-image" href="//bcscdn.baidu.com/resource/8efeace6d71f43dc4bbc7eec8b1bd98a.jpg">
    <link rel="apple-touch-startup-image" sizes="640x960" href="//bcscdn.baidu.com/resource/df9be70cb0d3a133287cddaafa4c0eb5.jpg">
    <link rel="apple-touch-startup-image" sizes="640x1136" href="//bcscdn.baidu.com/resource/d7423d717fa011c01994692aa9089f79.jpg">
    <link rel="shortcut icon" type="image/ico" href="//bcscdn.baidu.com/resource/9f3eadcd4263788593593d82f831940d.ico">
    {%block name="style"%}{%/block%}
    <script src="http://s1.bdstatic.com/r/www/cache/ecom/esl/2-0-6/esl.js"></script>
    <script>
        require.config({
            'baseUrl': '{%$feRoot%}/src',
            'paths': {
                'common': './common',
                'zepto': './common/lib/zepto',
                'openjs': './common/lib/openjs'
            },
            'packages': [
                {
                    'name': 'est',
                    'location': '../dep/est/2.0.3/src',
                    'main': 'lib/index'
                },
                {
                    'name': 'fastclick',
                    'location': '../dep/fastclick/1.0.6/src',
                    'main': 'fastclick'
                }
            ],
            'urlArgs': 'v={edp-variable:version}'
        });
    </script>
    {%block name="head_js"%}{%/block%}
</head>
<body>
    <div id="viewport">
        {%block name="main"%}
        {%/block%}
    </div>
</body>
{%* master模块：该模块构建后将会打包common/ui/* common/lib/**等模块，在此完全加载，避免后续模块单独加载已打包模块 *%}
<script src="{%$feRoot%}/src/common/master.js"></script>
<script>
    require(['common/master'], function (master) {
        master.start();
    });
</script>
{%block name="js"%}
{%/block%}
</html>
