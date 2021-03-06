$.ajaxPrefilter(function(options) {
    options.url = "http://ajax.frontend.itheima.net" + options.url;
    options.headers = {
        Authorization: localStorage.getItem("token") || "",
    };
    options.complete = function(res) {
        if (
            res.responseJSON.status == 1 &&
            res.responseJSON.message == "身份认证失败！"
        ) {
            console.log(1);

            localStorage.removeItem("token");
            location.href = "/login.html";
        }
    };
});