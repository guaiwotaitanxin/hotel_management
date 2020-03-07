package com.hyl.service.impl;

import com.hyl.entity.Rooms;
import com.hyl.service.RoomsService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 *   房屋业务层实现类
 */
@Service("roomsServiceImpl")
@Transactional(readOnly = false)
public class RoomsServiceImpl extends BaseServiceImpl<Rooms> implements RoomsService {
}
