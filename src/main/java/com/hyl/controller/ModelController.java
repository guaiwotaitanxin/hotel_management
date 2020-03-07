package com.hyl.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 *   页面跳转的控制器对象
 */
@Controller
@RequestMapping("/model")
public class ModelController {

    //去到酒店管理平台入住信息页面
    @RequestMapping("/toShowInRoomInfo")
    public String toShowInRoomInfo(){
        return "inRoomInfo/showInRoomInfo";
    }

    //去到酒店管理平台订单信息页面
    @RequestMapping("/toShowOrders")
    public String toShowOrders(){
        return "orders/showOrders";
    }

    //去到酒店管理平台订单信息页面toSaveInRoomInfo
    @RequestMapping("/toSaveInRoomInfo")
    public String toSaveInRoomInfo(){
        return "inRoomInfo/saveInRoomInfo";
    }

    //去到酒店管理平台订单信息页面toSaveInRoomInfo
    @RequestMapping("/toShowRoomSale")
    public String toShowRoomSale(){
        return "roomSale/showRoomSale";
    }

    //去到酒店管理平台房间信息页面toShowRooms
    @RequestMapping("/toShowRooms")
    public String toShowRooms(){
        return "rooms/showRooms";
    }

    //去到酒店管理平台房间信息页面toShowRooms
    @RequestMapping("/toShowVip")
    public String toShowVip(){
        return "vip/showVip";
    }

    //去到酒店管理平台添加会员信息页面toSaveVip
    @RequestMapping("/toSaveVip")
    public String toSaveVip(){
        return "vip/saveVip";
    }

    //去到酒店管理平台登录页面toLogin
    @RequestMapping("/toLogin")
    public String toLogin(){
        return "login/login";
    }

    //去到酒店管理平台角色页面toShowRole
    @RequestMapping("/toShowRole")
    public String toShowRole(){
        return "role/showRole";
    }

    //去到酒店管理平台用户页面toShowUser
    @RequestMapping("/toShowUser")
    public String toShowUser(){
        return "user/showUser";
    }

    //去到酒店管理平台用户添加页面toSaveUser
    @RequestMapping("/toSaveUser")
    public String toSaveUser(){
        return "user/saveUser";
    }
}
