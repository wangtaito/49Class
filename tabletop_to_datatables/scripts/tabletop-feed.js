var jqueryNoConflict = jQuery;

// begin main function
jqueryNoConflict(document).ready(function(){

    initializeTabletopObject("1psiMLmgW6eCf83sF7eMHhYKVOZIaB93PVHoXa5i_3R8");
//    initializeTabletopObject("1Yo9-ya7ii2HqGb9zUG49xzwmUbUTlAGsgUXbjmHeb8k");
//        initializeTabletopObject('https://docs.google.com/spreadsheets/d/1psiMLmgW6eCf83sF7eMHhYKVOZIaB93PVHoXa5i_3R8/pubhtml?gid=2085366146&single=true");
// Google Sheets要採用網路發佈方式 https://docs.google.com/spreadsheets/d/1psiMLmgW6eCf83sF7eMHhYKVOZIaB93PVHoXa5i_3R8/pubhtml?gid=2085366146&single=true


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
		{"mDataProp": "url", "sTitle": "教學網址", "sClass": "center", sWidth:'10%'},
		{"mDataProp": "主講人及來源", "sTitle": "主講人及來源", "sClass": "left", sWidth:'30%'},
		{"mDataProp": "適用系列", "sTitle": "適用系列", "sClass": "center", sWidth:'10%'},
		{"mDataProp": "說明", "sTitle": "說明", "sClass": "left", sWidth:'50%'}
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
        "fnRowCallback": function(nRow, aData, iDisplayIndex) {
            console.log(aData);
            //$("td:eq(0)", nRow).html("<a target=blank href='videoplayer.html?name=" + aData.url + "'><img src='tabletop_to_datatables/images/movie.png' width='32' height='32' /></a>");
            $("td:eq(0)", nRow).html(aData.url+"<img src='tabletop_to_datatables/images/movie.png' width='32' height='32' /></a>");
            return nRow;
        },
        "oLanguage": {
            "sLengthMenu": "每頁_MENU_ 筆"
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