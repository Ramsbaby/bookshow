var $bookAllGrid, $dev_grpTree;
var editTerminalIds = [];
var timer;
var initrowdetails;

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
            case "btnPrev": this.searchPrev(); break;
            case "btnNext": this.searchNext(); break;
            case "btnSearch": this.search(); break;
        }
    },

    /** init design */
    initDesign: function() {
        $('#mainSplitter').jqxSplitter({ width: '99.8%', height: '99.8%', orientation: 'horizontal', theme: jqxTheme, panels: [{ size: '60%', collapsible: true }, { size: '40%' }] });

        $('#cbSearchField').jqxDropDownList({ width: 150, height: 21, theme: jqxTheme, autoDropDownHeight: true,
            displayMember: 'label', valueMember: 'value', selectedIndex: 0,
            source: Master.enumBookTargetField()});

        $('#search-keyword').jqxInput({width: 200, height:21});
        $('#search-keyword').on('keypress', function(event) { if(event.keyCode == 13) {Main.search(); return false;} return; });


        MyGrid.create($bookAllGrid, {
            source: new $.jqx.dataAdapter(
                {
                    datatype: 'json',
                    updaterow: function(rowid, rowdata, commit) {
                        if(editTerminalIds.indexOf(rowid) == -1)
                            editTerminalIds.push(rowid);
                        commit(true);
                    }
                }
            ),
            width:'100%',
            height:'95%',
            showfilterrow: false,
            pageable: false,
            columns:
                [
                    { text : '도서 제목', datafield : 'title', width : 150},
                    { text : '도서 소개', datafield : 'contents', width : 450},
                    { text : '도서 상세 URL', datafield : 'url', width : 250},
                    { text : '저자', datafield : 'authors', width : 250},
                    { text : 'ISBN', datafield : 'isbn', width : 200 },
                    { text : '출판 날짜', datafield : 'datetime', width : 150},
                    { text : '출판사', datafield : 'publisher', width : 150},
                    { text : '정가', datafield : 'price', width : 150},
                    { text : '판매가', datafield : 'sale_price', width : 150},
                    { text : '썸네일', datafield : 'thumbnail', width : 150, hidden:true}
                ]
        });
        $bookAllGrid.on('rowdoubleclick', function(event) {
            Main.initrowdetails(null,null,null, MyGrid.getRowData($bookAllGrid, event.args.rowindex));
        });

    },

    /** init data */
    initData: function() {
    },

    /*=======================================================================================
    버튼 이벤트 처리
    ========================================================================================*/

    search: function() {
        $('#pageNumber').val(1);
        if($('#search-keyword').val().isBlank()) {
            alert('키워드를 입력해주세요.');
            return;
        }

        $.ajax({
            url: "/ajax/searchBooks",
            data: $('#mainForm').serialize(),
            beforeSend: function () {},
            success: function (res) {
                MyGrid.setLocalData($bookAllGrid, res.resultData.documents);
                $('#pageLoc')[0].innerText = ($('#pageNumber').val() + ' / ' + res.resultData.meta.total_count);
                $('#pageTotalNumber').val(res.resultData.meta.total_count)
            }
        });
    },
    searchPrev: function() {
        var tempNumber = $('#pageNumber').val();
        tempNumber > 1 ? $('#pageNumber').val(--tempNumber) : $('#pageNumber').val(1);

        $.ajax({
            url: "/ajax/searchBooks",
            data: $('#mainForm').serialize(),
            beforeSend: function () {},
            success: function (res) {
                var data = res.resultData.documents;
                MyGrid.setLocalData($bookAllGrid, data);

                $('#pageLoc')[0].innerText = ($('#pageNumber').val() + ' / ' + res.resultData.meta.total_count);
            }
        });
    },
    searchNext : function() {
        var tempNumber = $('#pageNumber').val();
        tempNumber < $('#pageTotalNumber').val() ? $('#pageNumber').val(++tempNumber) : $('#pageNumber').val(tempNumber);
        $('#mainForm').serialize();
        $.ajax({
            url: "/ajax/searchBooks",
            data: $('#mainForm').serialize(),
            beforeSend: function () {},
            success: function (res) {
                MyGrid.setLocalData($bookAllGrid, res.resultData.documents);

                $('#pageLoc')[0].innerText = ($('#pageNumber').val() + ' / ' + res.resultData.meta.total_count);
            }
        });
    },

    initrowdetails : function (index, parentElement, gridElement, datarecord) {
        $('#bookDetailDiv')[0].innerHTML = "<div style='margin: 10px;'><ul style='margin-left: 30px;'><li class='title'></li></ul><div class='information'></div><div class='notes'></div></div>"
        var tabsdiv = null;
        var information = null;
        tabsdiv = $('#bookDetailDiv')[0];
        if (tabsdiv != null) {
            information = $('#bookDetailDiv').find('.information');
            var title = $('#bookDetailDiv').find('.title');
            title.text(datarecord.firstname);
            var container = $('<div style="margin: 5px;"></div>')
            container.appendTo($(information));
            var photocolumn = $('<div style="float: left; width: 30%;"></div>');
            var leftcolumn = $('<div style="float: left; width: 50%;"></div>');
            var rightcolumn = $('<div style="float: left; width: 20%;"></div>');
            container.append(photocolumn);
            container.append(leftcolumn);
            container.append(rightcolumn);
            var photo = $("<div class='jqx-rc-all' style='margin: 10px;'><b>썸네일:</b></div>");
            var image = $("<div style='margin-top: 10px;'></div>");
            var imgurl = datarecord.thumbnail;
            var img = $('<img height="150" src="' + imgurl + '"/>');
            image.append(img);
            image.appendTo(photo);
            photocolumn.append(photo);
            var firstname = "<div style='margin: 10px;'><b>도서 제목 :</b> " + datarecord.title + "</div>";
            var lastname = "<div style='margin: 10px;'><b>소개 :</b> " + MyUtil.substr(datarecord.contents,200) + "</div>";
            var title = "<div style='margin: 10px;'><b>저자 :</b> " + datarecord.authors + "</div>";
            var address = "<div style='margin: 10px;'><b>출판사 :</b> " + datarecord.publisher + "</div>";
            $(leftcolumn).append(firstname);
            $(leftcolumn).append(lastname);
            $(leftcolumn).append(title);
            $(leftcolumn).append(address);
            var postalcode = "<div style='margin: 10px;'><b>출판일 :</b> " + datarecord.datetime + "</div>";
            var city = "<div style='margin: 10px;'><b>정가 :</b> " + datarecord.price + " 원</div>";
            var phone = "<div style='margin: 10px;'><b>판매가 :</b> " + datarecord.sale_price + " 원</div>";
            $(rightcolumn).append(postalcode);
            $(rightcolumn).append(city);
            $(rightcolumn).append(phone);
            $(tabsdiv).jqxPanel({ width: 750, height: 230, theme: jqxTheme});
        }
    }
};


$(function() {
    Main.initVariable();
    Main.observe();
    Main.initDesign();
    Main.initData();
});