package com.jwlee.bookshow.webapp.db.login.repository;

import com.jwlee.bookshow.webapp.db.login.model.Login;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LoginRepository extends JpaRepository<Login, Long> {
    // Login 타입의 userId로 조회
    Login findByUserId(String userId);

}
