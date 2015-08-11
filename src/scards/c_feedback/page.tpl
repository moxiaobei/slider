/*eslint-disable*/
{%extends file="../c_base.tpl"%}

{%block name="data_modifier"%}
    {%$cardName="c-feedback"%}
    {%$titleflag=false%}
{%/block%}

{%block name="content"%}{%strip%}
    <style>
        .result-c-feedback .c-feedback-a {
  display: block;
  width: 100%;
  height: 45px;
  line-height: 45px;
  background-image: linear-gradient(to bottom, #f0f0f0, #e5e5e5);
  background-repeat: repeat;
  color: #4c4c4c;
  text-decoration: none;
  border: 1px solid #ccc;
  text-align: center;
}
.result-c-feedback .c-feedback-a:hover {
  color: #4c4c4c;
  text-decoration: none;
}
.result-c-feedback .c-feedback-ico {
  background-image: url(feedback.png?__inline);
  background-size: 18px 17px;
  background-repeat: no-repeat;
  background-position: 0 50%;
  padding-left: 28px;
  font-size: 15px;
}

    </style>
    <div class="{%$cardName%}">
        <a class="{%$cardName%}-a" href="#" target="_blank">
            <span class="{%$cardName%}-ico">告诉我们你想要的</span>
        </a>
    </div>
    <script>
        A.init(function (require) {
            {%* // 把当前卡片所需要的业务数据全部挂载到 card.data 上，保持当前作用域内的变量清晰*%}
            var card = this;
            card.data = {
                ajaxUrl: '{%$tplData.ajaxUrl|escape:"javascript"%}'
            };

            (function() {
    var $ = require("zepto");
    var env = require("common/widget/env");
    var Box = require("openjs");
    console.log(Box);
    var feedback = document.querySelector(".bdbox_feedback-a");
    if (feedback) {
        var url = "http://ufosdk.baidu.com/" + "?m=Client" + "&a=postView" + "&appid=284" + "&needEmail=false" + "&webURL=" + encodeURIComponent(window.location.href) + "&placeholder=" + encodeURIComponent("请输入您的问题或建议") + "&ajax=0";
        feedback.setAttribute("href", url);
        env.ready(function() {
            if (Box.os.ios && Box.version_compare(Box.version, "6.2") >= 0) {
                feedback.addEventListener("click", function(ev) {
                    Box.ios.invokeApp("utilsfeedback", {
                        params: encodeURIComponent(JSON.stringify({
                            source: "image",
                            refer: window.top.location.href
                        })),
                        minver: encodeURIComponent("6.2.0.0")
                    });
                    ev.preventDefault();
                });
            }
        });
    }
})();
        });
    </script>
{%/strip%}{%/block%}
