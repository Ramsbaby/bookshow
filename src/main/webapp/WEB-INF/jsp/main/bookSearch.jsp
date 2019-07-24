<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<meta charset="UTF-8">
<title>BOOK_SHOW_0.0.1</title>
<%@include file="/inc/inc.jsp" %>
<script src="${pageContext.request.contextPath}/js/main/bookSearch.js"></script>
<style>
    #prgrsBar > div > span {
        left: 0px !important;
    }
</style>
<body>
<div id="header">
    <%@include file="/inc/header.jsp" %>
</div>
<div id="nav">
    <%@include file="/inc/nav.jsp" %>
</div>
<form id="mainForm" name="mainForm">
    <div id="section">
        <div id="loc">
            <%@include file="/inc/loc.jsp" %>
        </div>
        <div class="content">
            <div class="contentsP10" style="top: 0">

                <div id="mainSplitter">
                    <div>
                        <div class="centerCont">
                            <div class="searchBox" style=" ">
                                <input id="pageNumber" type="hidden" name="page" value="1">
                                <input id="pageTotalNumber" type="hidden" value="1">

                                <div>
                                    <label style="float: left">검색필드 : </label>
                                    <div id="cbSearchField" name="target"></div>
                                </div>
                                <div>
                                    <label style="float: left">키워드 : </label>
                                    <input id="search-keyword" name="searchKeyword" type="text">
                                </div>

                                <div class="searchBtn" style="margin-top: 3px;">
                                    <label >페이지 : </label>
                                    <label id="pageLoc" > 1/1 </label>
                                    <button id="btnPrev" type="button" class="p_btnBackIcon"></button>
                                    <button id="btnNext" type="button" class="p_btnNextIcon"></button>
                                    <button id="btnSearch" type="button" class="p_btn"></button>
                                </div>
                            </div>
                            <div id="bookAllGrid"></div>
                        </div>
                    </div>
                    <div>
                        <div class="newBox">
                            <div class="scontent" style="top: 0px;">
                                <div class="contentsP10">

                                    <div class="searchBox" >
                                        <div>
                                            <label style="float: left">책 상세 조회</label>
                                        </div>
                                    </div>
                                    <div id="bookDetailDiv" style='margin: 10px;'>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</form>
</body>
</html>