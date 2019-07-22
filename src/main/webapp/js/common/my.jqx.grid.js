var MyGrid = {
		/** get jqxGrid default options */
		getDefaultOptions : function($grid) {
			return {
				width : "99.8%",
				height : "99.8%",
				autoheight : false,		/* loading slow */
				autorowheight: false,		/* loading slow */
				theme : jqxTheme,
				pageable : true,
				pagermode: 'simple',
				columnsresize : true,
				showstatusbar : false,
				selectionmode : "singlerow",
				enabletooltips : true,
				columnsheight: 26,
				rowsheight: 22,
				filterrowheight: 30,
				toolbarheight : 30,
				sortable : true,
				altrows: false,
//				filterable: true,  				/* loading slow */
				enablebrowserselection : true,
				showpinnedcolumnbackground: false,
				showsortcolumnbackground : false,
				pagesize : 1000,
				pagesizeoptions : [ "1000", "5000", "10000" ],
				localization : getLocalization('kr')
//				pagerrenderer : this.pagerrenderer
//				ready: function() {
//					$grid.jqxGrid({ filterable: true });
//				}
			};
		},

		/** create jqxGrid */
		create : function($grid, options, ctxmenuType, ctxmenuIdx) {
			var defOpts = this.getDefaultOptions($grid);
			// 그리드 헤더텍스트 정렬을 center로.. 처리
			try {
				$.each(options.columns, function(idx, value) {
					value.align = 'center';
				});
			} catch(e) {}
			$.extend(defOpts, options);
			$grid.jqxGrid(defOpts);
		},

		/** data refresh */
		updateBoundData : function($grid, reqUrl) {
			$grid.jqxGrid("clearselection");
			var adapter = $grid.jqxGrid("source");
			if(adapter !== undefined) {
				if(adapter._source.url == null || adapter._source.url == "")
					adapter._source.url = reqUrl;

				if($grid.jqxGrid('filterable')) {
					$grid.jqxGrid("updatebounddata", "filter");
				}
                else if($grid.jqxGrid('groupable')) {
                    $grid.jqxGrid("updatebounddata", "data");
                }
				else {
					$grid.jqxGrid("updatebounddata");
				}

				// 상태바 표시상태일때 높이조절
				if($grid.jqxGrid("showstatusbar") == true) {
					var gridId = $grid.attr("id");
					setTimeout('MyGrid.setStatusbarHeight("' + gridId + '")', 500);
				}
			}
		},

		setLocalData: function($grid, data) {
			$grid.jqxGrid('source')._source.localdata = data;
			$grid.jqxGrid('updateBoundData');
		},

		/** 그리드 statusbar에 합계표현할때 height값이 맞지않아 틀어지는 현상 보완 */
		setStatusbarHeight: function(gridId) {
			$("#statusbar" + gridId).children().css("height", ($("#statusbar" + gridId).height() - 2));
		},


		/** 선택된 rowindex를 리턴 */
		getRowIdx: function($grid, msg) {
			var rowIdx = $grid.jqxGrid('getselectedrowindex');
			if(rowIdx === undefined || rowIdx === null || rowIdx == -1) {
				if(msg !== undefined) alert(msg);
				return false;
			}
			return rowIdx;
		},

		/** 선택된 rowindexes를 리턴 */
		getRowIdxes: function($grid, msg) {
			if($grid.jqxGrid('getboundrows').length == 0) {
				if(msg !== undefined) alert(msg);
				return false;
			}
			var rowIdxes = $grid.jqxGrid('getselectedrowindexes');
			if(rowIdxes === undefined || rowIdxes === null || rowIdxes.length == 0) {
				if(msg !== undefined) alert(msg);
				return false;
			}
			return rowIdxes;
		},

		/** 선택된 row의 data를 리턴 */
		getRowData: function($grid, rowIdx) {
			if(rowIdx === undefined) {
				rowIdx = $grid.jqxGrid('getselectedrowindex');
				if(rowIdx == -1) return null;
			}

			return $grid.jqxGrid('getrowdata', rowIdx);
		},

		/** 선택된 rows의 data를 리턴 */
		getRowDataList: function($grid, rowIdxes) {
			if(rowIdxes === undefined) {
				rowIdxes = $grid.jqxGrid('getselectedrowindexes');
				if(rowIdxes == null || rowIdxes.length == 0) return null;
			}

			var list = [];
			$.each(rowIdxes, function(idx, rowIdx) {
				list.push($grid.jqxGrid('getrowdata', rowIdx));
			});
			return list;
		},

		/** 선택된 row의 editing을 종료 */
		endRowEdit: function($grid) {
			var rowIdx = MyGrid.getRowIdx($grid);
			if(rowIdx !== false) {
				$grid.jqxGrid('endrowedit', rowIdx, false);
			}
		},

		/** 선택된 cell의 editing을 종료 (selectionmode = singlecell일때) */
		endCellEdit: function($grid) {
			var rowIdx = MyGrid.getRowIdx($grid);
			if (rowIdx === false) return;
			// var cell = $grid.jqxGrid('getselectedcell');
			// if (cell === false) return;

            var chlidrens = $grid.children();
            if(chlidrens && chlidrens.length) {
                var elValidation = chlidrens.find('div.jqx-grid-validation');
                if (elValidation.length && $(elValidation[0]).css('display') == 'block') {
                    return false;
                }
            }
			$grid.jqxGrid('endrowedit', rowIdx, false);
		},

		/** ImageRenderer **/
		img16renderer: function(row, datafield, value){
			return '<img width="16" height="16" style="display: block; margin: auto; margin-top: 5px;" src="' + value + '"/>';
		},

		img128renderer: function(row, datafield, value){
			return '<img height="128" width="128" style="display: block; margin: auto; margin-top: 5px;" src="' + value + '"/>';
		},

		img200renderer: function(row, datafield, value){
			return '<img height="200" width="200" style="display: block; margin: auto; margin-top: 5px;" src="' + value + '"/>';
		},

		/** unit1000 */
		unit1000renderer: function (row, column, value) {
			var cell = '<div style="text-align: right; overflow: hidden; padding-bottom: 2px; margin-top: 4px; margin-right: 5px; margin-left: 4px; -ms-text-overflow: ellipsis;">';
			cell += HmUtil.convertUnit1000(value);
		    cell += '</div>';
			return cell;
		},

		/** unit1024 */
		unit1024renderer: function (row, column, value) {
			var cell = '<div style="text-align: right; overflow: hidden; padding-bottom: 2px; margin-top: 4px; margin-right: 5px; margin-left: 4px; -ms-text-overflow: ellipsis;">';
			cell += HmUtil.convertUnit1024(value);
		    cell += '</div>';
			return cell;
		},

		/** 이벤트 지속시간 (second) */
		cTimerenderer: function (row, datafield, value) {
			var result = HmUtil.convertCTime(value);
		    return "<div style='margin-top: 4px; margin-right: 5px' class='jqx-right-align'>" + result + "</div>";
		},

		/** 시간 (milisecond) */
		milisecrenderer: function (row, datafield, value) {
			var result = HmUtil.convertMilisecond(value);
			return "<div style='margin-top: 4px; margin-right: 5px' class='jqx-right-align'>" + result + "</div>";
		},

		/** 컬럼값에 ms 단위 추가 */
        milisecTextrenderer: function (row, datafield, value) {
			return "<div style='margin-top: 4px; margin-right: 5px' class='jqx-right-align'>" + value +"ms</div>";
		},

		/** 비밀번호 */
		pwdrenderer: function (row, datafield, value) {
			return "<div style='margin-top: 4px; margin-left: 5px' class='jqx-left-align'>**********</div>";
		},

		/** 컬럼값에  온도(℃) 추가 */
		temperaturerenderer: function (row, datafield, value) {
            return "<div style='margin-top: 4px; margin-right: 5px' class='jqx-right-align'>" + value +"℃</div>";
		},

		/** 값 + comumntype을 사용  */
        customColumnTypererenderer: function (row, columnfield, value, defaulthtml, columnproperties) {
        	console.log(columnproperties.columntype);
			return "<div style='margin-top: 4px; margin-right: 5px' class='jqx-right-align'>" + value + columnproperties.columntype + "</div>";
		},

		/** ROW NO */
		rownumrenderer: function (row, datafield, value) {
			return "<div style='margin-top: 4px; margin-right: 5px' class='jqx-right-align'>" + (row + 1) +"</div>";
		},

		/** progressbar */
		progressbarrenderer:function (row, column, value) {
			var cellWidth = 100;
			try {
				cellWidth = parseInt($(this)[0].width);
			} catch(e) {}
			
			var cell = '<div style="margin-top:4px; text-align: center;">';
			cell += '<div style="background: #37B8EF; position: relative; width: ' + (cellWidth/100*value) + 'px; height: 16px;"></div>';
			cell += '<div style="margin-left: 5px; position: relative; top: -15px;">' + value.toString() + '%' + '</div>';
			cell += '</div>';
			return cell;
		},

		/** title */
		titlerenderer: function(toolbar, title, elemId) {
			var container = $('<div style="margin: 5px;"></div>');
			var span;
			if(elemId !== null && elemId !== undefined) {
				span = $('<span style="float: left; font-weight: bold; margin-top: 5px; margin-right: 4px;" id="' + elemId + '">' + title + '</span>');
			}
			else {
				span = $('<span style="float: left; font-weight: bold; margin-top: 5px; margin-right: 4px;">' + title + '</span>');
			}
			toolbar.empty();
	    	toolbar.append(container);
	    	container.append(span);
		},


		/**============================================
		 * header renderer
		 ============================================*/
		ckheaderRenderer: function(header) {
			return '<div style="margin: 4.5px 4px 4.5px 4px; text-align: center; overflow: hidden; padding-bottom: 2px; -ms-text-overflow: ellipsis;">' +
						'<div class="ckheader" style="float: left; margin: 0 auto;"></div>' +
				 		'<span style="cursor: default; -ms-text-overflow: ellipsis;">' + header + '</span>' +
			 		'</div>';
		},

		ckheaderRendered: function(element, grid, datafield) {
			var ckobj = $(element).children('.ckheader');
			ckobj.jqxCheckBox({ theme: jqxTheme, width: 16, height: 16, hasThreeStates: false })
				.on('change', function(event) {
					var _newval = event.args.checked? 1 : 0;
					var _list = grid.jqxGrid('getdisplayrows');
					if(_list == null || _list.length == 0) return;
					grid.jqxGrid('beginupdate');
					// 데이터 변경 후 sort이벤트가 발생하여 강제해제
					grid.jqxGrid('setcolumnproperty', datafield, 'sortable', false);
					$.each(_list, function(idx, value) {
						grid.jqxGrid('setcellvalue', value.visibleindex, datafield, _newval);
					});
					grid.jqxGrid('endupdate');
					// 데이터 변경 후 sort이벤트가 발생하여 강제해제 해지..
					setTimeout(function() { grid.jqxGrid('setcolumnproperty', datafield, 'sortable', true); }, 500);
				});
			return true;
		},

		/**============================================
		 * validation
		 ============================================*/
        requireIpValidation: function(cell, value) {
            if($.isBlank(value)) {
                return { result: false, message: 'IP를 입력해주세요.' };
            }
            if(!$.validateIp(value)) {
                return { result: false, message: 'IP형식이 유효하지 않습니다.' };
            }
            return true;
        },

		portValidation: function(cell, value) {
            if(value.toString().length > 5) {
                return { result: false, message: '0~99999사이의 값을 입력해주세요.' };
            }
            return true;
		}

};