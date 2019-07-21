package com.jwlee.bookshow.webapp.db.login.repository;

import com.jwlee.bookshow.webapp.db.login.model.LoginEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LoginRepository extends JpaRepository<LoginEntity, Integer> {
    // User 타입의 userId로 조회
    LoginEntity findByUserId(String userId);

}
