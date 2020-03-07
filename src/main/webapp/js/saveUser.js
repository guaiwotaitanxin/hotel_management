layui.use(['jquery','layer','table','form','laydate'], function() {
    var $ = layui.jquery,  //实例化jquery对象
        layer = layui.layer,   //实例化弹出层对象
        table = layui.table,   //实例化数据表格对象
        form = layui.form,    //实例化表单对象
        laydate = layui.laydate;  //实例化日期对象

    var checkUserNameIf = false;

    loadAllRole();  //初始化所有的角色数据

    //自定义验证
    form.verify({
        username: function(value, item){ //value：表单的值、item：表单的DOM对象
            if(value.length<4||value.length>12){
                return '用户名长度范围在4-12之内';
            }
        }
        ,pwd: [/^[\S]{6,18}$/,'登录密码必须6到18位，且不能出现空格']
        ,pwd2: function(value, item){ //value：表单的值、item：表单的DOM对象
            var pwdVal = $("#pwd").val();
            if(value!=pwdVal){
                return '两次密码不一致';
            }
        }
    });

    //验证用户账号唯一性
    $("#username").click(function () {
        var userName = $(this).val();
        if(userName.length>=4&&userName.length<=12){
            checkUserName(userName);  //验证用户账号
        }
    });

    //执行会员的添加监听
    form.on('submit(demo2)', function(res){
        if(checkUserNameIf){
            var jsonSaveUser = res.field; //当前容器的全部表单字段，名值对形式：{name: value}
            jsonSaveUser['createDate'] = getNowDate(new Date());
            jsonSaveUser['useStatus'] = '1';
            saveUser(jsonSaveUser);
        }else {
            layer.tips('该用户账号已存在', '#username', {tips: [2,'#c62e3d'], time:3000});
        }
        return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
    });

    //根据用户账号查询用户单个数据
    function checkUserName(userName) {
        $.ajax({
            type: 'POST',
            url: 'user/loadTByPramas',
            async:false,  //允许外部变量取到ajax异步加载的数据
            data: {"username":userName},
            success: function (res) {
                if(res==""){
                    checkUserNameIf = true;
                    layer.tips('该用户账号可用。。', '#username', {tips: [2,'#28cf70'], time:3000});
                }else {
                    checkUserNameIf = false;
                    layer.tips('该用户账号已存在', '#username', {tips: [2,'#c62e3d'], time:3000});
                }
            },
            error: function () {
                layer.msg("服务器异常！！！",{icon:3,time: 2000,shade: 0.5,anim: 4})
            }
        });
    }

    //加载所有角色
    function loadAllRole(){
        $.ajax({
            type: 'POST',
            url: 'roles/loadAllT',
            success: function (res) {
                var roleStr = '<option value="">---请选择用户角色---</option>';
                $.each(res,function (i,role) {
                    roleStr += '<option value="'+role.id+'">'+role.roleName+'</option>';
                });
                $("#roles").html(roleStr);
                form.render("select");
            },
            error: function () {
                layer.msg("服务器异常！！！",{icon:3,time: 2000,shade: 0.5,anim: 4})
            }
        });
    }

    //获取当前时间字符串     Date()   ---->  yyyy/MM/dd HH:mm:ss 格式的字符串
    function getNowDate(date) {
        var sign1 = "/";
        var sign2 = ":";
        var year = date.getFullYear() // 年
        var month = date.getMonth() + 1; // 月
        var day  = date.getDate(); // 日
        var hour = date.getHours(); // 时
        var minutes = date.getMinutes(); // 分
        var seconds = date.getSeconds() //秒
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (day >= 0 && day <= 9) {
            day = "0" + day;
        }
        if (hour >= 0 && hour <= 9) {
            hour = "0" + hour;
        }
        if (minutes >= 0 && minutes <= 9) {
            minutes = "0" + minutes;
        }
        if (seconds >= 0 && seconds <= 9) {
            seconds = "0" + seconds;
        }
        var currentdate = year + sign1 + month + sign1 + day + " " + hour + sign2 + minutes + sign2 + seconds ;
        return currentdate;
    }

    //添加平台用户信息
    function saveUser(jsonSaveUser) {
        $.ajax({
            type: 'POST',
            url: 'user/saveT',
            data: jsonSaveUser,
            success: function (res) {
                if(res=="success"){
                    setTimeout('window.location="model/toShowUser"',2000);
                    layer.msg("平台用户信息添加成功。。。",{icon:1,time: 2000,shade: 0.5,anim: 4})
                }else {
                    layer.msg("平台用户信息添加失败！！！",{icon:2,time: 2000,shade: 0.5,anim: 4})
                }
            },
            error: function () {
                layer.msg("服务器异常！！！",{icon:3,time: 2000,shade: 0.5,anim: 4})
            }
        });
    }



});