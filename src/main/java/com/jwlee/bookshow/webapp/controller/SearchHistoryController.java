package com.jwlee.bookshow.webapp.controller;

import com.jwlee.bookshow.webapp.common.ErrorInfo;
import com.jwlee.bookshow.webapp.common.ReturnData;
import com.jwlee.bookshow.webapp.common.SessionManager;
import com.jwlee.bookshow.webapp.db.login.model.User;
import com.jwlee.bookshow.webapp.db.search.model.SearchHistory;
import com.jwlee.bookshow.webapp.db.search.service.SearchHistoryService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Map;

/**
* SearchHistoryController
* @author jungwoolee
* @since 2019-07-24
**/
@RequestMapping("/searchHistory")
@Controller
public class SearchHistoryController {
    private static final Logger logger = LoggerFactory.getLogger(SearchHistoryController.class);

    @Resource(name = "searchHistoryService")
    private SearchHistoryService searchHistoryService;

    @RequestMapping(value = "/getSearchHistoryList")
    @ResponseBody
    public ReturnData getSearchHistoryList(HttpServletRequest req, HttpServletResponse res,
                                    @PageableDefault(size = 10, page = 0, sort = "regdate", direction = Sort.Direction.DESC) Pageable pageable)  {
        try {
            ReturnData returnData= new ReturnData();
            returnData.setResultData(searchHistoryService.getSearchHistoryList(req,res,pageable));
            System.out.println(returnData.getResultData().toString());
            return new ReturnData(returnData.getResultData());

        } catch (Exception e) {
            logger.info(e.getMessage());
            return new ReturnData(new ErrorInfo(e));
        }
    }

    @RequestMapping(value = "/getKeywordTopList")
    @ResponseBody
    public ReturnData getKeywordTopList(HttpServletRequest req, HttpServletResponse res)  {
        try {
            ReturnData returnData= new ReturnData();
            returnData.setResultData(searchHistoryService.getKeywordTopList(req,res));
            System.out.println(returnData.getResultData().toString());
            return new ReturnData(returnData.getResultData());

        } catch (Exception e) {
            logger.info(e.getMessage());
            return new ReturnData(new ErrorInfo(e));
        }
    }

}
