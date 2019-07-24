package com.jwlee.bookshow.webapp.db.login.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@ToString
@EqualsAndHashCode(of = {"password"})
@Entity
public class User {

    @Id
    @Column(length = 100, nullable = false, unique = true)
    @JsonProperty
    private String userId;      //사용자ID

    @JsonProperty
    private String name;        //사용자이름

    @JsonProperty
    private String cellTel;     //휴대폰번호

    @JsonIgnore
    private String password;    //패스워드

    @CreatedDate // 최초 생성시간
    private LocalDateTime createDate;

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setCellTel(String cellTel) {
        this.cellTel = cellTel;
    }

    // 비밀번호 일치확인 매서드
    public boolean matchPassword(String newPassword) {
        if ( newPassword == null ) {
            return false;
        }
        return newPassword.equals(password);
    }
    public User()
    {}

    public User(String userId, String password, String name, String cellTel)
    {
        this.userId = userId;
        this.password = password;
        this.name = name;
        this.cellTel = cellTel;
    }
}
