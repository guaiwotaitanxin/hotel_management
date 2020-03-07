layui.use(['jquery','layer','table','form','laydate'], function() {
    var $ = layui.jquery,  //实例化jquery对象
        layer = layui.layer,   //实例化弹出层对象
        table = layui.table,   //实例化数据表格对象
        form = layui.form,    //实例化表单对象
        laydate = layui.laydate;  //实例化日期对象

    var currentPage = 1;  //当前页，初始值为1

    var jsonSelINI = {};  //定义空的json数据

    var vipRate = 1;  //会员折扣

    loadINI();  //数据的初始化

    //日期时间选择器
    laydate.render({
        elem: '#endDate'
        ,value: new Date()
        ,format:'yyyy/MM/dd HH:mm:ss'
        ,type: 'datetime'
    });

    //数据的表格的方法级渲染
    function loadINI(){
        table.render({  //底层使用的依然是jquery中的ajax
            elem: '#demo'  //指定数据存放的容器位置
            ,height: 312   //容器的高度
            ,width:1870   //容器的宽度
            ,where:jsonSelINI  //传入到服务器端的查询条件
            ,url: 'inRoomInfo/loadPageTByPramas' //后台服务器端的数据接口  后台返回的为Map<String,Object>类型的数据，必须将此类型数据JSON化
            ,limit:3  //每一页显示的数据条数
            ,limits:[2,3,5,8,10]
            ,defaultToolbar: ['filter', 'print', 'exports']
            ,even:true
            ,page: true //开启分页  Map<String,Object>中的数据有：1.count:数据的条数  2.data:查询出的List<Emp>集合数据  3.code:响应的状态,0为成功  4.msg:响应的结果提示（可以不写）
            ,cols: [[ //表头  每一列   field: 'username'为实体对象的属性名  title: '用户名' 表格的列名  sort: true 根据此列数据进行排序
                {type:'checkbox',align:'center'}
                ,{field: 'id', title: 'ID', width:60, sort: true,align:'center'}
                ,{field: 'roomNum', title: '房间编号', width:80,align:'center',templet: '<div>{{d.rooms.roomNum}}</div>'}
                ,{field: 'roomPic', title: '封面图', width:120, sort: true,align:'center',templet: '<div><img src="{{d.rooms.roomPic}}"/></div>'}
                ,{field: 'roomTypeName', title: '类型名称', width:100,align:'center',templet: '<div>{{d.rooms.roomType.roomTypeName}}</div>'}
                ,{field: 'roomPrice', title: '价格', width: 100,align:'center',templet: '<div>{{d.rooms.roomType.roomPrice}}</div>'}
                ,{field: 'customerName', title: '客人姓名', width: 140, sort: true,align:'center'}
                ,{field: 'gender', title: '性别', width: 80, sort: true,align:'center',templet:'#genderTpl'}
                ,{field: 'isVip', title: 'VIP', width: 80,align:'center',templet:'#isVipTpl'}
                ,{field: 'idcard', title: '身份证号', width: 230,align:'center'}
                ,{field: 'phone', title: '手机号', width: 190,align:'center'}
                ,{field: 'money', title: '押金', width: 100,align:'center'}
                ,{field: 'createDate', title: '入住时间', width: 220,align:'center'}
                ,{field: 'outRoomStatus', title: '状态', width: 120,align:'center',templet:'#outRoomStatusTpl'}
                ,{title: '操作', width:180, align:'center', toolbar: '#barDemo'} //这里的toolbar值是模板元素的选择器
            ]]
            ,done:function (res, curr, count) {  //进行表格加载数据后的函数回调
                /*
                 *res:服务器端控制器响应回页面的所有的数据Map<String,Object>
                 *curr:表示当前页  ，count:表示为总的数据条数
                 */
                currentPage = curr;
                hoverOpenImg();//显示大图
            }
        });
    }

    //监听条件查询
    form.on('submit(demo1)', function(data){
        jsonSelINI = {};  //定义查询的条件
        jsonSelINI[data.field.queryName] = data.field.queryValue;
        //重新加载数据表格,自动回到第一页
        loadINI();
        return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
    });

    //监听工具条
    table.on('tool(test)', function(obj){ //注：tool是工具条事件名，test是table原始容器的属性 lay-filter="对应的值"
        var data = obj.data; //获得当前行数据
        var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）

        if(layEvent === 'detail'){ //查看
            //do somehing
            layer.msg("执行了查看操作。。")
        } else if(layEvent === 'del'){ //删除
            layer.confirm('真的删除此入住信息么？',{icon: 3},function(index){
                //执行修改入住信息状态的服务器端操作
                updINIStatus(obj);
                layer.close(index);
                //向服务端发送删除指令
            });
        } else if(layEvent === 'exitIRI'){ //退房
            //do something
            layer.confirm('您现在确定要退房码？',{icon: 7}, function(index){
                //1.将数据回显formTest 即 class="layui-form" 所在元素对应的 lay-filter="" 对应的值
                form.val("exitInRoomInfoForm", {
                    "roomNum": data.rooms.roomNum // "name": "value"
                    ,"customerName": data.customerName
                    ,"idcard": data.idcard
                    ,"roomPrice": data.rooms.roomType.roomPrice
                    ,"createDate": data.createDate
                })
                //清空其它消费和退房备注
                $("#otherPrice").val(0);
                $("textarea").val("");
                if(data.isVip=='1'){
                    //判断是会员
                    $("#isVip").val("是");
                    //根据身份证号查询会员信息
                    loadVipByIdCard(data.idcard);
                }else {
                    //判断不是会员
                    $("#isVip").val("否");
                    $("#vipNum").val("无");
                    vipRate = 1;
                }
                var startDate = getDateStr(data.createDate);  //得到处理过后的入住时间
                var endDate = getDateStr($("#endDate").val());  //得到处理过后的入住时间
                //计算入住的天数
                var days = getDays(startDate,endDate);
                if(days==0){
                    days = 1;
                }
                $("#days").text(days);
                //计算消费的金额（房间的消费金额）,弹框打开时就已计算  .toFixed(2)保留2位小数
                var rprice = (data.rooms.roomType.roomPrice * days * vipRate).toFixed(2);
                $("#zprice").text(rprice);
                //2.将退房的表单弹框显示
                layer.open({
                    type:1,
                    title:'退房操作界面',
                    area:['750px','600px'],
                    shade:0.6,
                    anim:4,
                    content:$("#exitInRoomInfoDiv")
                });
                //3.计算总的消费金额（房间的消费金额+其它消费）
                $("#otherPrice").blur(function () {
                    var otherPrice = $(this).val();
                    if(otherPrice!=''){
                        if(otherPrice>=0){
                            //计算总共的消费金额
                            var zprice = (parseFloat(rprice) + parseFloat(otherPrice)).toFixed(2);
                            $("#zprice").text(zprice);
                        }else {
                            layer.msg("其它消费金额必须大于0！！",{icon: 7,time: 2000,shade: 0.5,anim: 6})
                        }
                    }else {
                        layer.msg("其它消费必填！！",{icon: 7,time: 2000,shade: 0.5,anim: 6})
                    }
                });
                layer.close(index);
                //监听退房的提交
                form.on('submit(demo3)', function(res){
                    var exitJsonRoom = res.field;   //退房时的表单中的数据
                    var saveJsonOrders = {};   //添加订单的json数据
                    saveJsonOrders['remark'] = res.field.remark;
                    saveJsonOrders['orderMoney'] = $("#zprice").text();
                    saveJsonOrders['orderStatus'] = '0';
                    saveJsonOrders['iriId'] = data.id;
                    saveJsonOrders['createDate'] = getNowDate(new Date());  //yyyy/MM//dd HH:mm:ss
                    saveJsonOrders['flag'] = '1';
                    //获取订单编号  //yyyy/MM//dd HH:mm:ss   -->   yyyyMMddHHMMss   加上6位的随机数
                    saveJsonOrders['orderNum'] = dateReplace(saveJsonOrders.createDate)+getRandom(6);
                    //退房时的客人信息时间等等   8201,独角大仙,2019/07/12 08:27:28,2019/07/14 10:14:41,2
                    saveJsonOrders['orderOther'] = exitJsonRoom.roomNum+","+exitJsonRoom.customerName+","+exitJsonRoom.createDate+","+exitJsonRoom.endDate+","+$("#days").text();
                    //退房时的各种金额  140,90,252.00
                    saveJsonOrders['orderPrice'] = exitJsonRoom.roomPrice+","+exitJsonRoom.number+","+$("#zprice").text();
                    layer.closeAll();
                    //退房时的客人信息时间等等,退房时的各种金额  其作用时完成订单支付后生成消费记录需要使用的数据
                    saveOrders(saveJsonOrders);
                    return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
                });
            });


        }
    });

    //批量删除
    $("#batchBtn").click(function () {
        var checkStatus = table.checkStatus('demo'); //idTest 即为基础参数 id 对应的值
        var data = checkStatus.data //获取选中行的数据
        if(data.length==0){
            layer.msg("您还未选择删除的数据！！！",{icon: 7,time: 2000,shade: 0.5,anim: 6})
        }else {
            var falg = true;   //判断是否执行批量删除
            var ids = "";    //要删除的ids   18,30,32
            for (var i=0;i<data.length;i++){
                if(data[i].outRoomStatus=='0'){
                    falg = false;
                    break;
                }
                ids += data[i].id + ",";
            }
            if(falg){
                layer.confirm('您确定要删除选中的入住信息码？',{icon: 3}, function(index){
                    //表明选中的数据均可以删除
                    ids = ids.substring(0,ids.length-1);   //去掉最后一个逗号
                    //批量修改入住信息的状态
                    updBatchINIStatus(ids);
                    layer.close(index);
                });
            }else {
                layer.msg("您选中的有未退房的，不能删除！！！",{icon: 7,time: 2000,shade: 0.5,anim: 6})
            }
        }
    });

    //重新加载数据表格
    function flush() {
        table.reload('demo', {
            page: {
                curr: currentPage //重新从第当前页开始
            }
        }); //只重载数据
    }

    //放大图像
    function hoverOpenImg(){
        var img_show = null; // tips提示
        $('td img').hover(function(){
            var img = "<img class='img_msg' src='"+$(this).attr('src')+"' style='width:230px;' />";
            img_show = layer.tips(img, this,{
                tips:[2, 'rgba(41,41,41,.5)']
                ,area: ['260px']
            });
        },function(){
            layer.close(img_show);
        });
        $('td img').attr('style','max-width:70px');
    }

    //执行修改入住信息状态的服务器端操作
    function updINIStatus(obj) {
        $.ajax({
            type:'POST',
            url:'inRoomInfo/updByPrimaryKeySelective',
            data:{'id':obj.data.id,'status':0},
            success:function (res) {
                if(res=='success'){
                    obj.del(); //删除对应行（tr）的DOM结构，并更新缓存
                    layer.msg("删除成功。。。",{icon: 1,time: 2000,shade: 0.5,anim: 4})
                }else {
                    layer.msg("删除失败！！！",{icon: 2,time: 2000,shade: 0.5,anim: 4})
                }
            },
            error:function () {
                layer.msg("服务器异常！！！",{icon: 3,time: 2000,shade: 0.5,anim: 4})
            }
        });
    }

    //批量修改入住信息的状态
    function updBatchINIStatus(ids) {
        $.ajax({
            type:'POST',
            url:'inRoomInfo/updBatchByPrimaryKeySelective',
            data:{'ids':ids,'status':0},
            success:function (res) {
                if(res=='success'){
                    flush();
                    layer.msg("批量删除成功。。。",{icon: 1,time: 2000,shade: 0.5,anim: 4})
                }else {
                    layer.msg("批量删除失败！！！",{icon: 2,time: 2000,shade: 0.5,anim: 4})
                }
            },
            error:function () {
                layer.msg("服务器异常！！！",{icon: 3,time: 2000,shade: 0.5,anim: 4})
            }
        });
    }

    //根据身份证号查询会员信息
    function loadVipByIdCard(idcard){
        $.ajax({
            type:'POST',
            url:'vip/loadTByPramas',
            async:false,  //允许外部变量取到ajax异步加载的数据
            data:{'idcard':idcard},
            success:function (res) {
                $("#vipNum").val(res.vipNum);
                vipRate = res.vipRate;  //取到会员的折扣
            },
            error:function () {
                layer.msg("服务器异常！！！",{icon: 3,time: 2000,shade: 0.5,anim: 4})
            }
        });
    }

    //计算天数
    function getDays(startDate,endDate){  //2019/09/09   2019/10/10
        var date1Str = startDate.split("/");
        var date1Obj = new Date(date1Str[0],(date1Str[1]-1),date1Str[2]);
        var date2Str = endDate.split("/");
        var date2Obj = new Date(date2Str[0],(date2Str[1]-1),date2Str[2]);
        var t1 = date1Obj.getTime();
        var t2 = date2Obj.getTime();
        var datetime=1000*60*60*24;
        var minusDays = Math.floor(((t2-t1)/datetime));
        var days = Math.abs(minusDays);
        return minusDays;
    }

    //将目前的时间格式2019/08/06 12:12:08  -->  2019/08/06
    function getDateStr(dateStr) {
        var indexOf = dateStr.indexOf(" ");  //取到" "的下标
        dateStr = dateStr.substring(0,indexOf);  //第1个参数为下标，第2个参数为切割的字符串长度
        return dateStr;
    }

    //获取当前时间字符串     Date()   ---->  yyyy/MM//dd HH:mm:ss 格式的字符串
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

    //把 2019/01/01 12:12:12  -->  20190101121212
    function dateReplace(date) {
        date = date.replace("/","");
        date = date.replace("/","");
        date = date.replace(" ","");
        date = date.replace(":","");
        date = date.replace(":","");
        return date;
    }

    //获取随机数
    function getRandom(num) {
        var count = '';   //随机数
        for (var i=0;i<num;i++){
            count += parseInt(Math.random()*10)  //0.123123123...
        }
        return count;
    }

    //添加订单
    function saveOrders(saveJsonOrders){
        $.ajax({
            type:'POST',
            url:'orders/saveT',
            data:saveJsonOrders,
            success:function (res) {
                if(res=='success'){
                    flush();
                    layer.msg("退房成功。。",{icon: 1,time: 2000,shade: 0.5,anim: 4});
                }else {
                    layer.msg("退房失败！！！",{icon: 2,time: 2000,shade: 0.5,anim: 4});
                }
            },
            error:function () {
                layer.msg("服务器异常！！！",{icon: 3,time: 2000,shade: 0.5,anim: 4});
            }
        });
    }

});
