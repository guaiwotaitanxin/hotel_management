package com.hyl.service.impl;

import com.hyl.entity.RoomSale;
import com.hyl.service.RoomSaleService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 *   销售记录的业务层实现类
 */
@Service("roomSaleServiceImpl")
@Transactional(readOnly = false)
public class RoomSaleServiceImpl extends BaseServiceImpl<RoomSale> implements RoomSaleService {
    @Override
    public Map<String, List<Object>> loadByGroup() {
        Map<String, List<Object>> map = new HashMap<>();
        List<Object> roomNumList = new ArrayList<>();
        List<Object> salePriceList = new ArrayList<>();
        List<Map<String, Object>> mapList = roomSaleMapper.loadByGroup();
        //数据的形式是{room_num:8888,saleprice:888}
        for (Map<String, Object> stringObjectMap : mapList) {
            //获得房间号
            Object room_num = stringObjectMap.get("room_num");
            //获得房间租金
            Object saleprice = stringObjectMap.get("saleprice");
            roomNumList.add(room_num);
            salePriceList.add(saleprice);
        }
        map.put("roomNumList", roomNumList);
        map.put("salePriceList", salePriceList);
        return map;
    }
}
