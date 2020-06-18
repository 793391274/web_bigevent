$(function() {
    var layer = layui.layer;
    // 获取用户信息
    getUserInfo();
    $("#edit").on("click", function() {
        localStorage.token = "";
        location.href = "/login.html";
    });
});

// 获取用户信息及渲染用户头像
function getUserInfo() {
    $.ajax({
        method: "GET",
        url: "/my/userinfo",
        success: function(res) {
            if (res.status != 0) {
                return layer.msg("获取用户信息失败");
            }
            var userPic = res.data.user_pic;
            var firstCase = res.data.username[0].toUpperCase();
            if (userPic) {
                $(".avatar-box img").show();
                $(".avatar").hide();
            } else {
                $(".avatar-box img").hide();
                $(".avatar").html(firstCase).show();
            }
            $("#avatarText").html("欢迎&nbsp&nbsp" + res.data.username);
        },
    });
}