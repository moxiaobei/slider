<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <title>{%block name="title"%}{%/block%}</title>
    {%block name="seo"%}{%/block%}
    <meta name="format-detection" content="telephone=no">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="viewport" content="width=device-width,initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no">
    {%block name="style"%}{%/block%}
    <script src="http://s1.bdstatic.com/r/www/cache/ecom/esl/1-8-2/esl.js"></script>
    <script src="{%$feRoot%}/src/common/libs/zepto.js"></script>
    <script src="{%$feRoot%}/src/common/libs/aio.js"></script>
    <div id='wx_pic' style='margin:0 auto;display:none;'>
        {%block name="weixinShareImg"%}
            <img src="http://bcscdn.baidu.com/resource/f0f61fe1023536a436b64d696a6a36bb.jpg" alt="百度活动"/>
        {%/block%}
    </div>
</head>
<body>
    <div id="viewport">
        {%block name="main"%}
        {%/block%}
    </div>
</body>
<script>
    require.config({
        'baseUrl': '{%$feRoot%}/src',
        'paths': {
            'common': './common'
        },
        'packages': [{
            'name': 'est',
            'location': '../dep/est/2.0.3/src',
            'main': 'lib/index'
        }],
        urlArgs: 'v={edp-variable:version}'
    });

    require(['activity/common/main'], function (main) {
        main.enter({
            query: '{%$tplData.query|escape:javascript%}'
        });
    });
</script>
{%block name="js"%}{%/block%}
</html>