package com.hyl.service.impl;

import com.hyl.entity.User;
import com.hyl.service.UserService;
import com.hyl.util.MD5;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 *   用户业务层实现类
 */
@Service
@Transactional(readOnly = false)
public class UserServiceImpl extends BaseServiceImpl<User> implements UserService {

    //重写添加用户的方法
    @Override
    public String saveT(User user) throws Exception {
        user.setPwd(MD5.md5crypt(user.getPwd()));
        return super.saveT(user);
    }
}
