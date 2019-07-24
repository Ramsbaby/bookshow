<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<meta charset="UTF-8">
<title>BOOK_SHOW_0.0.1</title>
<%@include file="/inc/inc.jsp" %>
<script src="${pageContext.request.contextPath}/js/main/myHistory.js"></script>
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
        <div class="newBox">

            <div class="searchBox" style=" ">
                <div class="searchBtn" style="margin-top: 3px;">
                    <button id="btnSearch" type="button" class="p_btn"></button>
                </div>
            </div>
            <div class="scontent">
                <div class="contentsP10">

                    <div id="myHistoryGrid"></div>
                </div>
            </div>
        </div>
    </div>
</form>
</body>
</html>