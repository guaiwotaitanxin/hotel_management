package com.hyl.controller;

import com.hyl.entity.RoomSale;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;
import java.util.Map;

/**
 *   销售记录控制器
 */
@Controller
@RequestMapping("/roomSale")
public class RoomSaleController extends BaseController<RoomSale> {
    @RequestMapping("/loadByGroup")
    public @ResponseBody
    Map<String, List<Object>> loadByGroup() {
        return roomSaleService.loadByGroup();
    }

}
