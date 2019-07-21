package com.jwlee.bookshow.webapp.db.login.service;

import com.jwlee.bookshow.webapp.common.MsgService;
import com.jwlee.bookshow.webapp.common.ReturnData;
import com.jwlee.bookshow.webapp.db.login.model.LoginEntity;
import com.jwlee.bookshow.webapp.db.login.repository.LoginRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * LoginServiceImpl
 *
 * @author jungwoolee
 * @since 2019-07-22
 **/
@Service("loginService")
public class LoginServiceImpl extends MsgService implements LoginService {

    @Autowired
    private LoginRepository loginRepository;

    @Override
    public ReturnData addAccount() {
        ReturnData returnData = new ReturnData();

//        ConfigurableApplicationContext context
//        LoginRepository personRepository = context.getBean(LoginRepository.class);

        LoginEntity user = loginRepository.findByUserId("test");

        System.out.println(user);
//        loginRepository.findAll();
        returnData.setResultData(getAddOkMessage());

        return returnData;
    }
}
