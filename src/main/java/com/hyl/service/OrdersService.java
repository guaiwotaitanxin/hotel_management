package com.hyl.service;

import com.hyl.entity.Orders;

/**
 *   订单业务层接口
 */
public interface OrdersService extends BaseService<Orders>{

    //支付后修改订单
    String updOrdersAfterPay(Orders orders) throws Exception;
}
