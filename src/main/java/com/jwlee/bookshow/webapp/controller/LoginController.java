package com.jwlee.bookshow.webapp.controller;

import com.jwlee.bookshow.webapp.common.ErrorInfo;
import com.jwlee.bookshow.webapp.common.ReturnData;
import com.jwlee.bookshow.webapp.db.login.service.LoginService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;

@RequestMapping("/login")
@Controller
public class LoginController {
    private final Logger logger = LoggerFactory.getLogger(LoginController.class);

    @Resource(name = "loginService")
    private LoginService loginService;

    /*// 사용자 조회
    @RequestMapping(value = "userList")
    public @ResponseBody
    ReturnData userGridView(@RequestParam Map<String, Object> reqMap) {
        try {
            return loginService.getUserGridData(new Criterion(reqMap));
        } catch (Exception e) {
            e.printStackTrace();
            return new ReturnData(new ErrorInfo(e));
        }
    }

    // 사용자 삭제
    @RequestMapping("delUser")
    @ResponseBody
    public ReturnData delUser(@RequestParam String userId) {
        try {
            Criterion criterion = new Criterion();
            criterion.addParam("userId", userId);
            return loginService.delUser(criterion);
        } catch (Exception e) {
            e.printStackTrace();
            return new ReturnData(new ErrorInfo(e));
        }
    }

    // 사용자 추가
    @RequestMapping(value = "addUser", method = RequestMethod.POST)
    public@ResponseBody  ReturnData addUser(@RequestBody Map<String, Object> reqMap) {
        try {
            return loginService.addUser(new Criterion(reqMap));
        } catch (Exception e) {
            e.printStackTrace();
            return new ReturnData(new ErrorInfo(e));
        }
    }*/

    // 계정 추가
    @RequestMapping(value="/userConf/addAccount.do")
    @ResponseBody
    public ReturnData addAccount() {
        try {
            return loginService.addAccount();
        } catch (Exception e) {
            e.printStackTrace();
            return new ReturnData(new ErrorInfo(e));
        }
    }

}

