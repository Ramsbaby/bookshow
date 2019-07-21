var ctxPath = '';

$(function() {
	Main.initVariable();
	Main.observe();
	Main.initDesign();
	Main.initData();
	$('#userId').focus();
});

var Main = {
		/** variable */
		initVariable: function() {
			ctxPath = $("#ctxPath").val();
		},
		
		/** add event */
		observe: function() {
			$('#password').on('keypress', function(event) { if(event.keyCode == 13) {Main.login(); return false;} return; });
			$('#btnLogin').bind('click', function(event) { Main.eventControl(event); });
			$('#btnEngineer').bind('click', function(event) { Main.eventControl(event); });
			$('#btnAccount').bind('click', function(event) { Main.eventControl(event); });
			$('#btnGoSubPolice').bind('click', function(event) { Main.eventControl(event); });
		},
		
		/** event handler */
		eventControl: function(event) {
			var curTarget = event.currentTarget;
			switch(curTarget.id) {
			case 'btnLogin': this.login(); break;
			case 'btnAccount': this.showAccount(); break;
			}
		},
		
		/** init design */
		initDesign: function() {
		},
		
		/** init data */
		initData: function() {
			
		},
		
		/** login */
		login: function() {
			var obj = $('#userId');
			if($.isBlank(obj.val())) {
				alert('ID를 입력해주세요.');
				obj.focus();
				return;
			}
			obj = $('#password');
			if($.isBlank(obj.val())) {
				alert('Password를 입력해주세요.');
				obj.focus();
				return;
			}
			
			Server.post('/login/prcsLogin.do', {
				data: { userId: $('#userId').val(), password: $('#password').val() },
				success: function(data) {
					var mainUrl = null;
					switch(data.siteName) {
					case 'Samsung': // 삼성전자
						mainUrl = '/samsung/main.do'; break;
					default:
						mainUrl = '/main2.do'
						break;
					}
					location.href = ctxPath + mainUrl;
				}
			});
		},
		
		/** 사용자 계정 팝업 */
		showAccount : function() {
			var mainUrl = $('#gSiteName').val();
			switch(mainUrl) {
				default:
					mainUrl = '/login/popup/pAccountAdd.do';
					MyUtil.createPopup( mainUrl , $('#hForm'), 'pAccountAdd', 600, 220);
					break;
			}
		}
};