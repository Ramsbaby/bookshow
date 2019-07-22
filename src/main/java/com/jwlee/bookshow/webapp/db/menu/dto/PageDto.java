/**
 * Program Name	: PageDto.java
 *
 * Version		:  1.0
 *
 * Creation Date	: 2015. 1. 28.
 * 
 * Programmer Name 	: Bae Jung Yeo
 *
 * Copyright 2014 Hamonsoft. All rights reserved.
 * ***************************************************************
 *                P R O G R A M    H I S T O R Y
 * ***************************************************************
 * DATE			: PROGRAMMER	: REASON
 */
package com.jwlee.bookshow.webapp.db.menu.dto;

/**
 * @author jungwoolee
 *
 */
public class PageDto {
	private long pageNo;
	private String pageName;
	private int orderNo;
	private String webIconClass;


	private String[] children;


	/**
	 * @return the pageNo
	 */
	public long getPageNo() {
		return pageNo;
	}
	/**
	 * @param pageNo the pageNo to set
	 */
	public void setPageNo(long pageNo) {
		this.pageNo = pageNo;
	}
	/**
	 * @return the pageName
	 */
	public String getPageName() {
		return pageName;
	}
	/**
	 * @param pageName the pageName to set
	 */
	public void setPageName(String pageName) {
		this.pageName = pageName;
	}
	/**
	 * @return the orderNo
	 */
	public int getOrderNo() {
		return orderNo;
	}
	/**
	 * @param orderNo the orderNo to set
	 */
	public void setOrderNo(int orderNo) {
		this.orderNo = orderNo;
	}

	/**
	 * @return the webIconClass
	 */
	public String getWebIconClass() {
		return webIconClass;
	}
	/**
	 * @param webIconClass the webIconClass to set
	 */
	public void setWebIconClass(String webIconClass) {
		this.webIconClass = webIconClass;
	}


	public String[] getChildren() {
		return children;
	}

	public void setChildren(String[] children) {
		this.children = children;
	}


}
