package com.hyl.controller;

import com.hyl.entity.Roles;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 *   角色控制器层
 */
@Controller
@RequestMapping("/roles")
public class RoleController extends BaseController<Roles> {
}
