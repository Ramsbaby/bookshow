/**
 * Program Name	: SessionManager.java
 *
 * Version		:  1.0
 *
 * Creation Date	: 2015. 1. 27.
 * 
 * Programmer Name 	: Bae Jung Yeo
 *
 * Copyright 2014 Hamonsoft. All rights reserved.
 * ***************************************************************
 *                P R O G R A M    H I S T O R Y
 * ***************************************************************
 * DATE			: PROGRAMMER	: REASON
 */
package com.jwlee.bookshow.webapp.common;

import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpSession;

/**
* SessionManager
* @author jungwoolee
* @since 2019-07-22
**/
public class SessionManager {

	/**
	 * set login seiion
	 * @param
	 */
	public static void setUser(String userId, Object menuData) {
		ServletRequestAttributes reqAttr = (ServletRequestAttributes)RequestContextHolder.getRequestAttributes();
		HttpSession session = reqAttr.getRequest().getSession();
		session.setAttribute("userId", userId);
		session.setAttribute("menu", menuData);
	}

	public static HttpSession getSession() {
		ServletRequestAttributes reqAttr = (ServletRequestAttributes)RequestContextHolder.getRequestAttributes();
		HttpSession session = reqAttr.getRequest().getSession();
		return session;
	}

	/**
	 * 로그인사용자 ID조회
	 * @param session
	 * @return
	 */
	public String getUserId(HttpSession session){
		try {
			return getUser();
		} catch (Exception e) {
			return null;
		}
	}

	/**
	 * get login AppDto
	 * @return
	 */
	public static String getUser(){
		try {
			ServletRequestAttributes reqAttr = (ServletRequestAttributes)RequestContextHolder.getRequestAttributes();
			HttpSession session = reqAttr.getRequest().getSession();
			return (String) session.getAttribute("userId");
		} catch (Exception e) {
			return null;
		}
	}
}
