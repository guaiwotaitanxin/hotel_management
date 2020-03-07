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
    <link rel="stylesheet" href="lib/layui/css/layui.css">
    <script src="lib/layui/layui.js"></script>
    <title>标题</title>
</head>
<body>
<div class="layui-container" style="display: none" id="addRoomTypeDiv">
    <form class="layui-form" action="">
        <div class="layui-form-item">
            <label class="layui-form-label">房间类型</label>
            <div class="layui-input-inline">
                <input type="text" name="roomTypeName" required  lay-verify="required" autocomplete="off" class="layui-input">
            </div>
        </div>
        <div class="layui-form-item">
            <label class="layui-form-label">房间价格</label>
            <div class="layui-input-inline">
                <input type="password" name="text" required lay-verify="required|number" autocomplete="off" class="layui-input">
            </div>
        </div>
        <div class="layui-form-item">
            <div class="layui-input-block">
                <button class="layui-btn" lay-submit lay-filter="formDemo">立即提交</button>
                <button type="reset" class="layui-btn layui-btn-primary">重置</button>
            </div>
        </div>
    </form>
</div>
<center><h1>房屋类型管理</h1></center>
<button type="button" class="layui-btn" id="addRoomType">添加房间类型</button>
<table class="layui-hide" id="demo" lay-filter="test"></table>
</body>
<script src="js/roomType.js"></script>
</html>