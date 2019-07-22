var jqxTheme = 'ui-book', ctxPath = '';

$(function() {
	Master.initVariable();
	Master.observe();
	Master.initDesign();
	Master.initData();
});

var Master = {
	initVariable: function() {
		ctxPath = $('#ctxPath').val();
		
		var icoNm = 'favicon.ico';
		var icoUrl = ctxPath + '/img/ico/' + icoNm;
		$('head').append('<link rel="shortcut icon" href="' + icoUrl + '" />');
	},
		
	observe: function() {
		$('#btnLogout').bind('click', function(event) { Master.prcsLogout(); });
	},
	
	initDesign: function() {
        // HmHighchart.setOptions();
		$.ajaxSetup({ cache: false });
		
		//메뉴생성
		if($('#mega-menu') !== undefined) {
			$('#mega-menu').dcMegaMenu({ rowItems: '6',
				beforeOpen: function() { 
					// rack화면에서 서브그리드 오픈시 z-index문제로 메뉴를 오픈하면 가려지는 현상발생
					// 메뉴오픈전에 z-index를 조정하는 코드 추가
					$('#mega-menu').css('z-index', 9999999); 
				},
                onLoad: function() {
				console.log($(this));
                    $('#mega-menu').css('visibility', 'visible');
				}
			});
		}
	},
	
	initData: function() {
		Master.setLoc();
		document.title = "BOOK_SHOW_v0.0.1";
		Master.setCommInit();
	},
	
	/** set images src */
	setImg: function() {
	
	},
	
	// 공통초기화 (이미지, 버튼 등등)
	setCommInit: function() {
		try {
			var pwin = $('#pwindow');
			if(pwin.length == 0) {
				pwin = $('<div id="pwindow" style="position: absolute;"></div>');
				pwin.append($('<div></div>'));
				pwin.append($('<div></div>'));
				$('body').append(pwin);
			}
			// HmWindow.create(pwin);
		} catch(e) {}
	},
	
	//버튼이미지 설정
    setBtnImgSrc: function () {

    },
    
    // 공통이미지 설정
    setCommImgSrc: function() {

    },
    
    // location 영역 설정
    setLoc: function(event) {
    	var urlPath = window.location.pathname;
    	$('#mega-menu li.level-1 a').each(function() {
        	var href = $(this).attr('href');

        	console.log(urlPath);
        	console.log(href);
        	if(urlPath == href) {
        		var menu = $(this).text();
        		$('#navMenuNm, #navPageMenu').text(menu);

        	}
        });
    },
    
    // 버튼 활성화/비활성화 상태 변경
    setBtnDisable: function($btn, isDisable) {
    	if(isDisable) {
    		$btn.addClass('btnDisable').attr('disabled', 'disabled');
    	}
    	else {
    		$btn.removeClass('btnDisable').removeAttr('disabled');
    	}
    },
    
    /** 로고 클릭시 메인화면으로 이동 */
    gotoMainPage: function() {
        location.href = '/main/bookSearch.do';
    },



    /** 
     * 로그아웃 처리
     */
    prcsLogout: function() {
    	if(!confirm("로그아웃 하시겠습니까?")) return;
    	$('#hForm').attr({
    		method: 'post',
    		action: ctxPath + '/login/prcsLogout.do',
    		target: '_self'
    	}).submit();
    },

	
	/** =============================
     * 공통 검색조건
     ==============================*/
	createPeriodCondition: function($combo, $date1, $date2) {
		$combo.jqxDropDownList({ width: 100, height: 21, theme: jqxTheme, autoDropDownHeight: true,
			displayMember: 'label', valueMember: 'value', selectedIndex: 0,
			source: [
			         { label: '최근24시간', value: 1 },
			         { label: '최근1주일', value: 7 },
			         { label: '최근1개월', value: 30 },
			         { label: '최근1년', value: 365 },
			         { label: '사용자설정', value: -1 }
	        ]
		})
		.on('change', function(event) {
			switch(String(event.args.item.value)) {
			case '-1': $date1.add($date2).jqxDateTimeInput({ disabled: false }); break;
			default: 
				var toDate = new Date();
				var fromDate = new Date();
				fromDate.setDate(fromDate.getDate() - parseInt(event.args.item.value));
				$date1.jqxDateTimeInput('setDate', fromDate);
				$date2.jqxDateTimeInput('setDate', toDate);
				$date1.add($date2).jqxDateTimeInput({ disabled: true }); 
				break;
			}
		});
		
		HmDate.create($date1, $date2, HmDate.DAY, 1);
		$date1.add($date2).jqxDateTimeInput({ disabled: true });
	},

	refreshCbPeriod: function($cbPeriod) {
        var _selectedIndex = $cbPeriod.jqxDropDownList('getSelectedIndex');
		$cbPeriod.jqxDropDownList('clearSelection');
		$cbPeriod.jqxDropDownList('selectIndex', _selectedIndex);
    },

	
};