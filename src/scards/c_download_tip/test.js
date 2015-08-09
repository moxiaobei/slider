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