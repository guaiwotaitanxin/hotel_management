<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<!--http://localhost:8080/-->
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";
%>
<head>
    <!--引用基础路径-->
    <base href="<%=basePath%>"/>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <script src="lib/layui/layui.js"></script>
    <script src="lib/layui/lay/modules/jquery.js"></script>
    <script src="js/echarts.min.js"></script>
    <title>标题</title>
</head>
<body>
<div align="center" id="main" style="width: 1000px;height:680px;"></div>
</body>
<script type="text/javascript">
    layui.use(['jquery'],function () {
        var $ = layui.jquery;
        init();
        function init() {
            $.ajax({
                type: "GET",
                url: "roomSale/loadByGroup",
                success:function (map) {
                    console.log(map);
                    // 基于准备好的dom，初始化echarts实例
                    var myChart = echarts.init(document.getElementById('main'));

                    // 指定图表的配置项和数据
                    var option = {
                        title: {
                            text: '房屋利润图'
                        },
                        tooltip: {},
                        legend: {
                            data:['销量']
                        },
                        xAxis: {
                            data: map.roomNumList
                        },    toolbox: {
                            feature: {
                                dataZoom: {
                                    yAxisIndex: 'none'
                                },
                                dataView: {},
                                magicType : {show: true, type: ['line', 'bar']},
                                restore: {},
                                saveAsImage: {}
                            }
                        },
                        yAxis: {},
                        series: [{
                            name: '销量',
                            type: 'bar',
                            data: map.salePriceList
                        }]
                    };

                    // 使用刚指定的配置项和数据显示图表。
                    myChart.setOption(option);

                },
                error: function () {

                }
            })
        }
    })


</script>
</html>