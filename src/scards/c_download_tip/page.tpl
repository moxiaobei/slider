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
  line-height: 50px;
}
.result-c-download-tip p {
  margin-left: 8px;
  box-sizing: border-box;
  font-size: 13px;
  font-size: 0.8125rem;
}
.result-c-download-tip p .icon-camera {
  color: #87b9fd;
  font-size: 22px;
  font-size: 1.375rem;
  padding-right: 4px;
  padding-right: 0.25rem;
}
.result-c-download-tip .close {
  width: 30px;
  height: 50px;
  position: absolute;
  top: 0;
  right: 0;
  text-align: center;
}
.result-c-download-tip .close i {
  color: #999;
  font-size: 15px;
}

    </style>
    <div class="{%$cardName%}" id="{%$cardName%}">
        <p><i class="icon icon-camera"></i>下载手机百度，体验完美图像搜索体验！</p>
        <div class="close"><i class="icon icon-close"></i></div>
    </div>
    <script>
        A.init(function () {
            require([ "zepto", "common/lib/env" ], function($, env) {
    var $card = $("#c-download-tip").closest(".result");
    function openApp() {
        if (env.os.ios) {
            var url = "http://m.baidu.com/searchbox?action=reserve&type=baiduchannel&from=1000715p";
            var iframe = $("<iframe>").hide().attr("src", url).appendTo("body");
            setTimeout(function() {
                iframe.remove();
            }, 3e3);
        } else {
            location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=com.baidu.searchbox";
        }
    }
    $card.on("click", function() {
        openApp();
    });
    $card.find(".close").on("click", function() {
        $card.hide();
        return false;
    });
});
        });
    </script>
{%/strip%}{%/block%}
