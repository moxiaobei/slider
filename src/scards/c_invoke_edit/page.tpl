/*eslint-disable*/
{%extends file="../c_base.tpl"%}

{%block name="data_modifier"%}
    {%$cardName="c-invoke-edit"%}
    {%$titleflag=false%}
{%/block%}

{%block name="content"%}{%strip%}
    <style>
        .result-c-invoke-edit .c-invoke-edit {
  height: 50px;
  position: relative;
}
.result-c-invoke-edit .icon {
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
.result-c-invoke-edit p {
  box-sizing: border-box;
  font-size: 14px;
  font-size: 0.875rem;
  line-height: 50px;
  padding-left: 54px;
}
.result-c-invoke-edit .close {
  width: 34px;
  height: 34px;
  background-color: #ddd;
  font-size: 15px;
  position: absolute;
  top: 0;
  right: 0;
}

    </style>
    <div class="{%$cardName%} {%$cardName%}-btn">

        <div class="icon"><i></i></div>
        <p>没找到结果？再次编辑框选图中其它内容</p>
        <div class="close"><i></i></div>

    </div>
    <script>
        A.init(function (require) {
            {%*
                // 把当前卡片所需要的业务数据全部挂载到 card.data 上，保持当前作用域内的变量清晰
            *%}
            /**
 * @file 相似图卡片逻辑
 * @author wukaifang(wukaifang@baidu.com)
 */

/* global A Box */
(function () {
    require(['common/ui/invoker'], function (invoker) {
        invoker.initCallEditor();
    });
})();



        });
    </script>
{%/strip%}{%/block%}
