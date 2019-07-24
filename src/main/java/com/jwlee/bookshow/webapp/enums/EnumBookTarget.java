package com.jwlee.bookshow.webapp.enums;

public enum EnumBookTarget {
	전체("전체", "all"), 제목("제목", "title"), ISBN("ISBN", "isbn"), 주제어("주제어", "keyword"), 목차("목차", "contents"), 책소개("책소개",
			"overview"), 출판사("출판사", "publisher");

	private String desc;
	private String code;

	private EnumBookTarget(String desc, String code) {
		this.desc = desc;
		this.code = code;
	}

	public String getDesc() {
		return desc;
	}

	public String getCode() {
		return code;
	}

	public static EnumBookTarget getByCode(String code) {
		EnumBookTarget returnValue = null;

		for (EnumBookTarget temp : EnumBookTarget.values()) {
			if (temp.getCode().equals(code)) {
				returnValue = temp;
				break;
			}
		}
		return returnValue;
	}
}
