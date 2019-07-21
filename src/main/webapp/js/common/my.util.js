var MyUtil = {
		/** window.open() 팝업 */
		showPopup: function(url, frm, popNm, popW, popH) {
			var host = location.hostname.replace(/\./g, '_');
			popNm = popNm + host;
			var opts = [];
			opts.push('width=' + popW);
			opts.push('height=' + popH);
			opts.push('left=' + parseInt((screen.availWidth / 2) - (popW / 2)));
			opts.push('top=' + parseInt((screen.availHeight / 2) - (popH / 2)));
			opts.push('resizable=yes');
			opts.push('scrollbars=yes');
			opts.push('status=no');

			var win = window.open('', popNm, opts.join(','));
			if(win!=null && !win.closed)
				win.focus();
			frm.attr('method', 'POST');
			frm.attr('target', popNm);
			frm.attr('action', ctxPath + url);
			frm.submit();
			frm.empty();
			return win;
		},

		createPopup: function(url, frm, popNm, popW, popH, params) {
			frm.empty();
			if(params !== undefined) {
				$.each(params, function(key, value) {
					$('<input />', { type: 'hidden', id: key, name: key, value: value }).appendTo(frm);
				});
			}
			return this.showPopup(url, frm, popNm, popW, popH);
		},

		createFullPopup : function(url, frm, popNm, params) {
			frm.empty();
			var host = location.hostname.replace(/\./g, '_');
			popNm = popNm + host;
			if (params !== undefined && params !== null) {
				$.each(params, function(key, value) {
					$('<input />', { type : 'hidden', id : key, name : key, value : value }).appendTo(frm);
				});
			}
			var opts = [];
			opts.push('fullscreen=yes');
			opts.push('resizable=yes');
			opts.push('scrollbars=yes');
			opts.push('status=no');

			window.open('', popNm, opts.join(',')).focus();
			frm.attr('method', 'POST');
			frm.attr('target', popNm);
			frm.attr('action', url);
			frm.submit();
			frm.empty();
		},

		/**
		 * 차트를 서버에 저장(export폴더)한 후 파일명을 리턴함.
		 * 엑셀에 차트를 삽입할때 사용!
		 * @param chart	차트Object
		 * @return 파일명
		 */
		saveChart: function(chart) {
			var fname = $.format.date(new Date(), 'yyyyMMddHHmmssSSS') + '.png';
			chart.jqxChart('saveAsPNG', fname, ctxPath + '/file/saveChart.do', true);
			return fname;
		},

		/**
		 * 차트를 png파일로 export
		 * @param chart
		 */
		exportChart: function(chart, fname) {
			chart.jqxChart('saveAsPNG', fname, ctxPath + '/file/exportChart.do');
		},

		/**
		 * Highchart export
		 */
		exportHighchart: function(chart, fname) {
			// chart export size를 조정하여 svg 추출
			var svg = chart.getSVG({
				exporting: {
		            sourceWidth: chart.chartWidth,
		            sourceHeight: chart.chartHeight
		        }
			});
		    var canvas = document.createElement('canvas');
		    canvg(canvas, svg); //svg -> canvas draw
			var imgData = canvas.toDataURL("image/png"); // png이미지로 변환 후 octect-stream으로 변환
			
			this.sendHiddenForm('/file/exportHighchart.do', { fname: fname, imgData: imgData });
		},
		
		sendHiddenForm: function(url, params) {
			var frm = $('#hForm');
			frm.empty();
			if (params !== undefined && params !== null) {
				$.each(params, function(key, value) {
					$('<input />', { type : 'hidden', id : key, name : key, value : value }).appendTo(frm);
				});
			}
			frm.attr('method', 'POST');
			frm.attr('target', 'hFrame');
			frm.attr('action', url);
			frm.submit();
			frm.empty();
		},
		
		/**
		 * Highchart를 png파일로 서버에 저장(export폴더)
		 */
		saveHighchart: function(chart, afterFunc, params) {
			var fname = $.format.date(new Date(), 'yyyyMMddHHmmssSSS') + '.png';
			// chart export size를 조정하여 svg 추출
			var svg = chart.getSVG({
				exporting: {
		            sourceWidth: chart.chartWidth,
		            sourceHeight: chart.chartHeight
		        }
			});
		    var canvas = document.createElement('canvas');
		    canvg(canvas, svg); //svg -> canvas draw
			var imgData = canvas.toDataURL("image/png"); // png이미지로 변환
			var ch_params={ fname: fname, imgData: imgData };
//			console.log("chart param = ",ch_params);
//			$.post('/file/saveHighchart.do', ch_params, 
//					function(result) {
//				console.log(result);
//						if(afterFunc!=null)
//							afterFunc(params);
//					}
//			);
			
			Server.post('/file/saveHighchart.do', {
				data: ch_params,
				success: function(result) { 
//					console.log(result);
					if(afterFunc!=null){//이미지 저장 후 바로 엑셀 출력시
//						console.log(fname);
						params.imgFile = fname;
						afterFunc(params);
					}
				} 
			});
			return fname;
		},
		
		/**
		 * 엑셀 export
		 * @param url
		 * @param params
		 */
		exportExcel: function(url, params) {
			var loader = $('#comLoader');
			if(loader.length <= 0) {
				loader = $('<div id="comLoader" style="z-index: 100000"></div>');
				loader.appendTo('body');
			}
			loader.jqxLoader({ isModal: false, width: 300, height: 70, theme: jqxTheme, text: '엑셀을 생성중입니다. 잠시만 기다려주세요.' });
			loader.jqxLoader('open');
			if(params == null) params = {};
			$.ajax({
				type: 'post',
				url: url,
				dataType: 'json',
				contentType: 'application/json; charset=utf-8',
				data: JSON.stringify(params),
				success: function(data, status) {
					loader.jqxLoader('close');
					if(data.hasError) {
						alert(data.errorInfo.message);
						return;
					}
					MyUtil.fileDown({ filePath: data.resultData.filePath, fileName: data.resultData.fileName });
				}
			});

//			$.post(url, params,
//					function(result) {
//						loader.jqxLoader('close');
//						if(result.hasError) {
//							alert(result.errorInfo.message);
//							return;
//						}
//						MyUtil.fileDown({ filePath: result.resultData.filePath, fileName: result.resultData.fileName });
//					}
//			);
		},

		/** jqxGrid excel export */
		exportGrid: function ($grid, filename) {
			var groups = $grid.jqxGrid('columnGroups');
			var headerGrps = [];
//			console.log(groups);
			if (groups != null && groups.length > 0) {
				$.each(groups, function (idx, group) {
					headerGrps.push({text: group.text, name: group.name, colspan: group.columns.length});
				});
			}
			var records = $grid.jqxGrid('columns').records;
			var headers = [];
//			console.log();
			$.each(records, function (idx, record) {
				if (record.datafield == null) return;
				headers.push({
					text: record.text,
					columngroup: record.columngroup,
					datafield: record.displayfield != null ? record.displayfield : record.datafield,
					width: record.width,
					columntype: record.columntype
				});
			});
//			console.log(headers);
			var loader = $('#comLoader');
			if (loader.length <= 0) {
				loader = $('<div id="comLoader" style="z-index: 100000"></div>');
				loader.appendTo('body');
			}
			loader.jqxLoader({isModal: false, width: 300, height: 70, theme: jqxTheme, text: '엑셀을 생성중입니다. 잠시만 기다려주세요.'});
			loader.jqxLoader('open');

			$.ajax({
				type: 'post',
				url: '/file/exportGrid.do',
				dataType: 'json',
				contentType: 'application/json; charset=utf-8',
				data: JSON.stringify({
					filename: filename,
					headerGrps: headerGrps,
					header: headers,
					data: $grid.jqxGrid('getboundrows')
				}),
				success: function (data, status) {
					loader.jqxLoader('close');
					if (data.hasError) {
						alert(data.errorInfo.message);
						return;
					}
					MyUtil.fileDown({filePath: data.resultData.filePath, fileName: data.resultData.fileName});
				}
			});
		},

		fileDown: function(params) {
			$('#hForm').empty();
			if(params !== undefined) {
				$.each(params, function(key, value) {
					$('<input />', { type: 'hidden', id: key, name: key, value: value }).appendTo($('#hForm'));
				});
			}
			$('#hForm').attr('action', ctxPath + '/file/fileDown.do');
			$('#hForm').attr('method', 'post');
			$('#hForm').attr('target', 'hFrame');
			$('#hForm').submit();
		},

		showLoader: function(msg) {
			var loader = $('#comLoader');
			if(loader.length <= 0) {
				loader = $('<div id="comLoader" style="z-index: 100000"></div>');
				loader.appendTo('body');
			}
			loader.jqxLoader({ isModal: false, width: 300, height: 70, theme: jqxTheme, text: msg || '잠시만 기다려주세요.' });
			loader.jqxLoader('open');
		},

		hideLoader: function() {
			var loader = $('#comLoader');
			if(loader.length > 0) {
				loader.jqxLoader('close');
			}
		},

		/**
		 * Unit1024 convert
		 * @param value
		 * @returns {String}
		 */
		convertUnit1024: function(value) {
			var retnVal = '';
			var result = '';
			if (value >= 0) {
		        if (value >= Math.pow(1024, 4)) {
		            result = Math.round((value / Math.pow(1024, 4)) * 100);
		            retnVal += (result / 100) + " T";
		        }
		        else if (value >= Math.pow(1024, 3)) {
		            result = Math.round((value / Math.pow(1024, 3)) * 100);
		            retnVal += (result / 100) + " G";
		        }
		        else if (value >= Math.pow(1024, 2)) {
		            result = Math.round((value / Math.pow(1024, 2)) * 100);
		            retnVal += (result / 100) + " M";
		        }
		        else if (value >= Math.pow(1024, 1)) {
		            result = Math.round((value / Math.pow(1024, 1)) * 100);
		            retnVal += (result / 100) + " K";
		        }
		        else {
			        result = Math.round(value * 100);
			        retnVal += (result / 100) + " B";
		        }
		    }
		    else {
		        value = -value;
		        if (value >= Math.pow(1024, 4)) {
		            result = Math.round((value / Math.pow(1024, 4)) * 100);
		            retnVal += "- " + (result / 100) + " T";
		        }
		        else if (value >= Math.pow(1024, 3)) {
		            result = Math.round((value / Math.pow(1024, 3)) * 100);
		            retnVal += "- " + (result / 100) + " G";
		        }
		        else if (value >= Math.pow(1024, 2)) {
		            result = Math.round((value / Math.pow(1024, 2)) * 100);
		            retnVal += "- " + (result / 100) + " M";
		        }
		        else if (value >= Math.pow(1024, 1)) {
		            result = Math.round((value / Math.pow(1024, 1)) * 100);
		            retnVal += "- " + (result / 100) + " K";
		        }
		        else {
			        result = Math.round(value * 100);
			        retnVal += "- " + (result / 100);
		        }
		    }
			return retnVal;
		},

    /**
     * Unit1000 convert
     * @param value
     * @returns {String}
     */
    convertUnit1000: function(value) {
        var retnVal = '';
        var result = '';
        if (value >= 0) {
            if (value >= Math.pow(1000, 4)) {
                result = Math.round((value / Math.pow(1000, 4)) * 100);
                retnVal += (result / 100) + " T";
            }
            else if (value >= Math.pow(1000, 3)) {
                result = Math.round((value / Math.pow(1000, 3)) * 100);
                retnVal += (result / 100) + " G";
            }
            else if (value >= Math.pow(1000, 2)) {
                result = Math.round((value / Math.pow(1000, 2)) * 100);
                retnVal += (result / 100) + " M";
            }
            else if (value >= Math.pow(1000, 1)) {
                result = Math.round((value / Math.pow(1000, 1)) * 100);
                retnVal += (result / 100) + " K";
            }
            else {
                result = Math.round(value * 100);
                retnVal += (result / 100);
            }
        }
        else {
            value = -value;
            if (value >= Math.pow(1000, 4)) {
                result = Math.round((value / Math.pow(1000, 4)) * 100);
                retnVal += "- " + (result / 100) + " T";
            }
            else if (value >= Math.pow(1000, 3)) {
                result = Math.round((value / Math.pow(1000, 3)) * 100);
                retnVal += "- " + (result / 100) + " G";
            }
            else if (value >= Math.pow(1000, 2)) {
                result = Math.round((value / Math.pow(1000, 2)) * 100);
                retnVal += "- " + (result / 100) + " M";
            }
            else if (value >= Math.pow(1000, 1)) {
                result = Math.round((value / Math.pow(1000, 1)) * 100);
                retnVal += "- " + (result / 100) + " K";
            }
            else {
                result = Math.round(value * 100);
                retnVal += "- " + (result / 100);
            }
        }
        return retnVal;
    },

    /**
     * Unit1000 convert (대전시청 대시보드 Kbps > Mbps)
     * @param value
     * @returns {String}
     */
    convertUnit1000_DaeJeonCity: function(value) {
        var retnVal = '';
        var result = '';
        if (value >= 0) {
            if (value >= Math.pow(1000, 4)) {
                result = Math.round((value / Math.pow(1000, 4)) * 100);
                retnVal += (result / 100) + " T";
            }
            else if (value >= Math.pow(1000, 3)) {
                result = Math.round((value / Math.pow(1000, 3)) * 100);
                retnVal += (result / 100) + " G";
            }
            else if (value >= Math.pow(1000, 2)) {
                result = Math.round((value / Math.pow(1000, 2)) * 100);
                retnVal += (result / 100) + " M";
            }
            else if (value >= Math.pow(1000, 1)) {
                result = Math.round((value / Math.pow(1000, 1)) * 100);
                // retnVal += (result / 100) + " K";
                //Kbps > Mbps 변환 //소숫점 한자리
                if(((result / 100) / 1000).toFixed(1) == 0.0){ //0.0 >0 표기
                    retnVal +=0 + " M";
                }else{
                    retnVal +=((result / 100) / 1000).toFixed(1) + " M";
                }
            }
            else {
                /*       result = Math.round(value * 100);
                       retnVal += (result / 100);*/
                retnVal += "0 M";
            }
        }
        else {
            value = -value;
            if (value >= Math.pow(1000, 4)) {
                result = Math.round((value / Math.pow(1000, 4)) * 100);
                retnVal += "- " + (result / 100) + " T";
            }
            else if (value >= Math.pow(1000, 3)) {
                result = Math.round((value / Math.pow(1000, 3)) * 100);
                retnVal += "- " + (result / 100) + " G";
            }
            else if (value >= Math.pow(1000, 2)) {
                result = Math.round((value / Math.pow(1000, 2)) * 100);
                retnVal += "- " + (result / 100) + " M";
            }
            else if (value >= Math.pow(1000, 1)) {
                result = Math.round((value / Math.pow(1000, 1)) * 100);
                // retnVal += "- " + (result / 100) + " K";
                //Kbps > Mbps 변환 //소숫점 한자리
                if(((result / 100) / 1000).toFixed(1) == 0.0){ //0.0 >0 표기
                    retnVal +="- "+0 + " M";
                }else{
                    retnVal +="- " +((result / 100) / 1000).toFixed(1) + " M";
                }
            }
            else {
                /* result = Math.round(value * 100);
                 retnVal += "- " + (result / 100);*/
                retnVal += "- 0 M";
            }
        }
        return retnVal;
    },

		/**
		 * Object 복제
		 * @param obj
		 * @returns
		 */
		clone: function(obj) {
			if(obj == null || typeof(obj) != 'object') return obj;
			var newObj = obj.constructor();
			for(var key in obj) {
				if(obj.hasOwnProperty(key)) {
					newObj[key] = MyUtil.clone(obj[key]);
				}
			}
			return newObj;
		},

		/**
		 * 초단위를 년/월/일/시/분/초 로 변환
		 * @param value
		 * @returns {String}
		 */
		convertCTime: function(value) {
			var result = '';
			var time = value;
		    var year, day, hour, min, result = '';
		    if((60 * 60 * 24 * 365) <= time) {
		    	year = Math.floor(time / (60 * 60 * 24 * 365));
		    	time = time - ((60 * 60 * 24 * 365) * year);
		    	result += year + '년 ';
		    }
		    if ((60 * 60 * 24) <= time) {
		        day = Math.floor(time / (60 * 60 * 24));
		        time = time - ((60 * 60 * 24) * day);
		        result += day + '일 ';
		    }
		    if ((60 * 60) <= time) {
		        hour = Math.floor(time / (60 * 60));
		        time = time - ((60 * 60) * hour);
		        result += hour + '시 ';
		    }
		    if (60 <= time) {
		        min = Math.floor(time / 60);
		        time = time - (60 * min);
		        result += min + '분 ';
		    }

		    if (time != '' && time != 0 ) {
		    	if(isNaN(time)) time = 0;
		    	if (time < 0) time = 0;
		        result += time + '초 ';
		    }
		    else {
		    	result += '0초';
		    }
		    return result;
		},

		/**
		 * 밀리초를 년/월/일/시/분/초로 변환
		 */
		convertMilisecond: function(value) {
			return this.convertCTime(Math.ceil(value / 1000));
		},

		/**
		 * IP to Long
		 * @param value
		 * @returns
		 */
		convertIpToLong: function(value) {
			var d = value.split('.');
			return ((((((+d[0])*256)+(+d[1]))*256)+(+d[2]))*256)+(+d[3]);
		},

		/**
		 * Long to IP
		 * @param value
		 * @returns
		 */
		convertLongToIp: function(value) {
			var d = value % 256;
			for(var i = 3; i > 0; i--) {
				value = Math.floor(value / 256);
				d = value % 256 + '.' + d;
			}
			return d;
		},

		/**
		 * Event Level to Custom Event Name
		 * @param value
		 * @returns
		 */
		convertEvtLevelToEvtName: function (value) {
			if (value === null) return '';
            switch (value.toString()) {
                case "-1":
                case "조치중":
                    return $('#sEvtLevelMeasure').val();
                case "0":
                case "정상":
                    return $('#sEvtLevel0').val();
                case "1":
                case "정보":
                    return $('#sEvtLevel1').val();
                case "2":
                case "주의":
                    return $('#sEvtLevel2').val();
                case "3":
                case "알람":
                    return $('#sEvtLevel3').val();
                case "4":
                case "경보":
                    return $('#sEvtLevel4').val();
                case "5":
                case "장애":
                    return $('#sEvtLevel5').val();
                default:
                    return value.toString();
            }
        },

		/**
		 * 천단위 콤마 함수		1000000 => 1,000,000
		 */
		commaNum: function(num) {
			var len, point, str;
			num = num + "";
			point = num.length % 3;
			len = num.length;
			str = num.substring(0, point);
			while (point < len) {
				if (str != "") str += ",";
				str += num.substring(point, point + 3);
				point += 3;
			}
			return str;
		},

		/**
		 * UUID생성
		 * @returns
		 */
		generateUUID: function() {
		    var d = new Date().getTime();
		    var uuid = 'xxxxxxxx_xxxx_4xxx_yxxx_xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		        var r = (d + Math.random()*16)%16 | 0;
		        d = Math.floor(d/16);
		        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
		    });
		    return uuid;
		},

		/**
		 * <option> 태그 동적생성
		 * @param objSelect
		 * @param data
		 */
		createOptionTag: function(objSelect, data, strLabelField, strValueField){
			if(data == null || data.length == 0){
				objSelect.empty();
				return;
			}

			if(strLabelField === undefined) strLabelField = "label";
			if(strValueField === undefined) strValueField = "value";

			var options = '';
			for(var i = 0; i < data.length; i++){
				options += "<option value='" + data[i][strValueField]+ "'>" + data[i][strLabelField] + "</option>";
			}

			objSelect.html(options);
		},

		// 파일 첨부 목록 DOM 구성.
		attachFileList : function(returnData, flag, elementName) {
			var eleName = elementName == undefined ? "attachFileList" : elementName;
			var divEle = document.getElementById(eleName);

			if (divEle == null || divEle == undefined)
				return;

			var ulEle = document.createElement("ul");

			var i = 0;
			var cycleN = returnData.length;

			for (; i < cycleN; i++) {
				var liEle = document.createElement("li");
				var newDivEle = document.createElement("div");

				var aEle = document.createElement("a");
				aEle.setAttribute("href", ctxPath + "/file/download.do?fileNo=" + returnData[i].fileNo);
				aEle.innerHTML = returnData[i].originalFileName;

				newDivEle.appendChild(aEle);
				if (flag) {
					var aEle2 = document.createElement("a");
					aEle2.setAttribute("id", "fileNo" + returnData[i].fileNo);
					// aEle2.setAttribute("href", ctxPath + "/file/delete.do?fileNo=" + returnData[i].fileNo);
					aEle2.setAttribute("href", "#");
					aEle2.innerHTML = "&nbsp;<img src='../../img/popup/cancel_icon.png' >";

					newDivEle.appendChild(aEle2);

				}

				liEle.appendChild(newDivEle);
				divEle.appendChild(ulEle.appendChild(liEle));

				// X 버튼에 이벤트 등록..
				var _fileNo = returnData[i].fileNo;

				var clickEventElement = document.getElementById("fileNo" + _fileNo);

				// 파일 다운로드만 할경우는 id가 없어서 넘어간다...
				if (clickEventElement === null || clickEventElement === undefined)
					continue;

				clickEventElement.onclick = function() {
					var removeFileId = this.getAttribute('id').replace(/[^0-9]/g, "");
					$.ajax({
						type : "post",
						url : $('#ctxPath').val() + '/file/delete.do',
						data : {
							fileNo : this.getAttribute('id').replace(/[^0-9]/g, "")
						},
						dataType : "json",
						success : function(jsonData) {
							// var searchElement = document.getElementById("fileNo" + removeFileId);
							// searchElement.parentNode.removeChild(searchElement);
							document.getElementById("fileNo" + removeFileId).parentNode.parentNode.removeChild(document.getElementById("fileNo" + removeFileId).parentNode)
						}
					});
				}

			}
		},

		/**
		 * 글자를 원하는 카운트로 잘라서 리턴한다.
		 * @param value
		 * @param charCnt
		 * @returns
		 */
		substr: function(value, charCnt) {
			if(value === null || value.isBlank()) return "";
			if(value.length > charCnt) {
				return value.substring(0, charCnt) + '...';
			}
			else {
				return value;
			}
		}

};

/** ajax call */
var Server = (function() {
	return {
		post: function(url, params) {
			Server.ajax(url, 'post', params);
		},
		get: function(url, params) {
			Server.ajax(url, 'get', params);
		},
		ajax: function(url, method, params) {
			var ajaxOpts = {
					type: method.toUpperCase(),
					url: url,
					dataType: 'json',
					success: function(data, status) {
//						if($('body').hasClass('wait')) $('body').removeClass('wait');
						if(data.hasError) {
							if(params.error !== undefined) {
								params.error(data);
							}
							else {
                                alert(data.errorInfo.message);
							}
							return;
						}
						if(params.success !== undefined) {
							params.success(data.resultData, this.data);
						}
					},
					error: function(xhr) {
//						console.log(xhr);
//						if($('body').hasClass('wait')) $('body').removeClass('wait');
						//alert('처리 중 에러가 발생하였습니다.');
						if(params.error !== undefined) {
							params.error(xhr);
						}else{
							alert('처리 중 에러가 발생하였습니다.');
						}
					}
			};
			if(method === 'post') {
				try {
					if(params.data) ajaxOpts.data = JSON.stringify(params.data);
					var o = params.data;
					if(o && typeof o === 'object' && o !== null) {
						ajaxOpts.contentType = 'application/json; charset=utf-8';
					}
				} catch(e) {}
			}
			else {
				if(params.data) ajaxOpts.data = params.data;
			}
			$.ajax($.extend(ajaxOpts, params.options));
		}
	};
})();

$.fn.serializeObject = function() {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name]) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};
