package com.hyl.service.impl;

import com.hyl.entity.Vip;
import com.hyl.service.VipService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 *   会员业务层实现类
 */
@Service("vipServiceImpl")
@Transactional(readOnly = false)
public class VipServiceImpl extends BaseServiceImpl<Vip> implements VipService {
}
