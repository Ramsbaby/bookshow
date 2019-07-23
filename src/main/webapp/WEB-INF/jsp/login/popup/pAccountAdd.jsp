<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<meta charset="UTF-8">
<title>회원가입</title>
<%@include file="/inc/inc.jsp" %>
<script src="${pageContext.request.contextPath}/js/user/popup/pAccountAdd.js"></script>
</head>
<body style="overflow: hidden;">
<form id="popupAddForm" name="popupAddForm">
    <!-- Hidden Field 영역 BEGIN -->
    <input type="hidden" id="ctxPath" value="${pageContext.request.contextPath}"/>
    <!-- Hidden Field 영역 END -->

    <div class="p_top_title_bg">
        <div class="p_top_title">
            <h1>계정신청</h1>
            <div class="p_close" onclick="self.close()"></div>
        </div>
    </div>

    <div class="tableBorder">
        <table>
            <tr class="pop_grid">
                <td class="pop_gridSub">아이디</td>
                <td><input type="text" id="pUserId" name="userId" class="pop_input"/></td>
                <td class="pop_gridSub">이름</td>
                <td><input type="text" id="pUserName" name="userName" class="pop_input"/></td>
            </tr>
            <tr class="pop_grid">
                <td class="pop_gridSub">비밀번호</td>
                <td><input type="password" id="pPassword" name="password" class="pop_input" autocomplete="off"/></td>
                <td class="pop_gridSub">휴대폰</td>
                <td><input type="text" id="cellTel" name="cellTel" class="pop_input"/></td>
            </tr>

            <tr class="pop_grid">
                <td class="pop_gridSub">비밀번호 확인</td>
                <td><input type="password" id="pRePassword" name="rePassword" class="pop_input" autocomplete="off"/></td>
            </tr>
        </table>
    </div>

    <div style="text-align:center; margin-top:10px;">
        <button id="pbtnSave" type="button" class="p_btnSave"></button>
        <button id="pbtnClose" type="button" class="p_btnClose"></button>
    </div>
</form>
</body>
</html>
