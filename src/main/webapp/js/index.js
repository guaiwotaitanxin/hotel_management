// 配置
layui.config({
	base: './hpModules/' // 扩展模块目录
}).extend({ // 模块别名
	hpTab: 'hpTab/hpTab',
	hpRightMenu: 'hpRightMenu/hpRightMenu',
	hpFormAll: 'hpFormAll/hpFormAll',
});

//JavaScript代码区域
layui.use(['element', 'carousel','hpTheme', 'hpTab', 'hpLayedit', 'hpRightMenu'], function() {
	
	var element = layui.element;
	var carousel = layui.carousel; //轮播
	var hpTab = layui.hpTab;
	var hpRightMenu = layui.hpRightMenu;
	var hpTheme=layui.hpTheme;
	$ = layui.$;
	
    // 初始化主题
	hpTheme.init();
	 //初始化轮播
	carousel.render({
		elem: '#test1',
		width: '100%', //设置容器宽度
		interval: 1500,
		height: '600px',
		arrow: 'hover', //显示箭头
		anim: 'fade', //切换动画方式
	});

	// 初始化 动态tab
    hpTab.init();
    // 右键tab菜单
    hpRightMenu.init();

    //退出
	$("#exit").click(function () {
        layer.confirm('真的删除该房间么？',{icon:3}, function(index) {
        	exitUser();
        	layer.close(index);
        });
    });

	//退出
	function exitUser() {
        $.ajax({
            type: 'POST',
            url: 'user/exitUser',
            success: function (res) {
                if(res=='success'){
                	setTimeout('window.location="model/toLogin"',2000);
                    layer.msg("退出成功。。",{icon:1,time: 2000,shade: 0.5,anim: 4})
                }else {
                    layer.msg("退出失败！！",{icon:2,time: 2000,shade: 0.5,anim: 4})
                }
            },
            error: function () {
                layer.msg("服务器异常！！！",{icon:3,time: 2000,shade: 0.5,anim: 4})
            }
        });

    }

});