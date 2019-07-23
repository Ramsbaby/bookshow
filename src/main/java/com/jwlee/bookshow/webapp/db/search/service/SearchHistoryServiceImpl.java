package com.jwlee.bookshow.webapp.db.search.service;

import com.jwlee.bookshow.webapp.common.ErrorInfo;
import com.jwlee.bookshow.webapp.common.ReturnData;
import com.jwlee.bookshow.webapp.common.SessionManager;
import com.jwlee.bookshow.webapp.controller.LoginController;
import com.jwlee.bookshow.webapp.db.login.model.User;
import com.jwlee.bookshow.webapp.db.login.service.UserService;
import com.jwlee.bookshow.webapp.db.search.model.SearchHistory;
import com.jwlee.bookshow.webapp.db.search.repository.SearchHistoryRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.transaction.Transactional;

@Service("searchHistoryService")
public class SearchHistoryServiceImpl implements SearchHistoryService{
    private final Logger logger = LoggerFactory.getLogger(LoginController.class);

    @Autowired
    UserService userService;

    @Autowired
    SearchHistoryRepository searchHistoryRepository;

    @Transactional
    public void save(SearchHistory entity) {
        searchHistoryRepository.save(entity);
    }

    @Override
    public ReturnData getSearchHistoryList(HttpServletRequest req, HttpServletResponse res,
                                    @PageableDefault(size = 10, page = 0, sort = "regdate", direction = Sort.Direction.DESC) Pageable pageable)  {
        try {
            User user = userService.getUser(SessionManager.getUser());

            Page<SearchHistory> searchHistoryList = searchHistoryRepository.findByUser(user, pageable);
            return new ReturnData(searchHistoryList);

        } catch (Exception e) {
            logger.info(e.getMessage());
            return new ReturnData(new ErrorInfo(e));
        }
    }
}
