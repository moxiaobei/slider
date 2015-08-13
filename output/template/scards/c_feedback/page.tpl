{%extends file="../c_base.tpl"%}

{%block name="data_modifier"%}
    {%$cardName="c-feedback"%}
    {%$titleflag=false%}
{%/block%}

{%block name="content"%}{%strip%}
    <style>
        .result-c-feedback .c-feedback-a{display:block;width:100%;height:45px;line-height:45px;background-image:linear-gradient(to bottom, #f3f3f3, #e5e5e5);background-repeat:repeat;color:#4c4c4c;text-decoration:none;border:1px solid #ccc;text-align:center;font-size:14px;font-size:0.875rem}.result-c-feedback .c-feedback-a:hover{color:#4c4c4c;text-decoration:none}.result-c-feedback .c-feedback-a i{color:#666;padding-right:10px;font-size:15px}
    </style>
    <div class="{%$cardName|escape:html%}">
        <a class="{%$cardName|escape:html%}-a" href="#" target="_blank">
            <i class="icon icon-tip"></i>告诉我们你想要的
        </a>
    </div>
    <script>
        A.init(function (require) {
            !function(){var env=require("common/lib/env"),Box=require("openjs"),feedback=document.querySelector(".c-feedback-a");if(feedback){var url="http://ufosdk.baidu.com/?m=Client&a=postView&appid=284&needEmail=false&webURL="+encodeURIComponent(window.location.href)+"&placeholder="+encodeURIComponent("请输入您的问题或建议")+"&ajax=0";feedback.setAttribute("href",url),env.ready(function(){Box.os.ios&&Box.version_compare(Box.version,"6.2")>=0&&feedback.addEventListener("click",function(ev){Box.ios.invokeApp("utilsfeedback",{params:encodeURIComponent(JSON.stringify({source:"image",refer:window.top.location.href})),minver:encodeURIComponent("6.2.0.0")}),ev.preventDefault()})})}}();
        });
    </script>
{%/strip%}{%/block%}
