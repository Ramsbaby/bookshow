var $bestSellerGrid;

var Main = {
    /** variable */
    initVariable: function() {
        $bestSellerGrid = $('#bestSellerGrid');
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
        MyGrid.create($bestSellerGrid, {
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
                    { text : '순위', datafield : 'RANK', width : 100 },
                    { text : '검색횟수', datafield : 'CNT', width : 150 },
                    { text : '검색어', datafield : 'SEARCH_WORD', width : 250 }
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
        $.ajax({
            url: "/searchHistory/getKeywordTopList",
            data: $('#mainForm').serialize(),
            beforeSend: function () {},
            success: function (res) {
                MyGrid.setLocalData($bestSellerGrid, res.resultData.resultData);
            }
        });

    }
};


$(function() {
    Main.initVariable();
    Main.observe();
    Main.initDesign();
    Main.initData();
});