var $bookAllGrid, $dev_grpTree;
var editTerminalIds = [];
var timer;

var Main = {
    /** variable */
    initVariable: function() {
        $bookAllGrid = $('#bookAllGrid');
        $dev_grpTree = $('#dGrpTreeGrid');
    },

    /** add event */
    observe: function() {
        $('button').bind('click', function(event) { Main.eventControl(event); });
    },

    /** event handler */
    eventControl: function(event) {
        var curTarget = event.currentTarget;
        switch(curTarget.id) {
            // terminal
            case "btnSearch": this.search(); break;
            case 'pbtnExcelUpload': this.uploadExcel(); break;
        }
    },

    /** init design */
    initDesign: function() {
        $('#mainSplitter').jqxSplitter({ width: '99.8%', height: '99.8%', orientation: 'vertical', theme: jqxTheme, panels: [{ size: '70%', collapsible: true }, { size: '30%' }] });

        MyGrid.create($bookAllGrid, {
            source: new $.jqx.dataAdapter(
                {
                    datatype: 'json',
                    updaterow: function(rowid, rowdata, commit) {
                        if(editTerminalIds.indexOf(rowid) == -1)
                            editTerminalIds.push(rowid);
                        commit(true);
                    },
                    datafields: [
                        { name: 'imei', type: 'string' },
                        { name: 'mac', type: 'string' },
                        { name: 'cellTel', type: 'string' },
                        { name: 'regDt', type: 'string' },
                        { name: 'regUserId', type: 'string' },
                        { name: 'regPosCode', type: 'string' },
                        { name: 'contractUpdDt', type: 'string' },
                        { name: 'userDeptNm', type: 'string' }
                    ]
                },
                {
                    formatData: function(data) {
                        // var treeItem = HmTreeGrid.getSelectedItem($dev_grpTree);
                        // var _deptNo;
                        // console.log(treeItem);
                        // if(treeItem !== null) {
                        //     _deptNo = treeItem.grpNo;
                        // }
                        // $.extend(data, {
                        //     deptNo: _deptNo
                        // });
                        return data;
                    }
                },
                {
                    beforeLoadComplete: function(records) {
                        if(records != null) {
                        }
                        return records;
                    }
                }
            ),
            filterable: false,
            showfilterrow: false,
            editable: false,
            editmode : 'selectedcell',
            columns:
                [
                    { text : '관리자정의 소속', datafield : 'userDeptNm', width : 150 , columntype: 'custom'},
                    { text : 'IMEI', datafield : 'imei', width : 450 , editable:false},
                    { text : 'MAC', datafield : 'mac', width : 250 , editable:true, hidden:true},
                    { text : '단말기 전화번호', datafield : 'cellTel', width : 200 , editable:true},
                    { text : '등록 ID', datafield : 'regUserId', width : 150 , editable:false},
                    { text : '등록 직책', datafield : 'regPosCode', width : 150 , editable:false},
                    { text : '등록일시', datafield : 'regDt', width : 150 , editable:false}
                ]
        });

    },

    /** init data */
    initData: function() {
    },

    /*=======================================================================================
    버튼 이벤트 처리
    ========================================================================================*/

    search: function() {
        // MyGrid.updateBoundData($bookAllGrid, ctxPath + '/mmesweb/oms/realtimeStatus/getRealtimeStatusList.do');



        // Master.refreshCbPeriod($cbPeriod);
    }


};


$(function() {
    Main.initVariable();
    Main.observe();
    Main.initDesign();
    Main.initData();
});