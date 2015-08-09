/*eslint-disable*/
{%extends file="../c_base.tpl"%}

{%block name="data_modifier"%}
    {%$cardName="c-download-tip"%}
    {%$titleflag=false%}
{%/block%}

{%block name="content"%}{%strip%}
    <style>
        .result-c-download-tip .c-download-tip {
  height: 50px;
  position: relative;
}
.result-c-download-tip .icon {
  width: 34px;
  height: 34px;
  border-radius: 3px;
  background-color: #ddd;
  text-align: center;
  margin-left: 10px;
  position: absolute;
  top: 0;
  left: 0;
}
.result-c-download-tip p {
  box-sizing: border-box;
  font-size: 14px;
  font-size: 0.875rem;
  line-height: 50px;
  padding-left: 54px;
}
.result-c-download-tip .close {
  width: 34px;
  height: 34px;
  background-color: #ddd;
  font-size: 15px;
  position: absolute;
  top: 0;
  right: 0;
}

    </style>
    <div class="{%$cardName%}" id="{%$cardName%}">
        <div class="icon"><i></i></div>
        <p>下载手机百度，体验完美图像搜索体验！</p>
        <div class="close"><i></i></div>
    </div>
    <script>
        A.init(function (require) {
            {%*
                // 把当前卡片所需要的业务数据全部挂载到 card.data 上，保持当前作用域内的变量清晰
            *%}
            var card = this;
            card.data = {
                ajaxUrl: '{%$tplData.ajaxUrl|escape:"javascript"%}'
            };

            (function() {
    var $ = require("zepto");
    var env = require("common/widget/env");
    function openApp() {
        if (env.os.ios) {
            var url = "http://m.baidu.com/searchbox?action=reserve&type=baiduchannel&from=1000715p";
            var iframe = $("<iframe>").hide().attr("src", url).appendTo("body");
            setTimeout(function() {
                iframe.remove();
            }, 3e3);
        } else {
            var url = "http://a.app.qq.com/o/simple.jsp?pkgname=com.baidu.searchbox";
            location.href = url;
        }
    }
    $("#c-download-tip").on("click", function() {
        openApp();
    });
})();
        });
    </script>
{%/strip%}{%/block%}
