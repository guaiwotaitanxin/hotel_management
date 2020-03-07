layui.use(['jquery','layer','table','form','laydate'], function() {
    var $ = layui.jquery,  //实例化jquery对象
        layer = layui.layer,   //实例化弹出层对象
        table = layui.table,   //实例化数据表格对象
        form = layui.form,    //实例化表单对象
        laydate = layui.laydate;  //实例化日期对象

    var jsonSelRoomSale = {};   //查询销售记录的条件

    //初始化数据
    loadRoomSale();

    //日期时间范围
    laydate.render({
        elem: '#test3'
        ,type: 'datetime'
        ,format:'yyyy/MM/dd HH:mm:ss'
        ,max:0   //当前时间后可选择的最大时间
        ,range: true   //使用时间范围的选择
    });

    //加载销售记录
    function loadRoomSale(){
        table.render({  //底层使用的依然是jquery中的ajax
            elem: '#demo'  //指定数据存放的容器位置
            ,height: 312   //容器的高度
            ,width:1750   //容器的宽度
            ,url: 'roomSale/loadPageTByPramas' //后台服务器端的数据接口  后台返回的为Map<String,Object>类型的数据，必须将此类型数据JSON化
            ,where :jsonSelRoomSale
            ,limit:3  //每一页显示的数据条数
            ,limits:[2,3,5,8,10]
            ,even:true
            ,page: true //开启分页  Map<String,Object>中的数据有：1.count:数据的条数  2.data:查询出的List<Emp>集合数据  3.code:响应的状态,0为成功  4.msg:响应的结果提示（可以不写）
            ,cols: [[ //表头  每一列   field: 'username'为实体对象的属性名  title: '用户名' 表格的列名  sort: true 根据此列数据进行排序
                {type:'checkbox',align:'center'}
                ,{field: 'id', title: 'ID', width:90, sort: true,align:'center'}
                ,{field: 'roomNum', title: '房间编号', width:120,align:'center'}
                ,{field: 'customerName', title: '客人姓名', width:140, sort: true,align:'center'}
                ,{field: 'startDate', title: '入住时间', width:220,align:'center'}
                ,{field: 'endDate', title: '退房时间', width: 220,align:'center'}
                ,{field: 'roomPrice', title: '房间单价', width: 140, sort: true,align:'center'}
                ,{field: 'days', title: '入住天数', width: 80, sort: true,align:'center'}
                ,{field: 'rentPrice', title: '住宿金额', width: 160,align:'center'}
                ,{field: 'otherPrice', title: '其它消费', width: 140,align:'center'}
                ,{field: 'salePrice', title: '支付金额', width: 140,align:'center'}
                ,{field: 'discountPrice', title: '优惠金额', width: 130,align:'center'}
                ,{title: '操作', width:100, align:'center', toolbar: '#barDemo'} //这里的toolbar值是模板元素的选择器
            ]]
        });
    }

    //监听销售记录查询
    form.on('submit(demo1)', function(data){
        jsonSelRoomSale = data.field;
        if(jsonSelRoomSale.queryTimes!=''){
            //通过切割字符串queryTimes，得到查询的时间的数组
            var arrTimes = jsonSelRoomSale.queryTimes.split(" - ");
            jsonSelRoomSale['startDate'] = arrTimes[0];
            jsonSelRoomSale['endDate'] = arrTimes[1];
        }
        //将jsonSelRoomSale对象中queryTimes的属性删除
        delete jsonSelRoomSale['queryTimes'];
        loadRoomSale();  //执行条件查询，当前页自动为1
        return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
    });

});