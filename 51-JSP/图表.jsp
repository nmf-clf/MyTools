<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="tags" tagdir="/WEB-INF/tags" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<c:set var="ctx" value="${pageContext.request.contextPath}"></c:set>
<script type="text/javascript" src="${ctx}/static/js/erp/main_common/centerDeptLinkage.js"></script>
<link href="${ctx}/static/css/jquery.circliful.css" rel="stylesheet">
<link href="${ctx}/static/css/material-design-iconic-font.css" rel="stylesheet">
<link href="${ctx}/static/css/material-design-iconic-font.min.css" rel="stylesheet">
<link rel="stylesheet" href="${ctx}/static/css/fselect.css" />
<script type="text/javascript" src="${ctx}/static/js/erp/echarts.min.js"></script>
<style>
    body {
        background:#fff !important;
        margin: 0;
        padding:0;
    }
    .survey-contain {
        width:100%;
        margin-top: 10px;
    }

    .survey-element {
        border: .8px #ececec solid;
        border-bottom: 0;
    }

    .survey-element p {
        word-break: break-all;
    }

    .survey-title {
        width: 100%;
        height: 40px;
        display: inline-block;
        background: #ececec;
    }

    .survey-span {
        font-size: larger;
        font-weight: bold;
        display: block;
        line-height: 40px;
        text-align: left;
        text-indent: 10px;
        background: #fff;
    }

    .survey-left {
        text-align: center;
        width: 27%;
        height: 350px;
        float: left;
    }

    .survey-right {
        border-left: 0px;
        width: 43%;
        height: 350px;
        float: left;
    }
    
    .survey-right2 {
        border-left: 0px;
        width: 43%;
        height: 350px;
        float: left;
    }  
    
    
    .survey-right-record {
        border-left: 0px;
        width: 30%;
        height: 350px;
        float: left;
    }
    .chart-contain{
        height: 100%;
        align-content: center;
    }

    .form-inline  select.input_small,
    .form-inline input.input_small,
    .form-inline .input_small span,
    .form-inline .input_small select{
        width: 70px !important;
    }
    .form-inline label,
    .form-inline.form-member span {
        width: 65px !important;
        margin: 0 10px !important;
        padding: 0 !important;
    }

    .form-inline input.input_middle{
        width: 95px !important;
    }

    .form-inline input.input_small2{
        width: 50px !important;
    }
    
    .form-inline span {
        width: 100px !important;
    }

    .form-inline input,
    .form-inline select {
        font-size: 12px;
    }

    .form-group.width150 span {
        width: 220px !important;
    }

    .clip{
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;

    }

    .element-warp-body{
        width: 100%;
        background: #fff;
        
    }
    .element-warp{
        height: 100px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        
    }
    .element-warp-item{
        width: 10%;
        height: 70px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        background: #f8f4f4;
        cursor: pointer;
        border-radius: 5px;

    }
    
    .element-warp-item span:nth-child(2){
        font-size: 18px;
        font-weight: 800;
        line-height:30px;
        color: #009688;
    }

    .element-warp-item:hover{
      background: #cfcfcf;

    }
    .button_tab-title{
        border-bottom: 1px solid #ececec;
        line-height: 24px;
        font-weight: 800;
    }

    /* 表格样式 */
    .table-bordered>thead>tr>th{
        background: #fff;
    }

    .table-striped>tbody>tr>td{
        background: #fff !important;
    }
    .table-bordered{
        border: 1px solid #ececec;
    }
   
</style>

<c:if test="${userType ne 1}">
    <div id="buttonTab">
        &nbsp;&nbsp;
        <button id="data_summary" style="background:#3881FE;" class="btn btn-defualt survey-btn" >全公司</button>
        <button id="data_weekly_record" class="btn btn-defualt survey-btn">我的组织</button>
    </div>
</c:if>
<div class="mar15">
    <%-- 图表--%>
    <div id="button_tab" class="element-warp-body" style="border-radius:5px; display:inline-block;">
        <div class="button_tab-title" style="height: 24px;">
            <div class="form-group" style="width:50%;position:absolute;">
                <label class="pad-left-30" title="上报日期" style="float:left;width:90px;">上报日期</label>
                <input class="form-control input_middle bj-white form_date_start " id="search_searchDay" name="search_searchDay" value=""
                       readonly="" type="text" setViewDate="" style="width:110px; margin-top: 4px;height:20px;font-size:12px">
            </div>
            <div style="position: relative;margin-left: 210px;">
                <span id="currentDate" ></span>
            </div>
        </div>
        <div class="element-warp">
        <div class="element-warp-item">
            <span style="text-align: center;">远程签到人数</span>
            <span style="text-align: center;" id="signTotals">0</span>
        </div>
        <div class="element-warp-item">
            <span  style="text-align: center;">工作记录人数</span>
            <span  style="text-align: center;" id="emoNoTotals">0</span>
        </div>
        <div class="element-warp-item">
            <span  style="text-align: center;">工作记录条数</span>
            <span  style="text-align: center;" id="workRecordTotals">0</span>
        </div>
        <div class="element-warp-item">
            <span  style="text-align: center;">信息汇总人数</span>
            <span  style="text-align: center;" id="wenduTotals">0</span>
        </div>
        <div class="element-warp-item">
            <span  style="text-align: center;">总工作时长</span>
            <span  style="text-align: center;" id="workhoursTotals">0</span>
        </div>

        <div class="element-warp-item">
            <span  style="text-align: center;">远程例会数</span>
            <span  style="text-align: center;" id="meetingTotals">0</span>
        </div>
        <div class="element-warp-item">
            <span  style="text-align: center;">参会人次</span>
            <span  style="text-align: center;" id="meetingEmonoTotals">0</span>
        </div>
        <div class="element-warp-item">
            <span  style="text-align: center;">上班打卡人数</span>
            <span  style="text-align: center;" id="checkPersonTotals">0</span>
        </div>
        <div class="element-warp-item">
            <span  style="text-align: center;">下班打卡人数</span>
            <span  style="text-align: center;" id="checkOutPersonTotals">0</span>
        </div>
    </div>
   </div>

    <div id="button_tab" class="survey-contain height-tab-class" style="border-radius:5px; display:inline-block; ">
        <div class='survey-element survey-title' ><span class='survey-span'>各事业部/中心办公状态统计</span></div>
        <div class='survey-element survey-left' style="width: 50%">
            <table class='table mar-bottom-0 text-center table-striped table-bordered' >
                <thead><tr><th><b>事业部/中心</b></th>
                    <th><b>总人数</b></th>
                    <th><b>未提交</b></th>
                    <th><b>休息</b></th>
                    <th><b>项目现场</b></th>
                    <th><b>远程办公</b></th>
                    <th><b>已签到人数</b></th>
                    <th><b>未签到人数</b></th>
                    </tr>
                </thead>
                <tbody id="centerTab" ></tbody></table></div>
        <div class='survey-element survey-right2 height-dui-class' style="width: 50%;" >
            <div id="centerTu" class='chart-contain'></div>
        </div>
    </div>


    <div id="button_tab" class="survey-contain " style="border-radius:5px; display:inline-block;"><%--box-shadow:rgba(0, 0, 0, 0.15) 12px 10px 15px 0px--%>
        <div class='survey-element survey-left' style="width: 33.3%;" >
            <div id="remoteTu" class='chart-contain'></div>
        </div>
        <div class='survey-element survey-right' style="width: 33.3%;" >
            <div id="realTu" class='chart-contain'></div>
        </div>
        <div class='survey-element survey-right' style="width: 33.3%;" >
            <div id="restTu" class='chart-contain'></div>
        </div>
    </div>
    <div id="button_tab" class="survey-contain " style="border-radius:5px; display:inline-block;"><%--box-shadow:rgba(0, 0, 0, 0.15) 12px 10px 15px 0px--%>
        <div class='survey-element survey-left' style="width: 33.3%;" >
            <div id="signTotalsTu" class='chart-contain'></div>
        </div>
        <div class='survey-element survey-right' style="width: 33.3%;" >
            <div id="emoNoTotalsTu" class='chart-contain'></div>
        </div>
        <div class='survey-element survey-right' style="width: 33.3%;" >
            <div id="workRecordTotalsTu" class='chart-contain'></div>
        </div>
    </div>
    <div id="button_tab" class="survey-contain " style="border-radius:5px; display:inline-block;"><%--box-shadow:rgba(0, 0, 0, 0.15) 12px 10px 15px 0px--%>
        <div class='survey-element survey-left' style="width: 33.3%;" >
            <div id="meetingTotalsTu" class='chart-contain'></div>
        </div>
        <div class='survey-element survey-right' style="width: 33.3%;" >
            <div id="meetingEmonoTotalsTu" class='chart-contain'></div>
        </div>
        <div class='survey-element survey-right' style="width: 33.3%;" >
            <div id="checkPersonTotalsTu" class='chart-contain'></div>
        </div>
    </div>
    <div id="button_tab" class="survey-contain " style="border-radius:5px; display:inline-block;"><%--box-shadow:rgba(0, 0, 0, 0.15) 12px 10px 15px 0px--%>
        <div class='survey-element survey-left' style="width: 20%;" >
            <table class='table mar-bottom-0 text-center table-striped table-bordered' >
                <thead><tr><th><b>工作地点</b></th>
                    <th><b>人数</b></th>
                </tr>
                </thead>
                <tbody id="Q14Tab"></tbody></table>
        </div>
        <div class='survey-element survey-right' style="width: 40%;" >
            <div id="Q2Tu" class='chart-contain'></div>
        </div>
        <div class='survey-element survey-right' style="width: 40%;" >
            <div id="approveTu" class='chart-contain'></div>
        </div>
    </div>
</div>


<input type="text" style="display:none;" id="pageIndex" value="1"/>
<input type="hidden" name="table_title" id="table_title" value=""/>
<script src="${ctx}/static/js/fselect.js" type="text/javascript" charset="utf-8"></script>
<script type="text/javascript">
    var loginUserType=1;
    var stopIntervalType1;
    var stopIntervalType2;
    var searchType=1;
    $(function () {
        DatePicker(".form_date_start", ".form_date_end");
        if($("input[name='search_searchDay']").val()==''){
            $("input[name='search_searchDay']").val(formatDate(new Date()));
        }
        $("#currentDate").html(format(new Date()));

        if('2'=='${userType}'){
            loginUserType=2;
            $("#data_summary").click(function () {
                $(this).css("background", "#3881FE");
                $("#data_weekly_record").removeAttr("style");
                searchType=1;
                clearInterval(stopIntervalType1);
                clearInterval(stopIntervalType2);
                initSummaryData(1);
            });
            $("#data_weekly_record").click(function () {
                $(this).css("background", "#3881FE");
                $("#data_summary").removeAttr("style");
                clearInterval(stopIntervalType1);
                clearInterval(stopIntervalType2);
                searchType=2;
                initSummaryData(2);
            });
        }
	
	
		initSummaryData();
		stopIntervalType1 =  setInterval(function(){
			initSummaryData();
			$("#currentDate").html(format(new Date()));
		}, 1000 * 5);
		
		
        $("#search_searchDay").change(function(){
			clearInterval(stopIntervalType1);
			if($("#search_searchDay").val()==''||$("#search_searchDay").val()==formatDate(new Date())){
				stopIntervalType1 =  setInterval(function(){
					initSummaryData();
					$("#currentDate").html(format(new Date()));
				}, 1000 * 5);
			}else{
				
				initSummaryData();
			}
        });
		
    });

    function initSummaryData(searchTypeVal) {
        myAjax("${ctx}/admin/wendu/queryTotalChartData", {"search_userType":searchTypeVal,"search_searchDay":$("#search_searchDay").val()}, false,
            function (data) {
                if (data.success) {
                    var list = data.data;
                    $("#signTotals").html(list['top'].signTotals+"人");
                    $("#workRecordTotals").html(list['top'].workRecordTotals+"条");
                    $("#workhoursTotals").html(list['top'].workhoursTotals+"小时");
                    $("#emoNoTotals").html(list['top'].emoNoTotals+"人");
                    $("#meetingTotals").html(list['top'].meetingTotals+"场");
                    $("#meetingEmonoTotals").html(list['top'].meetingEmonoTotals+"人次");
                    $("#checkPersonTotals").html(list['top'].checkPersonTotals+"人");
                    $("#wenduTotals").html(list['top'].wenduTotals+"人");
                    $("#checkOutPersonTotals").html(list['top'].checkOutPersonTotals+"人");

                    var centerHtml ="";
                    var singleYdata = [];
                    var remotedata = [];
                    var realdata = [];
                    var noSubmitdata = [];
                    var restdata = [];

                    var personTotals=0;
                    var noSubmitPersonTotals=0;
                    var restPersonTotals=0;
                    var realPersonTotals=0;
                    var signPersonTotals=0;
                    var unSignPersonTotals=0;
                    var remotePersonTotals=0;
                    var height=45*list['centerDiv'].length;
                    if(height>100){
                        $(".height-tab-class").css("height",height+"px");
                        $(".height-dui-class").css("height",(height-50)+"px");
                    }else{
                        $(".height-tab-class").css("height","100px");
                        $(".height-dui-class").css("height","70px");
                    }
                    for (var i = 0; i < list['centerDiv'].length; i++) {
                        
                        personTotals+=list['centerDiv'][i].personTotals;
                        noSubmitPersonTotals+=list['centerDiv'][i].noSubmitPersonTotals;
                        restPersonTotals+=list['centerDiv'][i].restPersonTotals;
                        realPersonTotals+=list['centerDiv'][i].realPersonTotals;
                        signPersonTotals+=list['centerDiv'][i].signPersonTotals;
                        unSignPersonTotals+=list['centerDiv'][i].unSignPersonTotals;
                        remotePersonTotals+=list['centerDiv'][i].remotePersonTotals;

                        var centerId="";
                        var deptId="";
                        if(list['centerDiv'][i].upCenterId==''){
                            centerId=list['centerDiv'][i].centerId;
                        }else{
                            centerId=list['centerDiv'][i].upCenterId;
                            deptId=list['centerDiv'][i].centerId;
                        }

                        centerHtml += "<tr><td>"+list['centerDiv'][i].centerName+"</td>"
                            + "<td><a style='cursor:pointer;' onclick=\"queryDetail('"+centerId+"','"+deptId+"','',''"+")\">"+list['centerDiv'][i].personTotals+"</a></td>"
                            + "<td><a style='cursor:pointer;' onclick=\"queryDetail('"+centerId+"','"+deptId+"','search_wuduworkSbVal','2'"+")\">"+list['centerDiv'][i].noSubmitPersonTotals+"</a></td>"
                            + "<td><a style='cursor:pointer;' onclick=\"queryDetail('"+centerId+"','"+deptId+"','search_wuduworkTypeVal','休息'"+")\">"+list['centerDiv'][i].restPersonTotals+"</a></td>"
                            + "<td><a style='cursor:pointer;' onclick=\"queryDetail('"+centerId+"','"+deptId+"','search_wuduworkTypeVal','项目现场'"+")\">"+list['centerDiv'][i].realPersonTotals+"</a></td>"
                            + "<td><a style='cursor:pointer;' onclick=\"queryDetail('"+centerId+"','"+deptId+"','search_wuduworkTypeVal','远程办公'"+")\">"+list['centerDiv'][i].remotePersonTotals+"</a></td>"
                            + "<td>"+list['centerDiv'][i].signPersonTotals+"</td>"
                            + "<td>"+list['centerDiv'][i].unSignPersonTotals+"</td></tr>";
                        singleYdata.push(list['centerDiv'][i].centerName);
                        var remotePerson = list['centerDiv'][i].remotePersonTotals;
                        var realPerson = list['centerDiv'][i].realPersonTotals;
                        var noSubmitPerson = list['centerDiv'][i].noSubmitPersonTotals;
                        var restPerson = list['centerDiv'][i].restPersonTotals;
                        var total = remotePerson+realPerson+noSubmitPerson+restPerson;
                        remotedata.push(percentNum(remotePerson,total));
                        realdata.push(percentNum(realPerson,total));
                        noSubmitdata.push(percentNum(noSubmitPerson,total));
                        restdata.push(percentNum(restPerson,total));
                     }
                    centerHtml+="<tr><td>合计</td>"
                        + "<td>"+personTotals+"</td>"
                        + "<td>"+noSubmitPersonTotals+"</td>"
                        + "<td>"+restPersonTotals+"</td>"
                        + "<td>"+realPersonTotals+"</td>"
                        + "<td>"+remotePersonTotals+"</td>"
                        + "<td>"+signPersonTotals+"</td>"
                        + "<td>"+unSignPersonTotals+"</td></tr>";
                    $("#centerTab").html(centerHtml);
                    duixing(singleYdata,remotedata ,realdata,noSubmitdata,restdata);
                    var Q14Html="";
                    for (var i = 0; i < list['wenduChartQ14'].length; i++) {
                        var title="未填写";
                        if(list['wenduChartQ14'][i].title=='1'){
                            title="本部13楼01/02";
                        }else if(list['wenduChartQ14'][i].title=='2'){
                            title="本部13楼03/04";
                        }else if(list['wenduChartQ14'][i].title=='3'){
                            title="本部2楼";
                        }else if(list['wenduChartQ14'][i].title=='4'){
                            title="本部C1";
                        }else if(list['wenduChartQ14'][i].title=='5'){
                            title="浦东本部";
                        }else if(list['wenduChartQ14'][i].title=='6'){
                            title="广州本部";
                        }else if(list['wenduChartQ14'][i].title=='7'){
                            title="北京本部";
                        }else if(list['wenduChartQ14'][i].title=='8'){
                            title="客户处";
                        }else if(list['wenduChartQ14'][i].title=='9'){
                            title="家";
                        }    
                        Q14Html += "<tr><td>"+title+"</td>"
                            + "<td>"+list['wenduChartQ14'][i].singleCount+"</td></tr>";
                    }
                    $("#Q14Tab").html(Q14Html);

                    var singleVdata1 = [];
                    var singleEdata1 = [];
                    for (var j = 0; j < list['wenduChartQ2'].length; j++) {
                        var element = {};
                            element.name = list['wenduChartQ2'][j].title;
                            element.value = list['wenduChartQ2'][j].singleCount == null ? 0 : list['wenduChartQ2'][j].singleCount;
                            singleVdata1.push(element);
                            singleEdata1.push(list['wenduChartQ2'][j].title)
                    }
                    danxuan("Q2Tu", singleEdata1, singleVdata1, "远程办公时长统计");


                    var singleVdata = [];
                    var singleEdata = [];
                    for (var j = 0; j < list['approveTotals'].length; j++) {
                        var element = {};
                            element.name = "未审核";
                            element.value = list['approveTotals'][j].unApproveCount == null ? 0 : list['approveTotals'][j].unApproveCount;
                            singleVdata.push(element);
                            singleEdata.push("未审核");
                        var element1 = {};
                        element1.name = "已审核";
                        element1.value = list['approveTotals'][j].approveCount == null ? 0 : list['approveTotals'][j].approveCount;
                        singleVdata.push(element1);
                        singleEdata.push("已审核");

                    }
                    danxuan("approveTu", singleEdata, singleVdata, "工作单审核统计");
                    var edata1 = [];
                    var vdata1 = [];
                    var vdata2 = [];
                    var vdata3 = [];
                    var vdata4 = [];
                    var vdata5 = [];
                    var vdata6 = [];
                    var vdata7 = [];
                    var vdata8 = [];
                    var vdata9 = [];

                    for (var j = 0; j < list['weekTotals'].length; j++) {
                        var element = {};
                        edata1.push(list['weekTotals'][j].created);
                        vdata1.push(list['weekTotals'][j].remotePersonTotals);
                        vdata2.push(list['weekTotals'][j].realPersonTotals);
                        vdata3.push(list['weekTotals'][j].restPersonTotals);
                        vdata4.push(list['weekTotals'][j].signTotals);
                        vdata5.push(list['weekTotals'][j].emoNoTotals);
                        vdata6.push(list['weekTotals'][j].workRecordTotals);
                        vdata7.push(list['weekTotals'][j].meetingTotals);
                        vdata8.push(list['weekTotals'][j].meetingEmonoTotals);
                        vdata9.push(list['weekTotals'][j].checkPersonTotals);


                    }
                    zhexian("remoteTu", edata1, vdata1,"近10天远程办公人数",1);
                    zhexian("realTu", edata1, vdata2,"近10天项目现场人数",1);
                    zhexian("restTu", edata1, vdata3,"近10天休息人数",1);
					
                    zhexian("signTotalsTu", edata1, vdata4,"近10天远程签到人数",2);
                    zhexian("emoNoTotalsTu", edata1, vdata5,"近10天工作记录人数",2);
                    zhexian("workRecordTotalsTu", edata1, vdata6,"近10天工作记录条数",2);
					
                    zhexian("meetingTotalsTu", edata1, vdata7,"近10天远程例会场数",3);
                    zhexian("meetingEmonoTotalsTu", edata1, vdata8,"近10天参加会议人次",3);
                    zhexian("checkPersonTotalsTu", edata1, vdata9,"近10天上班打卡人数",3);
                }
            }, function (data) {
                alert(data.msg);
            });
    }

    function percentNum(num, num2) {
        return (Math.floor(num / num2 * 10000) / 100.00);  //小数点后两位百分比
    }
    function duixing(singleYdata,remotedata ,realdata,noSubmitdata,restdata){
        var dom = document.getElementById("centerTu");
        var myChart = echarts.init(dom);
        option = null;
        option = {
            title: {
                text: '各事业部/中心办公状态',
                subtext: ''
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            legend: {
                left: 'right',
                data: ['远程办公', '项目现场', '休息', '未提交']
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'value',
            },
            yAxis: {
                type: 'category',
                data: singleYdata
            },
            series: [
                {
                    name: '远程办公',
                    type: 'bar',
                    stack: '总量',
                    label: {
                        show: true,
                        formatter:'{d}%',
                        position: 'insideRight'
                    },
                    data: remotedata
                },
                {
                    name: '项目现场',
                    type: 'bar',
                    stack: '总量',
                    label: {
                        show: true,
                        formatter:'{d}%',
                        position: 'insideRight'
                    },
                    data: realdata
                },
                {
                    name: '休息',
                    type: 'bar',
                    stack: '总量',
                    label: {
                        show: true,
                        formatter:'{d}%',
                        position: 'insideRight'
                    },
                    data: restdata
                },
                {
                    name: '未提交',
                    type: 'bar',
                    stack: '总量',
                    label: {
                        show: true,
                        formatter:'{d}%',
                        position: 'insideRight'
                    },
                    data: noSubmitdata
                }
            ]
        };
        if (option && typeof option === "object") {
            myChart.setOption(option, true);
        }
    }

    function zhexian(id,eData, vData,txt,lineType) {
        var dom = document.getElementById(id);
        var myChart = echarts.init(dom);
		
		var def_color = "#ff7f50";
		if(lineType==1) def_color = "#ff7f50";
		if(lineType==2) def_color = "#4ea397";
		if(lineType==3) def_color = "#87cefa";
		
        option = null;
        option = {
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: [txt]
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: eData
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    formatter: '{value}'
                }
            },
            series: [
                {
                    name: txt,
                    type: 'line',
                    data: vData,
					
					 lineStyle: {
						 normal: {
							 color: def_color
						 }
					 },					
					
                    itemStyle: {
                            normal: {
                                label:{
                                    show: true, //开启显示
                                    position: 'right', //在上方显示
                                    textStyle: { //数值样式
                                        color: 'black',
                                        fontSize: 16
                                    }}
                                
                            }
                        },
                    markPoint: {
                        data: [
                            {type: 'max', name: '最大值',  symbolSize: 60},
                            {type: 'min', name: '最小值',  symbolSize: 50}
                        ]
                    },
					 markLine: {
						 data: [{
							 type: 'average',
							 name: '平均值'
						 }]
					 }					
                }
            ]
        };
        if (option && typeof option === "object") {
            myChart.setOption(option, true);
        }

    }

   //饼图
   function danxuan(eleId, eData, vData,txt) {
       var dom = document.getElementById(eleId);
       var myChart = echarts.init(dom);
       var app = {};
       option = null;
       option = {
           title: {
               text: txt,
               subtext: ''
           },
           tooltip: {
               trigger: 'item',
               formatter: '{b} : {c} ({d}%)'
           },
           series : [{
               name: '类型',
               type: 'pie',
               radius : '55%',
               center: ['50%', '60%'],
               data:vData,
               itemStyle: {
                   emphasis: {
                       shadowBlur: 10,
                       shadowOffsetX: 0,
                       shadowColor: 'rgba(0, 0, 0, 0.5)'
                   },
                   normal:{
                       label:{
                           show: true,
                           formatter: "{b} : {c} ({d}%)"
                       },
                       labelLine :{show:true}
                   }
               }
           }
           ]
       };
       if (option && typeof option === "object") {
           myChart.setOption(option, true);
       }
   }


    function format(date) {
        var year = date.getFullYear();
        var month = (date.getMonth() + 1) <= 9 ? 0 + ''+(date.getMonth() + 1) : (date.getMonth() + 1);
        var day = date.getDate() <= 9 ? 0 + ''+date.getDate() : date.getDate();
        var hours = date.getHours() <= 9 ? 0 + ''+date.getHours() : date.getHours();
        var minutes = date.getMinutes() <= 9 ? 0 + ''+date.getMinutes() : date.getMinutes();
        var seconds = date.getSeconds() <= 9 ? 0 + ''+date.getSeconds() : date.getSeconds();
        return "数据最后更新时间："+year + "年" + month + "月" + day+"日  " + hours+":"+minutes+":"+seconds;
    }


    function formatDate(date) {
        var year = date.getFullYear();
        var month = (date.getMonth() + 1) <= 9 ? 0 + ''+(date.getMonth() + 1) : (date.getMonth() + 1);
        var day = date.getDate() <= 9 ? 0 + ''+date.getDate() : date.getDate();
        return year + "-" + month + "-" + day;
    }



    function get_thousand_num(num) {
        if (num==null) {
            return 0;
        }
        var str = num.toString().replace(/\d+/, function (n) { // 先提取整数部分
            return n.replace(/(\d)(?=(\d{3})+$)/g, function ($1) { // 对整数部分添加分隔符
                return $1 + ",";
            });
        });
        return str.split(".")[0];
    }


    function isNotNull(value) {
        return value == null || typeof (value) == "undefined" ? "" : value;
    }

    function isNotNull1(value) {
        return value == null || typeof (value) == "undefined" ? "" : value * 100;
    }

    Date.prototype.Format = function (fmt) {
        var o = {
            "M+": this.getMonth() + 1,
            "d+": this.getDate(),
            "H+": this.getHours(),
            "m+": this.getMinutes(),
            "s+": this.getSeconds(),
            "S+": this.getMilliseconds()
        };
        //因为date.getFullYear()出来的结果是number类型的,所以为了让结果变成字符串型，下面有两种方法：
        if (/(y+)/.test(fmt)) {
            //第一种：利用字符串连接符“+”给date.getFullYear()+""，加一个空字符串便可以将number类型转换成字符串。
            fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        for (var k in o) {
            if (new RegExp("(" + k + ")").test(fmt)) {
                //第二种：使用String()类型进行强制数据类型转换String(date.getFullYear())，这种更容易理解。
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(String(o[k]).length)));
            }
        }
        return fmt;
    };

    //几个字后就省略号
    function notnull11(value) {
        // alert(value.length);
        if (value == null || typeof (value) == "undefined") {
            return "";
        } else {
            if (value.length > 5) {
                return value.substr(0, 5) + "...";
            } else {
                return value;
            }

        }
    }

    function notnull12(value) {
        // alert(value.length);
        if (value == null || typeof (value) == "undefined") {
            return "";
        } else {
            if (value.length > 9) {
                return value.substr(0, 9) + "...";
            } else {
                return value;
            }

        }
    }

    function replayContent(string) {
        return string.replace(/<br>/g, "\n");
    }
    
    //查询销售详情
    function queryDetail(centerId,deptId,type,value) {
        //二级弹框页面
       var href='${ctx}/admin/wendu?search_mtype=3&search_centerName='+centerId+"&search_deptName="+deptId+"&"+type+"="+value;
        window.location.href=href;

    }

</script>