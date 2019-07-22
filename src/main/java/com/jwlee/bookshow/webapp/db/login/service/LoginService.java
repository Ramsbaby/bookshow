package com.jwlee.bookshow.webapp.db.login.service;

import com.jwlee.bookshow.webapp.common.CustomException;
import com.jwlee.bookshow.webapp.common.ReturnData;
import com.jwlee.bookshow.webapp.db.login.model.Login;
import org.hibernate.criterion.Criterion;

import java.util.Map;

/**
* LoginService
* @author jungwoolee
* @since 2019-07-22
**/
public interface LoginService {
    ReturnData addAccount(Login login) throws CustomException;
}
