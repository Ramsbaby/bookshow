package com.jwlee.bookshow.webapp.db.menu.dto;

/**
* PageDto
* @author jungwoolee
* @since 2019-07-24
**/
public class PageDto {
	private long pageNo;
	private String pageName;
	private int orderNo;
	private String webIconClass;


	private String[] children;


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
