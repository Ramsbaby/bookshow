package com.jwlee.bookshow.webapp.common;

/**
* CustomException - 사용자 정의 Exception
* @author jungwoolee
* @since 2019-07-22
**/
@SuppressWarnings("serial")
public class CustomException extends RuntimeException {

	/**
	 * Constructor
	 * @param message	exception message
	 */
	public CustomException(String message) {
		super(message);
	}

	/**
	 * Constructor
	 * @param message	exception message
	 * @param throwable	exception object
	 */
	public CustomException(String message, Throwable throwable) {
		super(message, throwable);
	}

}
