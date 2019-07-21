package com.jwlee.bookshow.webapp.common;

import java.io.Serializable;

/**
* ReturnData
* @author jungwoolee
* @since 2019-07-22
**/
@SuppressWarnings("serial")
public class ReturnData implements Serializable {
	private boolean hasError;
	private ErrorInfo errorInfo;
	private Object resultData;
	private Object insertedPk;
	private int updateCnt;
	
	public ReturnData() {
		this(false);
	}
	public ReturnData(boolean hasError) {
		this.hasError = hasError;
	}
	public ReturnData(Object resultData) {
		this.resultData = resultData;
	}
	public ReturnData(ErrorInfo errorInfo) {
		this.hasError = true;
		this.errorInfo = errorInfo;
	}
	/**
	 * @return the hasError
	 */
	public boolean getHasError() {
		return hasError;
	}
	/**
	 * @param hasError the hasError to set
	 */
	public void setHasError(boolean hasError) {
		this.hasError = hasError;
	}
	/**
	 * @return the errorInfo
	 */
	public ErrorInfo getErrorInfo() {
		return errorInfo;
	}
	/**
	 * @param errorInfo the errorInfo to set
	 */
	public void setErrorInfo(ErrorInfo errorInfo) {
		this.hasError = true;
		this.errorInfo = errorInfo;
	}
	/**
	 * @return the resultData
	 */
	public Object getResultData() {
		return resultData;
	}
	/**
	 * @param data the resultData to set
	 */
	public void setResultData(Object resultData) {
		this.resultData = resultData;
	}
	/**
	 * @return the insertedPk
	 */
	public Object getInsertedPk() {
		return insertedPk;
	}
	/**
	 * @param insertedPk the insertedPk to set
	 */
	public void setInsertedPk(Object insertedPk) {
		this.insertedPk = insertedPk;
	}
	/**
	 * @return the updateCnt
	 */
	public int getUpdateCnt() {
		return updateCnt;
	}
	/**
	 * @param updateCnt the updateCnt to set
	 */
	public void setUpdateCnt(int updateCnt) {
		this.updateCnt = updateCnt;
	}
}
