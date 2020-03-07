package com.hyl.service.impl;

import com.hyl.entity.InRoomInfo;
import com.hyl.entity.Rooms;
import com.hyl.service.InRoomInfoService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 *   房间入住信息业务层实现类
 *     BaseServiceImpl<InRoomInfo>  此时继承的时候将实体对象的泛型指定为InRoomInfo房间入住信息类型
 */
@Service("inRoomInfoServiceImpl")
@Transactional(readOnly = false)
public class InRoomInfoServiceImpl extends BaseServiceImpl<InRoomInfo> implements InRoomInfoService {

    //重写添加的方法
    @Override
    public String saveT(InRoomInfo inRoomInfo) throws Exception {
        //1.入住信息的添加
        Integer insINIIf = baseMapper.insert(inRoomInfo);
        //2.房间状态的修改
        //新建房间状态修改的参数对象
        Rooms rooms = new Rooms();
        rooms.setId(inRoomInfo.getRoomId());
        rooms.setRoomStatus("1");
        //执行房间状态的修改（空闲0  -->  已入住1）
        Integer updRoomsIf = roomsMapper.updateByPrimaryKeySelective(rooms);
        if(insINIIf>0&&updRoomsIf>0){
            return "success";
        }else {
            //手动抛出一个异常
            int i = 10/0;
            return "fail";
        }
    }
}
