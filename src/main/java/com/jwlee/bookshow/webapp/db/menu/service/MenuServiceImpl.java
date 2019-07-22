package com.jwlee.bookshow.webapp.db.menu.service;

import com.jwlee.bookshow.webapp.common.MsgService;
import com.jwlee.bookshow.webapp.common.ReturnData;
import com.jwlee.bookshow.webapp.db.menu.dto.PageDto;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
* MenuServiceImpl
* @author jungwoolee
* @since 2019-07-22
**/
@Service("menuService")
public class MenuServiceImpl extends MsgService implements MenuService {


	@Override
	public ReturnData getSiteMenuList(Map<String, Object> reqMap) {
		ReturnData returnData = new ReturnData();
		StringBuilder sb = new StringBuilder();
		List<PageDto> mainMenuList = new ArrayList<PageDto>(3);

		//대메뉴 셋팅
		String []pageName = {"책 통합 검색","나의 히스토리","베스트 셀러 순위"};
		String []pageIconName = {"dc-mega-icon-nms","dc-mega-icon-rpt","dc-mega-icon-env"};
		String []pageSubUrlList = {
				"/main/bookSearch.do",
				"/main/myHistory.do",
				"/main/bestSeller.do"
		};

		//소메뉴 셋팅
		final int pageNum = 3;
		for(int i=0;i<pageNum;i++)
		{
			PageDto dto = new PageDto();
			dto.setPageNo(i);
			dto.setPageName(pageName[i]);
			dto.setWebIconClass(pageIconName[i]);

			mainMenuList.add(i,dto);
			sb.append(createPageMenu(dto,pageSubUrlList[i],i));
		}


		returnData.setResultData(sb.toString());
		return returnData;
	}

	/**
	 * 대메뉴 태그 생성
	 *
	 * @param pageDto
	 * @return
	 */
	private String createPageMenu(PageDto pageDto,String pageUrl,int pageNumber) {
		StringBuilder sb = new StringBuilder();
		sb.append(String.format("<li class='level-1'><a href='%s' class='%s'>%s</a>", pageUrl, pageDto.getWebIconClass(), pageDto.getPageName()));
//		sb.append(createSubMenu(pageDto.getChildren(),pageUrl, pageNumber, pageDto.getPageName()));

		sb.append("</li>");
		return sb.toString();
	}

	/**
	 * 소메뉴 태그 생성
	 * 
	 * @param mnlist
	 * @return
	 */
	private String createSubMenu(String [] mnlist,String pageUrl,int pageNumber, String pageName) {
		StringBuilder sb = new StringBuilder();
		sb.append("<ul style='visibility: hidden'>");
		sb.append("</ul>");
		return sb.toString();
	}


}