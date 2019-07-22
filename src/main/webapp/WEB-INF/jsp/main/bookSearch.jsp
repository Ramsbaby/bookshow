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
                        <div class="searchBox" style=" ">
                            <div class="searchBtn">
                                <button id="btnSearch" type="button" class="p_btn"></button>
                            </div>
                        </div>
                        <div id="bookAllGrid"></div>
                    </div>
                    <div>
                        <div class="searchBox" style=" ">
                            <div class="searchBtn">
                                <button id="btnSearchDetail" type="button" class="p_btn"></button>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="pwindow" style="position: absolute;">
                    <div></div>
                    <div></div>
                </div>
            </div>
        </div>
    </div>


    </div>
</form>
</body>
</html>