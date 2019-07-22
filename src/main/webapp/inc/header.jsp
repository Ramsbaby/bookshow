<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<form id="commForm">
	<input type="hidden" id="ctxPath" value="${pageContext.request.contextPath}" />
	<input type="hidden" id="sUserId" value="${sessionScope.User.userId}" />
	<input type="hidden" id="sAuth" value="${sessionScope.User.auth}" />
</form>
<form id="hForm"></form>
<iframe name="hFrame" width="0" height="0" seamless="seamless" style="display: none"></iframe>