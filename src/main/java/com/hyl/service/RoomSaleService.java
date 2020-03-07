package com.hyl.service;

import com.hyl.entity.RoomSale;

import java.util.List;
import java.util.Map;

/**
 *   销售记录业务层接口
 */
public interface RoomSaleService extends BaseService<RoomSale> {
    //返回map,string对应字段,object对应值
    Map<String, List<Object>> loadByGroup();
}
