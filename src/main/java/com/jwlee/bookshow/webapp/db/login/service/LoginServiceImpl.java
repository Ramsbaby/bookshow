package com.jwlee.bookshow.webapp.db.login.service;

import com.jwlee.bookshow.webapp.common.MsgService;
import com.jwlee.bookshow.webapp.common.ReturnData;
import com.jwlee.bookshow.webapp.db.login.model.Login;
import com.jwlee.bookshow.webapp.db.login.repository.LoginRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;

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
    public ReturnData addAccount(Login login) {
        ReturnData returnData = new ReturnData();
        loginRepository.save(login);
        returnData.setResultData(getAddOkMessage());
        return returnData;
    }
}
