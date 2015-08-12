/*eslint-disable*/
{%extends file="../c_base.tpl"%}

{%block name="data_modifier"%}
    {%$cardName="c-invoke-edit"%}
    {%$titleflag=false%}
{%/block%}

{%block name="content"%}{%strip%}
    <style>
        .result-c-invoke-edit .c-invoke-edit{height:50px;position:relative;line-height:50px}.result-c-invoke-edit p{margin-left:15px;box-sizing:border-box;font-size:13px;font-size:0.8125rem}.result-c-invoke-edit p .icon{font-size:20px;font-size:1.25rem;padding-right:8px}.result-c-invoke-edit .close{width:50px;height:50px;position:absolute;top:0;right:0;text-align:center}.result-c-invoke-edit .close i{color:#999;font-size:20px}
    </style>
    <div class="{%$cardName%} {%$cardName%}-btn" id="c-invoke-edit">
        <p><i class="icon icon-edit"></i>没找到结果？再次编辑框选图中其它内容</p>
        <div class="close"><i class="icon icon-close"></i></div>
    </div>
    <script>
        A.init(function (require) {
            {%*
                // 把当前卡片所需要的业务数据全部挂载到 card.data 上，保持当前作用域内的变量清晰
            *%}
            !function(){require(["common/lib/invoker","common/widget/attatch"],function(invoker,Attatch){invoker.initCallEditor();var $=require("zepto"),$card=$("#c-invoke-edit").closest(".result"),attatch=new Attatch({main:$card});$card.find(".close").on("click",function(){return $card.hide(),attatch.dispose(),attatch=null,!1})})}();
        });
    </script>
{%/strip%}{%/block%}
