var $myHistoryGrid;

var Main = {
    /** variable */
    initVariable: function() {
        $myHistoryGrid = $('#myHistoryGrid');
    },

    /** add event */
    observe: function() {
        $('button').bind('click', function(event) { Main.eventControl(event); });
    },

    /** event handler */
    eventControl: function(event) {
        var curTarget = event.currentTarget;
        switch(curTarget.id) {
            case "btnSearch": this.search(); break;
        }
    },

    /** init design */
    initDesign: function() {
        MyGrid.create($myHistoryGrid, {
            source: new $.jqx.dataAdapter(
                {
                    datatype: 'json',
                },
                {
                    formatData: function(data) {
                        return data;
                    }
                }
            ),
            width:'100%',
            height:'99%',
            filterable: false,
            showfilterrow: false,
            editable: false,
            columns:
                [
                    { text : 'ID', datafield : 'id', width : 150 , columntype: 'custom'},
                    { text : '검색 일시', datafield : 'regDate', width : 450 , editable:false},
                    { text : '검색어', datafield : 'searchWord', width : 250 , editable:true, hidden:true},
                    { text : '검색필드', datafield : 'target', width : 200 , editable:true}
                ]
        });

    },

    /** init data */
    initData: function() {
        this.search();
    },

    /*=======================================================================================
    버튼 이벤트 처리
    ========================================================================================*/

    search: function() {
        MyGrid.updateBoundData($myHistoryGrid, '/searchHistory/getSearchHistoryList.do');
    }
};


$(function() {
    Main.initVariable();
    Main.observe();
    Main.initDesign();
    Main.initData();
});