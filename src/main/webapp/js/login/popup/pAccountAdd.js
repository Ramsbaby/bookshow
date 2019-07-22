var UserAdd = {
    /** Initialize */
    initVariable: function () {
    },

    /** Event Object */
    observe: function () {
        $('button').bind('click', function(event) {UserAdd.eventControl(event); });
    },

    /** Event Control Function */
    eventControl: function (event) {
        var objElement = event.currentTarget;
        if (objElement === window) {
            this.resizeWindow();
            return;
        }

        switch (objElement.id) {
	        case "pbtnSave":
	        	this.pSaveUser();
	        	break;
	        case "pbtnClose":
	        	this.pCancelUser();
	        	break;
        }
    },

    /** Init Data */
    initData: function () {

    },
    /*=======================================================================================
    버튼 이벤트 처리
    ========================================================================================*/
   
    pSaveUser: function() {
    	if(!this.validateForm()) return;
    	Server.get('/login/userConf/addAccount.do', {
    		data: $("#popupAddForm").serialize(),
    		success: function(data) {
                alert(data);

    			if(data.indexOf("중복") == -1)
					self.close();
    			else
                    $("#pUserId").focus();
    		}
    	});
    },
    validateForm: function() {
    	var obj = $("#pUserId");
    	if(obj.val().isBlank()) {
    		alert("아이디를 입력해주세요.");
    		obj.focus();
    		return false;
    	}
    	obj = $("#pPassword");
    	if(obj.val().isBlank()) {
    		alert("비밀번호를 입력해주세요.");
    		obj.focus();
    		return false;
    	}
    	obj = $("#pRePassword");
    	if(obj.val().isBlank()) {
    		alert("비밀번호 확인을 입력해주세요.");
    		obj.focus();
    		return false;
    	}
    	if($("#pPassword").val() != $("#pRePassword").val()) {
    		alert("비밀번호가 일치하지 않습니다.");
    		$("#pPassword").focus();
    		return false;
    	}
    	return true;
    },
    // 취소
    pCancelUser: function() {
    	self.close();
    }
};
$(function () {
    UserAdd.initVariable();
    UserAdd.observe();
    UserAdd.initData();
});