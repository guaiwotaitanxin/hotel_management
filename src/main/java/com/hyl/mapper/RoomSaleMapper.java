package com.hyl.mapper;

import com.hyl.entity.RoomSale;

import java.util.List;
import java.util.Map;

/**
 *   房间出租消费记录Mapper代理对象
 */
public interface RoomSaleMapper extends BaseMapper<RoomSale>{
    //返回map,string对应字段,object对应值
    List<Map<String, Object>> loadByGroup();
}