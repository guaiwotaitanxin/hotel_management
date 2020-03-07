layui.use(['jquery','layer','table','form'], function() {
    var $ = layui.jquery,  //实例化jquery对象
        layer = layui.layer,   //实例化弹出层对象
        table = layui.table,   //实例化数据表格对象
        form = layui.form;   //实例化表单对象

    var jsonSelVip = {};

    var checkPhoneIf = false;  //判断手机号的唯一性

    //初始化会员信息
    loadVip();

    //加载销售记录
    function loadVip(){
        table.render({  //底层使用的依然是jquery中的ajax
            elem: '#demo'  //指定数据存放的容器位置
            ,height: 312   //容器的高度
            ,width:1500   //容器的宽度
            ,url: 'vip/loadPageTByPramas' //后台服务器端的数据接口  后台返回的为Map<String,Object>类型的数据，必须将此类型数据JSON化
            ,where :jsonSelVip
            ,limit:3  //每一页显示的数据条数
            ,limits:[2,3,5,8,10]
            ,even:true
            ,page: true //开启分页  Map<String,Object>中的数据有：1.count:数据的条数  2.data:查询出的List<Emp>集合数据  3.code:响应的状态,0为成功  4.msg:响应的结果提示（可以不写）
            ,cols: [[ //表头  每一列   field: 'username'为实体对象的属性名  title: '用户名' 表格的列名  sort: true 根据此列数据进行排序
                {type:'checkbox',align:'center'}
                ,{field: 'id', title: 'ID', width:90, sort: true,align:'center'}
                ,{field: 'customerName', title: '会员姓名', width:160,align:'center'}
                ,{field: 'gender', title: '性别', width: 100, sort: true,align:'center',templet:'#genderTpl'}
                ,{field: 'vipNum', title: '会员编号', width:220, sort: true,align:'center'}
                ,{field: 'vipRate', title: '会员类型', width:120,align:'center',templet:'#vipTypeTpl'}
                ,{field: 'createDate', title: '创建时间', width: 220,align:'center'}
                ,{field: 'idcard', title: '身份证号', width: 220,align:'center'}
                ,{field: 'phone', title: '手机号', width: 180, sort: true,align:'center'}
                ,{title: '操作', width:100, align:'center', toolbar: '#barDemo'} //这里的toolbar值是模板元素的选择器
            ]]
        });
    }

    //监听查询的提交
    form.on('submit(demo2)', function(data){
        jsonSelVip = data.field;
        //重新加载数据表格,当前页自动为1
        loadVip();
        return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
    });

    //监听修改性别
    form.on('switch(switchTest)', function(data){
        var updJsonVipGender = {};
        updJsonVipGender['id'] = data.value;
        var updVipGenderIf = data.elem.checked; //开关是否开启，true或者false
        if(updVipGenderIf){
            updJsonVipGender['gender'] = '1';
        }else {
            updJsonVipGender['gender'] = '0';
        }
        updVipGender(updJsonVipGender);  //执行性别修改
    });

    //监听工具条
    table.on('tool(test)', function(obj) { //注：tool是工具条事件名，test是table原始容器的属性 lay-filter="对应的值"
        var data = obj.data; //获得当前行数据
        var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）

        if (layEvent === 'editVip') { //修改
            //1.进行数据回显
            var oldVipType = '普通会员';
            if(data.vipRate==0.8){
                oldVipType = "超级会员";
            }
            //formTest 即 class="layui-form" 所在元素对应的 lay-filter="" 对应的值
            form.val("updVipForm", {
                "id": data.id
                ,"phone": data.phone // "name": "value"
                ,"oldVipType": oldVipType
            })
            //2.弹框
            layer.open({
                type:1,
                title:'会员信息修改操作界面',
                area:['450px','400px'],
                shade:0.6,
                anim:4,
                content:$("#updVipDiv")
            });
            //3.执行修改
            form.on('submit(demo3)', function(res){
                if(checkPhoneIf){
                    var jsonUpdVip = res.field; //当前容器的全部表单字段，名值对形式：{name: value}
                    delete jsonUpdVip['oldVipType'];
                    layer.closeAll();
                    updVip(jsonUpdVip,obj);
                }else {
                    layer.msg("手机号已存在！！！",{icon:7,time: 2000,shade: 0.5,anim: 6})
                }
                return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
            });
            //验证手机号的唯一性
            $("#phone").blur(function () {
                var phone = $(this).val();
                if(phone!=data.phone&&phone.length==11){
                    //验证手机号
                    checkPhone(phone);
                }
            });

        }
    });

    //根据手机号查询vip单个数据
    function checkPhone(phone) {
        $.ajax({
            type: 'POST',
            url: 'vip/loadTByPramas',
            async:false,  //允许外部变量取到ajax异步加载的数据
            data: {"phone":phone},
            success: function (res) {
                if(res==""){
                    checkPhoneIf = true;
                    layer.tips('该手机号可用。。', '#phone', {tips: [2,'#28cf70'], time:3000});
                }else {
                    checkPhoneIf = false;
                    layer.tips('该手机号已存在', '#phone', {tips: [2,'#c62e3d'], time:3000});
                }
            },
            error: function () {
                layer.msg("服务器异常！！！",{icon:3,time: 2000,shade: 0.5,anim: 4})
            }
        });
    }

    //修改会员信息
    function updVip(jsonUpdVip,obj) {
        $.ajax({
            type: 'POST',
            url: 'vip/updByPrimaryKeySelective',
            data: jsonUpdVip,
            success: function (res) {
                if(res=="success"){
                    //同步更新缓存对应的值
                    obj.update({
                        phone: jsonUpdVip.phone
                        ,vipRate: jsonUpdVip.vipRate
                    });
                    layer.msg("会员信息修改成功。。。",{icon:1,time: 2000,shade: 0.5,anim: 4})
                }else {
                    layer.msg("会员信息修改失败！！！",{icon:2,time: 2000,shade: 0.5,anim: 4})
                }
            },
            error: function () {
                layer.msg("服务器异常！！！",{icon:3,time: 2000,shade: 0.5,anim: 4})
            }
        });
    }

    //修改会员性别
    function updVipGender(updJsonVipGender) {
        $.ajax({
            type: 'POST',
            url: 'vip/updByPrimaryKeySelective',
            data: updJsonVipGender,
            success: function (res) {
                if(res=="success"){
                    layer.msg("会员性别修改成功。。。",{icon:1,time: 2000,shade: 0.5,anim: 4})
                }else {
                    layer.msg("会员性别修改失败！！！",{icon:2,time: 2000,shade: 0.5,anim: 4})
                }
            },
            error: function () {
                layer.msg("服务器异常！！！",{icon:3,time: 2000,shade: 0.5,anim: 4})
            }
        });
    }

});