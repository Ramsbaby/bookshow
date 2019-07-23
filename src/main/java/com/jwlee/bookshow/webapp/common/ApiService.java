package com.jwlee.bookshow.webapp.common;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import com.jwlee.bookshow.common.util.MyUtils;
import com.jwlee.bookshow.webapp.enums.EnumBookCategory;
import com.jwlee.bookshow.webapp.enums.EnumBookTarget;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ApiService {

	private static final Logger logger = LoggerFactory.getLogger(ApiService.class);

	private static final String API_REST_API_KEY = "f6429f68a2147e590a61969029b312af";
	private static final String API_BOOK_URL = "https://dapi.kakao.com/v2/search/book";

	public Map<String, Object> searchBooks(String searchWord, String target, String category, int page) {
		//
		final String URL = API_BOOK_URL + "?target=" + target + "&target=" + target + "&category=" + category + "&page="
				+ page;
		Map<String, String> headers = new HashMap<>();
		headers.put("Authorization", "KakaoAK " + API_REST_API_KEY);
		Map<String, String> params = new HashMap<>();
		params.put("query", searchWord);
		String jsonString = null;
		Map<String, Object> resultData = null;
		try {
			jsonString = MyUtils.getHttpPOST2String(URL, headers, params, false);
			ObjectMapper mapper = new ObjectMapper();
			resultData = mapper.readValue(jsonString, new TypeReference<Map<String, Object>>() {
			});

			logger.debug(URL + " - get API Info : " + jsonString);
			// resultData = JsonUtils.readJsonToStringObjectUnparse(jsonString);

		} catch (Exception e) {
			logger.info(URL + " - get API Exception : " + jsonString);
			e.printStackTrace();
		}
		return resultData;
	}

	/**
	 * 책 정보 가져오기
	 * 
	 * 데이터 참조 :
	 * https://developers.kakao.com/docs/restapi/search#%EC%B1%85-%EA%B2%80%EC%83%89
	 * 
	 * @param ISBN
	 * @return JSON -> Map<String,Object>
	 */
	public Map<String, Object> getBookByISBN(String ISBN) {
		Map<String, Object> book = null;
		Map<String, Object> json = this.searchBooks(ISBN, EnumBookTarget.전체.getCode(), EnumBookCategory.전체.getCode(),
				1);
		int cnt = (Integer) ((Map) json.get("meta")).get("total_count");
		if (cnt > 0) {
			book = (Map) ((List) json.get("documents")).get(0);
		}
		return book;
	}

}
