<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.*, java.text.*"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<%@include file="/inc/inc.jsp" %>
<title>BookSearchWeb</title>
<link rel="stylesheet"
	href="${pageContext.request.contextPath}/css/login.css" />
<script type="text/javascript"
	src="${pageContext.request.contextPath}/js/login/login.js"></script>
</head>
<body>
	<form id="hForm"></form>
	<form id="loginForm" method="post" onsubmit="return false;">
		<input type="hidden" id="ctxPath" value="${pageContext.request.contextPath}" />
		<div id="n_login">
			<div class="login_block">
				<div class="login_box">
					<div class="login_logo">
						<img src="${loginLogoImg}" alt="${loginLogoTitle}">
					</div>

					<div class="inputBox2">
						<div class="login_form">
							<div class="login_id">
								<img alt="로그인 ID"
									src="${pageContext.request.contextPath}/img/login/login_id.png">
							</div>
							<div class="login_ps">
								<img alt="로그인 패스워드"
									src="${pageContext.request.contextPath}/img/login/login_pw.png">
							</div>
							<div>
								<input type="text" id="userId" name="userId">
							</div>
							<div>
								<input type="password" id="password" name="password"
									autocomplete="off">
							</div>
						</div>
						<div class="login_btn">
							<div>
								<input id="btnLogin" type="image"
									src="${pageContext.request.contextPath}/img/login/login_btn.png"
									style="cursor: pointer" alt="로그인버튼">
							</div>
						</div>
						<div class="login_sub" style="visibility: visible;">
							<input type="button" value="회원가입" id="btnAccount"
								class="btn-white">
						</div>

						<div class="login_copy">
							Copyright ⓒ
							<%=Calendar.getInstance().get(Calendar.YEAR)%>
							<strong>${copyright}</strong> . All rights reserved.
						</div>
					</div>
				</div>
			</div>
		</div>
	</form>
</body>
</html>