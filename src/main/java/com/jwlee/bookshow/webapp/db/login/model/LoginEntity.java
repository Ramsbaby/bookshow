package com.jwlee.bookshow.webapp.db.login.model;

import com.jwlee.bookshow.webapp.common.AbstractEntity;

import javax.persistence.Column;
import javax.persistence.Entity;

@Entity
public class LoginEntity extends AbstractEntity {
    @Column(length = 100, nullable = true)
    private String userId;
    @Column(length = 50, nullable = false)
    private String name;
    @Column(length = 100, nullable = true)
    private String mail;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getMail() {
        return mail;
    }

    public void setMail(String mail) {
        this.mail = mail;
    }

    public String getUserId() {
        return userId;
    }


    public LoginEntity() {
        super();
    }

    public LoginEntity(String name, String mail) {
        this();
        this.name = name;
        this.mail = mail;
    }

    public String toString() {
        return "LoginEntity [id=" + userId + ", name=" + name + ", mail=" + mail + "]";
    }

}
