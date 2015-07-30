{%strip%}
<section class="result">

    {%$titleflag = ture%}

    {%block name="data_modifier"%}{%/blcok%}

    {%if titleflag eq true%}
        <div class="result-title">{%block name="title"%}{%/block%}</div>
    {%/if%}

    <div class="result-wapper">{%block name="content"%}{%/block%}</div>
</section>
{%/strip%}