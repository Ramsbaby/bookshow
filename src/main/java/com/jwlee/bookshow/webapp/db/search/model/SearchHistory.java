package com.jwlee.bookshow.webapp.db.search.model;

import com.jwlee.bookshow.webapp.db.login.model.User;
import com.jwlee.bookshow.webapp.enums.EnumBookTarget;

import javax.persistence.*;
import java.sql.Timestamp;
/**
* SearchHistory
* @author jungwoolee
* @since 2019-07-24
**/
@Entity
@Table(name = "search_history")
public class SearchHistory {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(nullable = false)
	private String search_word;

	@Column
	private String target;

	@Column(nullable = false)
	private Timestamp regdate;

	@ManyToOne(optional = false)
	@JoinColumn(name = "user_account")
	private User user;

	public SearchHistory() {
		super();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getSearch_word() {
		return search_word;
	}

	public void setSearch_word(String search_word) {
		this.search_word = search_word;
	}

	public Timestamp getRegdate() {
		return regdate;
	}

	public void setRegdate(Timestamp regdate) {
		this.regdate = regdate;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public String getTarget() {
		return target;
	}

	public String get_target() {
		return EnumBookTarget.getByCode(this.target).getDesc();
	}

	public void setTarget(String target) {
		this.target = target;
	}

	public SearchHistory(String search_word, String target, Timestamp regdate, User user) {
		super();
		this.search_word = search_word;
		this.target = target;
		this.regdate = regdate;
		this.user = user;
	}

}
