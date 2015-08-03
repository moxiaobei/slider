{%strip%}

{%$titleflag = ture%}
{%$cardName = "nocard"%}
{%block name="data_modifier"%}{%/block%}
<section class="result result-{%$cardName%}">
    {%if titleflag eq true%}
        <div class="result-title">{%block name="title"%}{%/block%}</div>
    {%/if%}

    <div class="result-body">{%block name="content"%}{%/block%}</div>
</section>
{%/strip%}
