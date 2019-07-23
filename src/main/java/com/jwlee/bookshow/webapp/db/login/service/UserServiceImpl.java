package com.jwlee.bookshow.webapp.db.login.service;

import com.jwlee.bookshow.webapp.common.MsgService;
import com.jwlee.bookshow.webapp.common.ReturnData;
import com.jwlee.bookshow.webapp.db.login.model.User;
import com.jwlee.bookshow.webapp.db.login.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

/**
 * UserServiceImpl
 *
 * @author jungwoolee
 * @since 2019-07-22
 **/
@Service("userService")
public class UserServiceImpl extends MsgService implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public ReturnData addAccount(User user) {
        ReturnData returnData = new ReturnData();
        userRepository.save(user);
        returnData.setResultData(getAddOkMessage());
        return returnData;
    }

    @Transactional
    public void save(User user) {
        userRepository.save(user);
    }

    @Transactional
    public User getUser(String userId) {
        return userRepository.findByUserId(userId);
    }
}
