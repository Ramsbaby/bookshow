package com.jwlee.bookshow.webapp.db.login.service;

import com.jwlee.bookshow.webapp.common.CustomException;
import com.jwlee.bookshow.webapp.common.ReturnData;
import com.jwlee.bookshow.webapp.db.login.model.User;
import com.jwlee.bookshow.webapp.db.login.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

/**
* UserService
* @author jungwoolee
* @since 2019-07-22
**/
@Service
public interface UserService {

    ReturnData addAccount(User user) throws CustomException;

    public User getUser(String userId);
}
