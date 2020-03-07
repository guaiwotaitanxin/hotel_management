package com.hyl.service.impl;

import com.hyl.entity.RoomType;
import com.hyl.service.RoomTypeService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 *   房间类型的业务层实现类
 */
@Service("roomTypeServiceImpl")
@Transactional(readOnly = false)
public class RoomTypeServiceImpl extends BaseServiceImpl<RoomType> implements RoomTypeService {
}
