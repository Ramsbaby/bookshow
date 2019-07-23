package com.jwlee.bookshow.webapp.controller;

import com.jwlee.bookshow.webapp.common.ApiService;
import com.jwlee.bookshow.webapp.common.ReturnData;
import com.jwlee.bookshow.webapp.common.SessionManager;
import com.jwlee.bookshow.webapp.db.login.model.User;
import com.jwlee.bookshow.webapp.db.login.service.UserService;
import com.jwlee.bookshow.webapp.db.search.model.SearchHistory;
import com.jwlee.bookshow.webapp.db.search.service.SearchHistoryService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.Map;

@RestController
@RequestMapping("ajax/")
public class AjaxController {
	private static final Logger logger = LoggerFactory.getLogger(AjaxController.class);

	@Autowired
	ApiService apiService;

	@Autowired
	SearchHistoryService searchHistoryService;

	@Autowired
	UserService userService;

	/**
	 * 책 검색 restAPI
	 * 
	 * @param req
	 * @param res
	 * @return
	 */
	@RequestMapping(value = "/searchBooks")
	public ReturnData searchBooks(HttpServletRequest req, HttpServletResponse res,
								  @RequestParam(name = "searchKeyword", defaultValue = "") String searchKeyword,
								  @RequestParam(name = "target", defaultValue = "all") String target,
								  @RequestParam(name = "page", defaultValue = "1") int page) {

		System.out.println(searchKeyword);
		System.out.println(target);
		System.out.println(page);

		User user = userService.getUser(SessionManager.getUser());

		Map<String, Object> result = apiService.searchBooks(searchKeyword, target, page);
		System.out.println(result.toString());
		searchHistoryService.save(new SearchHistory(searchKeyword, target, Timestamp.valueOf(LocalDateTime.now()), user));

		//
		return new ReturnData(result);
	}

}
