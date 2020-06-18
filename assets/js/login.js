$(function() {
    localStorage.removeItem("token");
    // 点击去注册链接
    $("#goReg").on("click", function() {
        $(".login").hide();
        $(".reg").show();
    });
    // 点击去登录链接
    $("#goLogin").on("click", function() {
        $(".login").show();
        $(".reg").hide();
    });
    // 导入layui form对象
    var form = layui.form;
    // 导入layer对象 用于验证消息的提示框
    var layer = layui.layer;
    // 对表单输入格式进行验证 自定义格式
    form.verify({
        username: [/^[a-zA-Z][\w]{1,15}$/, "首字符必须为字母格式"],
        //我们既支持上述函数式的方式，也支持下述数组的形式
        //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
        pass: [/^[\S\w]{6,12}$/, "密码必须6到12位，且不能出现空格"],
        repass: function(value, item) {
            var password = $(".reg [name=password]").val();
            if (password !== value) {
                return "两次密码不一致";
            }
        },
    });

    // 给注册表单 绑定提交表单事件
    $("#form_reg").on("submit", function(e) {
        e.preventDefault();

        // 获取表单数据
        var data = {
            username: $(".reg [name=username]").val(),
            password: $(".reg [name=password]").val(),
        };
        // 发送ajax请求
        $.post("/api/reguser", data, function(res) {
            if (res.status != 0) {
                return layer.msg("请求失败");
            }
            layer.msg(res.message);
            $("#goLogin").click();
        });
    });

    // 给登录表单 绑定表单提交事件
    $("#form_login").on("submit", function(e) {
        e.preventDefault();
        //    获取表单数据
        var data = $(this).serialize();
        $.ajax({
            method: "POST",
            url: "/api/login",
            data: data,
            success: function(res) {
                if (res.status != 0) {
                    return layer.msg("请求失败");
                }
                layer.msg(res.message);
                localStorage.setItem("token", res.token);
                location.href = "/index.html";
            },
        });
    });
});