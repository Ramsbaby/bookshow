package com.jwlee.bookshow.webapp.db.menu.service;

import com.jwlee.bookshow.webapp.common.ReturnData;
import org.hibernate.criterion.Criterion;

import java.util.Map;

/**
* MenuService
* @author jungwoolee
* @since 2019-07-22
**/
public interface MenuService {

	ReturnData getSiteMenuList(Map<String, Object> reqMap);
}
