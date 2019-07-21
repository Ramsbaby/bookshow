package com.jwlee.bookshow.webapp.common;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;

import java.util.Locale;

/**
* MsgService
* @author jungwoolee
* @since 2019-07-22
**/
public class MsgService {

	@Autowired
	private MessageSource messageSource;
	
	protected String getMessage(String code) {
		return getMessage(code, null);
	}

	protected String getMessage(String code, Object[] params) {
		return getMessage(code, params, Locale.getDefault());
	}

	protected String getMessage(String code, Object[] params, Locale locale) {
		return code;
	}
	
	protected String getPrcsMesssage() {
		return messageSource.getMessage("처리되었습니다.", null, Locale.getDefault());
	}
	// 추가 성공
	protected String getAddOkMessage() {
		return getMessage("추가되었습니다.");
	}

	// 추가 실패
	protected String getAddFailMessage() {
		return getMessage("추가 중 에러가 발생하였습니다.");
	}

	// 수정 성공
	protected String getEditOkMessage() {
		return getMessage("수정되었습니다.");
	}

	// 수정 실패
	protected String getEditFailMessage() {
		return getMessage("수정 중 에러가 발생하였습니다.");
	}

	// 삭제 성공
	protected String getDeleteOkMessage() {
		return getMessage("삭제되었습니다.");
	}

	// 삭제 실패
	protected String getDeleteFailMessage() {
		return getMessage("삭제 중 에러가 발생하였습니다.");
	}

	// 저장 성공
	protected String getSaveOkMessage() {
		return getMessage("저장되었습니다.");
	}

	// 저장 실패
	protected String getSaveFailMessage() {
		return getMessage("저장 중 에러가 발생하였습니다.");
	}

}
