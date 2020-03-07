layui.use(['jquery','layer','table','form','laydate'], function() {
    var $ = layui.jquery,  //实例化jquery对象
        layer = layui.layer,   //实例化弹出层对象
        table = layui.table,   //实例化数据表格对象
        form = layui.form,    //实例化表单对象
        laydate = layui.laydate;  //实例化日期对象

    //初始化可入住的房间信息
    loadRoomsByRoomStatus(0);

    laydate.render({
        elem: '#create_date'
        ,type: 'datetime'
        ,format: 'yyyy/MM/dd HH:mm:ss'
        ,min:0  //当前时间之前的最小时间不存在，表明只能选择当前时间之后的时间
        ,calendar: true  //开启标注公历的节日
        ,value: new Date()
    });

    //监听是否会员选择单选框
    form.on('radio(isVip)', function(data){
        $("form").eq(0).find("input:text").val("");
        var value= data.value; //被点击的radio的value值
        if(value=='1'){  //是会员
            //除了会员卡号可以填写，其它的均不可以填写（姓名，性别，身份证号，手机号）
            $("#vip_num").removeAttr("disabled");
            $("#customerName").attr("disabled","disabled");
            $("#idcard").attr("disabled","disabled");
            $("#phone").attr("disabled","disabled");
            $("#genderDiv").find("input:radio").attr("disabled","disabled");
            form.render("radio");  //渲染单选框
        }else {  //非会员
            //除了会员卡号不可以填写，其它的均可以填写（姓名，性别，身份证号，手机号）
            $("#vip_num").attr("disabled","disabled");
            $("#customerName").removeAttr("disabled");
            $("#idcard").removeAttr("disabled");
            $("#phone").removeAttr("disabled");
            $("#genderDiv").find("input:radio").removeAttr("disabled");
            form.render("radio");  //渲染单选框
        }
    });

    //给会员卡号的输入框绑定失去焦点事件
    $("#vip_num").blur(function () {
       var vipNum = $(this).val();
       if(vipNum.length==16){
           //向服务器端发送请求查询单个会员数据
           loadVipByVipNum(vipNum);
       }else {
           layer.tips('卡号格式输入有误！', '#vip_num', {tips: [2,'#fc1505'], time:3000});
       }
    });

    //入住信息添加的监听
    form.on('submit(demo1)', function(data){
        var jsonSaveINI = data.field //当前容器的全部表单字段，名值对形式：{name: value}
        delete jsonSaveINI['vipNum'];
        jsonSaveINI['status'] = '1';
        jsonSaveINI['outRoomStatus'] = '0';
        saveINI(jsonSaveINI);  //执行入住信息的添加
        return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
    });

    //自定义验证
    form.verify({
        //money：自定义的验证的名字
        money: function(value, item){ //value：表单的值、item：表单的DOM对象
            if(value<=100||value>=1000){
                return '押金范围在100-1000之内';
            }
        }
        ,customerName: [/^[\S]{2,6}$/,'客人姓名必须2到6位，且不能出现空格']
    });

    //根据会员卡号查询单个会员数据
    function loadVipByVipNum(vipNum) {
        $.ajax({
            type:'POST',
            url:'vip/loadTByPramas',
            data:{"vipNum":vipNum},
            success:function (res) {
                if(res!=''){
                    layer.tips('存在该会员！！！', '#vip_num', {tips: [2,'#28cf70'], time:3000});
                    //formTest 即 class="layui-form" 所在元素对应的 lay-filter="" 对应的值
                    form.val("example", {
                        "customerName": res.customerName // "name": "value"
                        ,"gender": res.gender
                        ,"idcard": res.idcard
                        ,"phone": res.phone
                    })

                }else {
                    layer.tips('不存在该会员！！！', '#vip_num', {tips: [2,'#fc1505'], time:3000});
                }
            },
            error:function () {
                layer.msg("服务器异常！！！",{icon: 3,time: 2000,shade: 0.5,anim: 4})
            }

        });
    }

    //根据房屋状态查询多个房间数据
    function loadRoomsByRoomStatus(roomStatus) {
        $.ajax({
            type:'POST',
            url:'rooms/loadManyTByPramas',
            data:{"roomStatus":roomStatus},
            success:function (res) {
                var roomStr = '<option value="">--请选择房间--</option>';
                $.each(res,function (i,room) {
                    roomStr += '<option value="'+room.id+'">'+room.roomNum+'-'+room.roomType.roomTypeName+'-'+room.roomType.roomPrice+'</option>'
                });
                $("#selRoomNumId").html(roomStr);
                form.render("select");  //渲染下拉框
            },
            error:function () {
                layer.msg("服务器异常！！！",{icon: 3,time: 2000,shade: 0.5,anim: 4})
            }
        });
    }

    //入住信息的添加
    function saveINI(jsonSaveINI) {
        $.ajax({
            type:'POST',
            url:'inRoomInfo/saveT',
            data:jsonSaveINI,
            success:function (res) {
                if(res=='success'){
                    //定时器：2s之后跳转到入住信息显示页面
                    setTimeout('window.location="model/toShowInRoomInfo"',2000);
                    layer.msg("入住信息添加成功。。。",{icon: 1,time: 2000,shade: 0.5,anim: 4})
                }else {
                    layer.msg("入住信息添加失败！！！",{icon: 2,time: 2000,shade: 0.5,anim: 4})
                }
            },
            error:function () {
                layer.msg("服务器异常！！！",{icon: 3,time: 2000,shade: 0.5,anim: 4})
            }

        });
    }

});