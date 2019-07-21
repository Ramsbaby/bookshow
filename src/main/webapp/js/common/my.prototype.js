/**
 * 문자열의 길이를 구한다. 한글 (2byte), 영문 (1byte)
 * @returns 
 */
String.prototype.byteLen = function() {
	var cnt = 0;
	for(var i = 0; i < this.length; i++) {
		if(this.charCodeAt(i) > 127) cnt+= 2;
		else cnt++;
	}
	return cnt;
}

/** 
 * 공백이나 널인지 확인
 * @returns {Boolean}
 */
String.prototype.isBlank = function() {
	var str = this.trim();
	for(var i = 0; i < str.length; i++) {
		if(str.charAt(i) != "\t" && str.charAt(i) != "\n" && str.charAt(i) != "\r") return false;
	}
	return true;
}

/**
 * 숫자로 구성되어 있는지 학인
 * @returns
 */
String.prototype.isNum = function() {
	return (/^[0-9]+$/).test(this) ? true : false;
}

/**
 * 영어로 구성되어 있는지 학인
 * @returns
 */
String.prototype.isEng = function() {
//	alert( (/^[a-zA-Z]+$/).test(this) ? true : false);
	return (/^[a-zA-Z]+$/).test(this) ? true : false;
//	return false;
//	return (/^[a-zA-Z]+$/).test(this) ? true : false;
}

/**
 * 한글로 구성되어 있는지 학인
 * @returns
 */
String.prototype.isKor = function() {
	return (/^[가-힣]+$/).test(this) ? true : false;
}

/**
 * 이메일의 유효성을 체크
 * @returns
 */
String.prototype.isEmail = function() {
    return (/\w+([-+.]\w+)*@\w+([-.]\w+)*\.[a-zA-Z]{2,4}$/).test(this.trim());
}

/**
 * 전화번호 체크 - arguments[0] : 전화번호 구분자
 * @returns
 */
String.prototype.isPhone = function() {
    var arg = arguments[0] ? arguments[0] : "";
    return eval("(/(02|0[3-9]{1}[0-9]{1})" + arg + "[1-9]{1}[0-9]{2,3}" + arg + "[0-9]{4}$/).test(this)");
}

/**
 * 핸드폰번호 체크 - arguments[0] : 핸드폰 구분자
 * @returns
 */
String.prototype.isMobile = function() {
    var arg = arguments[0] ? arguments[0] : "";
    return eval("(/01[016789]" + arg + "[1-9]{1}[0-9]{2,3}" + arg + "[0-9]{4}$/).test(this)");
}

/**
 * IPv4 체크
 */
String.prototype.isIPv4 = function() {
	return (/^(((\d)|([1-9]\d)|(1\d{2})|(2[0-4]\d)|(25[0-5]))\.){3}(((\d)|([1-9]\d)|(1\d{2})|(2[0-4]\d)|(25[0-5])))$/).test(this);
}

/**
 * IPv6 체크
 */
String.prototype.isIPv6 = function() {
	var regex = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]).){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]).){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/;
	return (regex).test(this);
}

String.prototype.lpad = function(padLength, padString) {
	var s = this;
	while(s.length < padLength) {
		s = padString + s;
	}
	return s;
}

String.prototype.rpad = function(padLength, padString) {
	var s = this;
	while(s.length < padLength) {
		s = s + padString;
	}
	return s;
}

String.prototype.format = function() {
	var str = this;
	for(var i = 0; i < arguments.length; i++) {
		var reg = new RegExp("\\{" + i + "\\}", "gm");
		str = str.replace(reg, arguments[i]);
	}
	return str;
}

String.prototype.substitute = function() {
	var str = this;
	for(var i = 0; i < arguments.length; i++) {
		var reg = new RegExp("\\{" + i + "\\}", "gm");
		str = str.replace(reg, arguments[i]);
	}
	return str;
}

/**
 * XSS Filter된 문자를 치환하는 함수
 * 치환문자: < (&lt;), > (&gt;), & (&amp;), " (&quot;)
 * @returns {String}
 */
String.prototype.htmlCharacterUnescapes = function() {
	var str = this;
	str = str.replace(/\&lt\;/g, '<').replace(/\&gt\;/g, '>').replace(/\&amp\;/g, '&').replace(/\&quot\;/g, '"')
			.replace(/\<script\>/ig, '&lt;script&gt;').replace(/\<\/script\>/ig, '&lt;/script&gt;');
	return str;
}

String.prototype.htmlCharacterEscapes = function() {
    var str = this;
    str = str.replace(/\</g, '&lt;').replace(/\>/g, '&gt;').replace(/\&/g, '&amp;').replace(/\"/g, '&quot;');
    return str;
}

if (!String.prototype.startsWith) {
    String.prototype.startsWith = function(searchString, position) {
        position = position || 0;
        return this.indexOf(searchString, position) === position;
    };
}