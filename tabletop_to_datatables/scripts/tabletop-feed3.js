var jqueryNoConflict = jQuery;

// begin main function
jqueryNoConflict(document).ready(function(){

    initializeTabletopObject("1AMnlYF4MqkRxDZn3Y3M8v8E35MEqFTA8Q_U5heM6pzI");
//    initializeTabletopObject("1Yo9-ya7ii2HqGb9zUG49xzwmUbUTlAGsgUXbjmHeb8k");
//        initializeTabletopObject('https://docs.google.com/spreadsheets/d/1Yo9-ya7ii2HqGb9zUG49xzwmUbUTlAGsgUXbjmHeb8k/pubhtml?gid=498364296&single=true");
//ref:https://datatables.net/forums/discussion/17032/how-do-i-add-the-drill-down-rows-with-the-tabletop-script-in-datatables 
//Google Sheets要採用網路發佈方式https://docs.google.com/spreadsheets/d/1AMnlYF4MqkRxDZn3Y3M8v8E35MEqFTA8Q_U5heM6pzI/pubhtml?gid=1764745262&single=true
});

// pull data from google spreadsheet
function initializeTabletopObject(dataSpreadsheet){
    Tabletop.init({
        key: dataSpreadsheet,
        callback: writeTableWith,
        simpleSheet: true,
        debug: false
    });
}

// create table headers
function createTableColumns(){

    /* swap out the properties of mDataProp & sTitle to reflect
    the names of columns or keys you want to display.
    Remember, tabletop.js strips out spaces from column titles, which
    is what happens with the More Info column header */

    var tableColumns =   [
		{"mDataProp": "url", "sTitle": "教學網址", "sClass": "center", sWidth:'15%'},
		{"mDataProp": "適用系列", "sTitle": "適用系列", "sClass": "center", sWidth:'10%'},
		{"mDataProp": "素材來源", "sTitle": "來源出處", "sClass": "center", sWidth:'10%'},
		{"mDataProp": "內容說明", "sTitle": "內容說明", "sClass": "center", sWidth:'750%'}
	];
    return tableColumns;
}

// create the table container and object
function writeTableWith(dataSource){

    jqueryNoConflict("#demo").html("<table cellpadding='0' cellspacing='0' border='0' class='display table table-bordered table-striped' id='data-table-container'></table>");

    var oTable = jqueryNoConflict("#data-table-container").dataTable({
        "sPaginationType": "bootstrap",
        "iDisplayLength": 10,
        "aaData": dataSource,
        "aoColumns": createTableColumns(),
        'bJQueryUI': true,
        "fnRowCallback": function(nRow, aData, iDisplayIndex) {
            console.log(aData);
            //$("td:eq(0)", nRow).html("<a target=blank href='videoplayer.html?name=" + aData.url + "'><img src='tabletop_to_datatables/images/movie.png' width='32' height='32' /></a>");
            $("td:eq(0)", nRow).html(aData.url+"<img src='"+aData.圖片+"' width='177' height='115' /></a>");
            return nRow;
        },
        "oLanguage": {
            "sLengthMenu": "每頁 _MENU_筆"
        }
    });

};

//define two custom functions (asc and desc) for string sorting
jQuery.fn.dataTableExt.oSort["string-case-asc"]  = function(x,y) {
	return ((x < y) ? -1 : ((x > y) ?  0 : 0));
};

jQuery.fn.dataTableExt.oSort["string-case-desc"] = function(x,y) {
	return ((x < y) ?  1 : ((x > y) ? -1 : 0));
};