<%@ page language="java" contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="tags" tagdir="/WEB-INF/tags"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<c:set var="ctx" value="${pageContext.request.contextPath}"></c:set>
<% int temp = 0;%>
<div class="container-fluid wrap">
	<div class="row">
		<div class="content-box">
			<div class="mar15 add_paper">
				<div class="border bj-f0f6 pad15 border-r6 lineh-38 mar-bottom-15 ">
					<div class="pull-left">
						<div class="userimg"><img src="${ctx}/admin/employee/download?fileName=${photo }" alt="" /></div>
						<span class="color-008">${user.name }（${user.loginName }）</span>
						<span>${ee.deptName1 }</span>
						<input type="hidden" name="deptName" value="${ee.deptName2 }"/>
						<input type="hidden" id="requestpayoutId" name="requestpayoutId" value="${requestpayout.requestpayoutId }">
					</div>
					<div class="clearfix"></div>
				</div>
				<div class="">
					<ul class="xmfk-nav bor-rad6 border">
						<li class="active">
							<a href="#project1">
								付款项目
								<span class="num">1</span>
							</a>
						</li>
					</ul>
				</div>
				<form id="validation">
					<div class="table-content">
						<div class="project-h" style="height: 45px; display: none;" id="project1"></div>
						<div class="project border">
							<div class="project-title">
								<div class="pull-left"> 付款项目 <span class="num">1</span></div>
							</div>
							<div class="project-top">
								<table class="project-table">
									<tbody>
									<tr>
										<c:if test="${not empty requestpayout.projectInfoId}">
											<input type="hidden" name="projectInfoManageNo" value="${requestpayout.projectInfoManageNo }"/>
											<input type="hidden" name="projectInfoManageName" value="${requestpayout.projectInfoManageName }"/>
										</c:if>
										<td width="15%" class="text-right pad-right-0">项目编号</td>
										<td width="35%" class="text-left">
											<input type="hidden" name="projectNo" value="${requestpayout.projectInfoId }" />
											<select id="projectInfoId" <c:if test="${not empty requestpayout.requestpayoutId }">disabled="disabled"</c:if> class="cate_selector form-control"  data-live-search="true" tabindex="-1" aria-hidden="true"
													data-validation="options" style="width: 300px;">
												<option value="">全部</option>
												<c:forEach var="projectName" items="${projectList }">
													<option value="${projectName.projectNo }" data="${projectName.projectName }" <c:if test="${projectName.projectNo eq requestpayout.projectInfoId }">selected</c:if>  >${projectName.projectNo } &nbsp; ${projectName.projectName }</option>
												</c:forEach>
											</select>
										</td>
										<td width="15%" class="text-right pad-right-0">项目名称</td>
										<td width="35%" class="text-left">
											<input type="text" name="projectName" class="readonly" readonly data-validation="noEmptyReg" value="${requestpayout.projectInfoName }" />
										</td>
									</tr>
									</tbody>
								</table>
							</div>
							<c:choose>
								<c:when test="${not empty requestPayOutDetail}">
									<c:forEach items="${requestPayOutDetail}" var="item" >

										<div class="category">
											<table class="project-table">
												<c>
												<input type="hidden" id="requestpayoutDtlId" name="requestpayoutDtlId" value="${item.requestpayoutDtlId }">
												<tr>
													<td width="15%" class="text-right pad-right-0">类别</td>
													<td width="20%" class="text-left">
														<select class="cate_selector select2-hidden-accessible form-control" name="projectType" data-validation="options" data-live-search="true" tabindex="-1" aria-hidden="true">
															<option value="">请选择</option>
															<c:forEach items="${bxfylb}" var="data">
																<option  value="${data.code}" <c:if test="${data.code eq item.type }">selected</c:if>  > ${data.name} </option>
															</c:forEach>
														</select>
													</td>
													<td width="8%" class="text-right pad-right-0">金额</td>
													<td width="20%" class="text-left">
														<input type="text" name="payAmount" data-validation="numberReg" value="${item.amount }" />
														<span>元</span>
													</td>
													<td width="8%"></td>
													<td width="20%"></td>
												</tr>
												<tr>
													<td width="15%" class="text-right pad-right-0">付款单位</td>
													<td width="20%" class="text-left">
														<input type="text" name="payCompany" data-validation="noEmptyReg" value="${item.customerName }" />
													</td>
													<td width="8%" class="text-right pad-right-0">付款银行</td>
													<td width="20%" class="text-left">
														<input type="text" name="payBank" data-validation="noEmptyReg" value="${item.openaccountBank }" />
													</td>
													<td width="8%" class="text-right pad-right-0">账号</td>
													<td width="20%" class="text-left">
														<input type="text" name="payAccount" data-validation="noEmptyReg" value="${item.bankAccount }" />
													</td>
												</tr>
												<tr>
													<td width="15%" class="text-right pad-right-0 val-top">备注(请注明合同编号等信息)</td>
													<td colspan="5" class="text-left">
														<textarea name="comment" rows="">${item.content }</textarea>
													</td>
												</tr>
													<tr>
														<td width="1%" class="text-right pad-right-0">已有发票1<input type="radio"  name="invoiceStatus"  data-validation="noEmptyReg"  <c:if test="${item.invoiceStatus ==1}">checked="checked" </c:if> value="1" onclick="chy(this)"></td>
														<td width="1%" class="text-right pad-right-0">暂无发票1<input type="radio"  name="invoiceStatus" data-validation="noEmptyReg" <c:if test="${item.invoiceStatus ==0}">checked="checked" </c:if>  value="0" onclick="chy(this)"></td>
														<td width="1%" class="text-right pad-right-0">其他1<input type="radio"   name="invoiceStatus" data-validation="noEmptyReg" <c:if test="${item.invoiceStatus ==2}">checked="checked" </c:if>  value="2" onclick="chy(this)"></td>
													</tr>
													<tr id="countInvoiceNum" class="countnvoiceNum" style="display:none">
														<td width="15%" class="text-right pad-right-0">发票份数</td>
														<td width="20%" class="text-left"><input type="text" class="form-control"  name="invoiceNum" value="${item.invoiceNum}" ></td>
													</tr>
													<tr id="getDatetime" style="display:none">
														<td width="15%" class="text-right pad-right-0">预计取得发票日期</td>
														<td width="20%" class="text-left">
															<input class="form-control"  value="${item.invoiceGetDate}"  name="invoiceGetDate"  type="text" onClick="WdatePicker({el:this,dateFmt:'yyyy-MM-dd'})" >
														</td>
													</tr>
													<table class="table" id="updateTable" style="display:none" >
														<tr>
															<th>发票类型</th>
															<th>发票号码</th>
															<th>发票金额</th>
															<th> <button type="button" onclick="addrows()" class="btn btn-default btn-xs list-btn mar-right-5">添加</button></th>
														</tr>
														<c:if test="${not empty item.requestpayoutDetailInvoice}">
															<c:forEach items="${item.requestpayoutDetailInvoice}" var="detailvoice">
																<tr class="invoiceTr">
																	<td><select name="invoiceTypeCode" class="form-control" >
																		<option value="${detailvoice.invoiceTypeCode}">${detailvoice.invoiceTypeName}</option>
																		<option value="ZZPT">纸质增值税普通发票</option>
																		<option value="ZZZY">纸质增值税专用发票</option>
																		<option value="DZPT">电子增值税普通发票</option></select></td>
																	<td><input type="text"  name="invoiceNum" id="invoiceNum" value="${detailvoice.invoiceNum}" class='form-control'/></td>
																	<td><input type="text" name="invoiceAmount" id="invoiceAmount" value="${detailvoice.invoiceAmount}" class='form-control'/></td>
																	<td><button type="button" class="btn btn-default btn-xs list-btn mar-right-5" onclick="deleteTrRow(this)">删除</button></td>
																</tr>
															</c:forEach>
														</c:if>
													</table>
												</tbody>
											</table>
											<i class="category-del iconfont">&#xe602;</i>
										</div>
									</c:forEach>
								</c:when>
								<c:otherwise>
									<div class="category">
										<table class="project-table">
											<tbody>
											<input type="hidden" id="requestpayoutDtlId" name="requestpayoutDtlId" value="">
											<input type="hidden" id="dtlid" name="dtlid" value="">
											<tr>
												<td width="15%" class="text-right pad-right-0">类别</td>
												<td width="20%" class="text-left">
													<select class="cate_selector select2-hidden-accessible form-control" name="projectType" data-validation="options" data-live-search="true" tabindex="-1" aria-hidden="true">
														<option value="">请选择</option>
														<c:forEach items="${bxfylb}" var="data">
															<option  value="${data.code}" <c:if test="${data.code eq item.type }">selected</c:if>  > ${data.name} </option>
														</c:forEach>
													</select>
												</td>
												<td width="8%" class="text-right pad-right-0">金额</td>
												<td width="20%" class="text-left">
													<input type="text" name="payAmount" data-validation="numberReg" value="${item.amount }" />
													<span>元</span>
												</td>
												<td width="8%"></td>
												<td width="20%"></td>
											</tr>
											<tr>
												<td width="15%" class="text-right pad-right-0">付款单位</td>
												<td width="20%" class="text-left">
													<input type="text" name="payCompany" data-validation="noEmptyReg" value="${item.customerName }" />
												</td>
												<td width="8%" class="text-right pad-right-0">付款银行</td>
												<td width="20%" class="text-left">
													<input type="text" name="payBank" data-validation="noEmptyReg" value="${item.openaccountBank }" />
												</td>
												<td width="8%" class="text-right pad-right-0">账号</td>
												<td width="20%" class="text-left">
													<input type="text" name="payAccount" data-validation="noEmptyReg" value="${item.bankAccount }" />
												</td>
											</tr>
											<tr>
												<td width="15%" class="text-right pad-right-0 val-top">备注(请注明合同编号等信息)</td>
												<td colspan="5" class="text-left">
													<textarea name="comment" rows="">${item.content }</textarea>
												</td>
											</tr>
											<div id="radioVoice" class="radioVoice">
											<tr>
												<td width="1%" class="text-right pad-right-0">已有发票2<input type="radio" id="isinvoiceStatu" name="invoiceStatus"  data-validation="noEmptyReg" value="1"  onchange="insertShow(this)"></td>
												<td width="1%" class="text-right pad-right-0">暂无发票2<input type="radio" name="invoiceStatus"  data-validation="noEmptyReg" value="0"  onchange="insertShow(this)"></td>
												<td width="1%" class="text-right pad-right-0">其他2<input type="radio" name="invoiceStatus"  data-validation="noEmptyReg"   value="2" onchange="insertShow(this)" ></td>
													<%--<td width="15%" class="text-right pad-right-0">预计取得发票日期<input class="form-control" data-validation="noEmptyReg"   name="invoiceGetDate"  type="text" onClick="WdatePicker({el:this,dateFmt:'yyyy-MM-dd'})" id="invoiceGetDate"></td>--%>
											</tr>
											<tr id="count" style="display:none">
												<td width="15%" class="text-right pad-right-0">发票份数</td>
												<td width="20%" class="text-left"><input type="text" class="form-control"  name="invoiceNum" ></td>
											</tr>
											<tr id="getDate" style="display:none">
												<td width="15%" class="text-right pad-right-0">预计取得发票日期</td>
												<td width="20%" class="text-left">
													<input class="form-control"  value="${byRequestPayOut.invoiceGetDate}"  name="invoiceGetDate"  type="text" onClick="WdatePicker({el:this,dateFmt:'yyyy-MM-dd'})" >
												</td>
											</tr>
											</div>
											<div class="invoiceTables">
												<table class="table" id="insertTable" style="display:none">
													<tr>
														<th>发票类型</th>
														<th>发票号码</th>
														<th>发票金额</th>
														<th> <button type="button"  onclick="addrows()" class="btn btn-default btn-xs list-btn mar-right-5">添加</button></th>
													</tr>
												</table>
											</div>
											</tbody>
										</table>
									</div>
								</c:otherwise>
							</c:choose>
							<div class="category-add">
								<div class="tjlb">
									<a href="javascript:;" class="btn-sm border add_category color-333 fulan-btn-f5" style="color: #2E9BF1;">
										<i class="iconfont font12">&#xe651;</i>
										<span class="">添加类别</span>
									</a>
								</div>
							</div>
						</div>
						<%--<c:if test="${empty requestpayout.projectInfoId}">
							<div class="text-left project-add">
								<a href="javascript:;" class="btn-sm border add_project color-333 fulan-btn-f5" style="color: #2E9BF1;">
									<i class="iconfont font12">&#xe651;</i>
									<span class="">添加项目</span>
								</a>
							</div>
						</c:if>--%>
					</div>
					<div class="text-center pad_top20">
						<button type="submit" id="payForm" class="btn blu_btn">保存</button>
						<button type="button" onclick="window.history.go(-1);" class="btn blu_btn">返回</button>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>

<form action='${ctx }/admin/requestpayout/save' id='formId' method='post'></form>

<script type="text/javascript">
	var stName=15;
	var pageFlag="${pageFlag}";
	var code="${code}";
	var name="${name}";

	//获取类型下拉
	var projectType = "";
	var projectInfo = "";
	$(function(){
		$("#validation").validation({
			colour:0,//提示风格默认为0，风格参数【0,1,2】
			returndatatype:"json",//返回表单数据格式,参数【json,array】
			yseoronajax:true,//是否启用ajax提交方式默认为是：true,参数【true,false】
			returndata:function(data){
				save();
			}
		});


		myAjax("${ctx}/admin/requestpayout/getProjectInfo", "", false, function(data) {
			if(data.success){
				var projectNoList = data.data.bxfylb;
				var projectList = data.data.projectList;
				if(projectNoList != null && projectNoList.length > 0){
					for (var i = 0; i < projectNoList.length; i++) {
						projectType += "<option value="+projectNoList[i].code+">"+projectNoList[i].name+"</option>";
					}
				}
				if(projectList != null && projectList.length > 0){
					for (var i = 0; i < projectList.length; i++) {
						projectInfo += "<option value="+projectList[i].projectNo+">"+ projectList[i].projectNo + " &nbsp;  " +projectList[i].projectName+"</option>";
					}
				}
			}
		}, function(data) {
			alert(data.msg);
		});
		if(pageFlag=='1'){//如果是修改
			if(code&&name){
				var fklbHtml="<option value="+code+">"+name+"</option>";
				projectType=fklbHtml;
			}
		}
	})

	//根据项目编号获取项目名称
	$("form").delegate("#projectInfoId", "change", function(){
		var $this = $(this);
		var result = $this.closest("tr").find("input[name='projectInfoManageNo']").length;
		if($(this).val() != "" && $(this).val() != null){
			myAjax("${ctx}/admin/project/findManagerByCode", {"code": $(this).val()}, true, function(data) {
				if(data.success){
					$this.closest("tr").find("input[name='projectNo']").val($this.val());
					$this.closest("tr").find("input[name='projectName']").val(data.data.projectName);
					if(result == 0){
						var html = "<input type='hidden' name='projectInfoManageNo' value='"+ data.data.projectManagerNo +"'/>";
						html += "<input type='hidden' name='projectInfoManageName' value='"+ data.data.projectManagerName +"'/>";
						$this.after(html);
					}else{
						$this.closest("tr").find("input[name='projectInfoManageNo']").val(data.data.projectManagerNo);
						$this.closest("tr").find("input[name='projectInfoManageName']").val(data.data.projectManagerName);
					}
				}
			})
		}
	});

	//提交
	function save(){
		var html = "";
		var invoiceNum = $("input[name='invoiceNum']").val();
		let list =[];
		$("#validation form").each(function(){
			list.push($(this).serializeArray());
		})
		$("#validation form").each(function(){
			list.push($(this).serializeArray());
			html += "<input type='hidden' name='list["+0+"]' value='"+list.toString()+"'/>";
		});
		/*var arr = list.join(",");
		console.log(arr);*/

		/*var lists =JSON.stringify(list);
		console.log(lists);*/
		/*for (var i = 0 ; i < list.length ; i++) {
			var requestPayOut = {};
			requestPayOut["requestpayoutDtlId"] =  i;
			requestPayOut["dtlid"] = list[i].dtlid;
			requestPayOut["projectType"] =  list[i].projectType;;
			requestPayOut["payAmount"] =  list[i].payAmount;;
			requestPayOut["payCompany"] =  list[i].payCompany;;
			requestPayOut["payBank"] =  list[i].payBank;

		}*/



		var deptName = $("input[name='deptName']").val();
		html += "<input type='hidden' name='dept2' value='"+deptName+"'/>";
		html = "<input type='hidden' name='requestpayoutId' value='"+$("#requestpayoutId").val()+"'/>";
		var projectInfoManageNo = $("input[name='projectInfoManageNo']").val();
		var projectInfoManageName =  $("input[name='projectInfoManageName']").val();
		var projectNo = $("input[name='projectNo']").val();
		var projectName = $("input[name='projectName']").val();


		$("select[name='projectType']").each(function(index){
			var $superTr = $(this).closest("div.project");
			var $thisTr = $(this).closest("div.category");
			var $invoiceTr = $(this).closest("div.invoiceTables");
			var projectType = $(this).val();
			var $insertvoice =$(this).closest("div.insertinvoiceTable");
			var dtlid = $thisTr.find("input[name='dtlid']").val();
			var requestpayoutDtlId = $thisTr.find("input[name='requestpayoutDtlId']").val();
			var payAmount = $thisTr.find("input[name='payAmount']").val();
			var payCompany = $thisTr.find("input[name='payCompany']").val();
			var payBank = $thisTr.find("input[name='payBank']").val();
			var payAccount = $thisTr.find("input[name='payAccount']").val();
			var comment = $thisTr.find("textarea[name='comment']").val();

			/*var appendTable = $thisTr.parent().next().find("table").attr("name");//新增表Id  invoiceStatus
			var invoiceTypeList = $thisTr.parent().next().find("table").eq(1).attr("name");//类别表的table*/

			/*html += "<input type='hidden' name='requestPayOutDetail["+index+"].requestpayoutId' value='"+requestpayoutId+"'/>";*/
			html += "<input type='hidden' name='requestPayOutDetail["+index+"].requestpayoutDtlId' value='"+requestpayoutDtlId+"'/>";
			html += "<input type='hidden' name='requestPayOutDetail["+index+"].projectInfoId' value='"+projectNo+"'/>";
			html += "<input type='hidden' name='requestPayOutDetail["+index+"].projectInfoName' value='"+projectName+"'/>";
			html += "<input type='hidden' name='requestPayOutDetail["+index+"].type' value='"+projectType+"'/>";
			html += "<input type='hidden' name='requestPayOutDetail["+index+"].customerName' value='"+payCompany+"'/>";
			html += "<input type='hidden' name='requestPayOutDetail["+index+"].openaccountBank' value='"+payBank+"'/>";
			html += "<input type='hidden' name='requestPayOutDetail["+index+"].bankAccount' value='"+payAccount+"'/>";
			html += "<input type='hidden' name='requestPayOutDetail["+index+"].amount' value='"+payAmount+"'/>";
			html += "<input type='hidden' name='requestPayOutDetail["+index+"].content' value='"+comment+"'/>";
			html += "<input type='hidden' name='requestPayOutDetail["+index+"].projectInfoManageNo' value='"+projectInfoManageNo+"'/>";
			html += "<input type='hidden' name='requestPayOutDetail["+index+"].projectInfoManageName' value='"+projectInfoManageName+"'/>";

			var invoiceGetDate =$thisTr.find("input[name='invoiceGetDate']").val();
			var invoiceNum =$thisTr.find("input[name='invoiceNum']").val();
			var invoiceStatus =$thisTr.find("input[name='invoiceStatus']").val();

			html += "<input type='hidden' name='requestPayOutDetail["+index+"].invoiceGetDate' value='"+invoiceGetDate+"'/>";
			html += "<input type='hidden' name='requestPayOutDetail["+index+"].invoiceNum' value='"+invoiceNum+"'/>";
			html += "<input type='hidden' name='requestPayOutDetail["+index+"].invoiceStatus' value='"+invoiceStatus+"'/>";

			$thisTr.find(".invoiceTr").each(function (invoiceIndex){
				var invoiceTypeCode = $($(this).find("select[name='invoiceTypeCode']")[0]).val();
				var invoiceNumm = $($(this).find("input[name='invoiceNum']")[0]).val();
				var invoiceAmount =$($(this).find("input[name='invoiceAmount']")[0]).val();
				html += "<input type='hidden' name='requestPayOutDetail["+index+"].requestpayoutDetailInvoice["+invoiceIndex+"].invoiceTypeCode' value='"+invoiceTypeCode+"'/>";
				html += "<input type='hidden' name='requestPayOutDetail["+index+"].requestpayoutDetailInvoice["+invoiceIndex+"].invoiceNum' value='"+invoiceNumm+"'/>";
				html += "<input type='hidden' name='requestPayOutDetail["+index+"].requestpayoutDetailInvoice["+invoiceIndex+"].invoiceAmount' value='"+invoiceAmount+"'/>";
			});

			$thisTr.find(".appendinvoiceTr").each(function(invoiceIndexx){//取动态类型表
				var invoiceTypeCode = $($(this).find("select[name='invoiceTypeCode']")[0]).val();
				var invoiceNumm = $($(this).find("input[name='invoiceNumm']")[0]).val();
				var invoiceAmount =$($(this).find("input[name='invoiceAmount']")[0]).val();
				html += "<input type='hidden' name='requestPayOutDetail["+index+"].requestpayoutDetailInvoice["+invoiceIndexx+"].invoiceTypeCode' value='"+invoiceTypeCode+"'/>";
				html += "<input type='hidden' name='requestPayOutDetail["+index+"].requestpayoutDetailInvoice["+invoiceIndexx+"].invoiceNum' value='"+invoiceNumm+"'/>";
				html += "<input type='hidden' name='requestPayOutDetail["+index+"].requestpayoutDetailInvoice["+invoiceIndexx+"].invoiceAmount' value='"+invoiceAmount+"'/>";
			});



		});



            /*var trList = $("#"+appendTable);//循环动态标签
            for (var i=0;i<trList.length;i++) {
                var trArr=trList.find("tr").children("td");
                var status=trArr.find("input[type='radio']:checked").val();
                var num=trArr.find("#invoiceNum").val();
                var date=trArr.find("#invoiceGetDate").val();

                html += "<input type='hidden' name='requestPayOutDetail["+index+"].invoiceStatus' value='"+status+"'/>";
                html += "<input type='hidden' name='requestPayOutDetail["+index+"].invoiceNum' value='"+num+"'/>";
                html += "<input type='hidden' name='requestPayOutDetail["+index+"].invoiceGetDate' value='"+date+"'/>";
            }

            $thisTr.find(".invoiceTr").each(function (invoiceIndex){//添加类型
                var invoiceTypeCode = $($(this).find("select[name='invoiceTypeCode']")[0]).val();
                var invoiceNumm = $($(this).find("input[name='invoiceNum']")[0]).val();
                var invoiceAmount =$($(this).find("input[name='invoiceAmount']")[0]).val();
                html += "<input type='hidden' name='requestPayOutDetail["+index+"].requestpayoutDetailInvoice["+invoiceIndex+"].invoiceTypeCode' value='"+invoiceTypeCode+"'/>";
                html += "<input type='hidden' name='requestPayOutDetail["+index+"].requestpayoutDetailInvoice["+invoiceIndex+"].invoiceNum' value='"+invoiceNumm+"'/>";
                html += "<input type='hidden' name='requestPayOutDetail["+index+"].requestpayoutDetailInvoice["+invoiceIndex+"].invoiceAmount' value='"+invoiceAmount+"'/>";
            });*/



		/*var invoiceTypeCodess= invoiceTypeCodes.length;
		var invoiceStatus = $("input[name='invoiceStatus']:checked").val();
		if(invoiceStatus==0){
			var invoiceGetDate = $("input[name='invoiceGetDate']").val();
			if (invoiceGetDate==''){
				alert("预计取得发票日期未填");
				return;
			}
		}
		if (invoiceNum!=invoiceTypeCodess){
			alert("发票份数必须与发票类型数量类型一致");
			return;
		}

		if(invoiceStatus==1){
			var amount =0;//发票金额
			for (var i=0;i<invoiceAmounts.length;i++){
				amount=amount+parseInt(invoiceAmounts[i]);
			}
			var payAmount = $("input[name='payAmount']").val();//支付金额
			var payamount=parseInt(payAmount);
			if(payamount>=amount){
				alert("发票金额大于支付金额才可以提交");
				return;
			}
		}

		/!*var nary=invoiceNumms.sort();
		for (var i=0;i<invoiceNumms.length;i++){
			if (nary[i]==nary[i+1]){
				alert("发票号码重复："+nary[i]);
				return;
			}
		}*!/
		var s = invoiceNumms.join(",")+",";
		for(var i=0;i<invoiceNumms.length;i++) {
			if(s.replace(invoiceNumms[i]+",","").indexOf(invoiceNumms[i]+",")>-1) {

				return alert("票据中有重复号码：" + invoiceNumms[i]);;
				break;
			}
		}*/


		$("#formId").html(html);
		var params = $("#formId").serializeArray();
		/*params.push(list);*/
		myAjax("${ctx}/admin/requestpayout/save", params, true, function(data) {
			if(data.success){
				alert("保存成功");
				// 返回上一记录
				window.history.go(-1);
			}
		}, function(data) {
			alert(data.msg);
		});
	}
</script>

<script type="text/javascript">

	function getCateHtml(){
		stName++;
		var categoryHtml = '<div class="category"><form>\
							<table class="project-table"  name="project1" >\
								<tbody id="project1">\
									<tr>\
									<input type="hidden" id="requestpayoutDtlId" name="requestpayoutDtlId" value="">\
									<input type="hidden" id="dtlid" name="dtlid" value="">\
										<td width="15%" class="text-right pad-right-0">类别</td>\
										<td width="20%" class="text-left">\
											<select class="cate_selector select2-hidden-accessible form-control" name="projectType" data-validation="options" data-live-search="true" tabindex="-1" aria-hidden="true">\
			                                    <option value="">请选择</option>'
				+ projectType +
				'</select>\
            </td>\
            <td width="8%" class="text-right pad-right-0">金额</td>\
            <td width="20%" class="text-left">\
                <input type="text" name="payAmount" data-validation="numberReg" value="" />\
                <span>元</span>\
            </td>\
            <td width="8%"></td>\
            <td width="20%"></td>\
        </tr>\
        <tr>\
            <td width="15%" class="text-right pad-right-0">付款单位</td>\
            <td width="20%" class="text-left">\
                <input type="text" name="payCompany" data-validation="noEmptyReg" value="" />\
            </td>\
            <td width="8%" class="text-right pad-right-0">付款银行</td>\
            <td width="20%" class="text-left">\
                <input type="text" name="payBank" data-validation="noEmptyReg" value="" />\
            </td>\
            <td width="8%" class="text-right pad-right-0">账号</td>\
            <td width="20%" class="text-left">\
                <input type="text" name="payAccount" data-validation="noEmptyReg" value="" />\
            </td>\
        </tr>\
        <tr>\
            <td width="15%" class="text-right pad-right-0 val-top">备注(请注明合同编号等信息)</td>\
            <td colspan="5" class="text-left">\
                <textarea name="comment" rows=""></textarea>\
            </td>\
        </tr>\
        <tr class="invoiceStatusName" id="invoiceStatus" >\
			<td width="1%" class="text-right pad-right-0">已有发票3<input type="radio" id ="invoiceStatus1'+stName+'" name="invoiceStatus" data-validation="noEmptyReg" value="1"  onchange="chys(this,stName)"></td>\
			<td width="1%" class="text-right pad-right-0">暂无发票3<input type="radio" id ="invoiceStatus2'+stName+'" name="invoiceStatus"  data-validation="noEmptyReg" value="0" onchange="chys(this,stName)" ></td>\
			<td width="1%" class="text-right pad-right-0">其他3<input type="radio" id = "invoiceStatus3'+stName+'" name="invoiceStatus" data-validation="noEmptyReg" value="2" onchange="chys(this,stName)" ></td>\
        </tr>\
        <tr id="invoiceNum'+stName+'" style="display: none">\
        <td width="15%" class="text-right pad-right-0">发票份数<td>\
        <td width="20%" class="text-left"><input type="text" class="form-control" id="invoiceNum'+stName+'"    name="invoiceNum"></td>\
        </tr>\
        <tr id="invoiceGetDate'+stName+'" style="display: none">\
             <td width="15%" class="text-right pad-right-0">预计取得发票日期</td>\
             <td width="20%" class="text-left"><input class="form-control" id="invoiceGetDate'+stName+'"  name="invoiceGetDate"  type="text" onClick="WdatePicker({el:this,dateFmt:\'yyyy-MM-dd\'})" ></td>\
        </tr>\
        <table class="table" id="invoiceStatus4'+stName+'"  style="display:none" >\
        	<tr>\
				<td>发票类型</td>\
				<td>发票号码</td>\
				\
				<td>发票金额</td>\
				<td> <button type="button" name="invoiceStatus4'+stName+'" onclick="addrowss(this)" class="btn btn-default btn-xs list-btn mar-right-5">添加</button></td>\
			</tr>\
        	<tr class="appendinvoiceTr'+stName+'" id="appendinvoiceTr'+stName+'">\
        	</tr>\
    </tbody>\
</table>\
<i class="category-del iconfont">&#xe602;</i>\
\
</from></div>';

		return  categoryHtml;

	}

	$(function(){
		$('select[data-live-search="true"]').select2();

		var projectHtml = '<div class="project-h" style="height: 45px; display: none;"></div><div class="project border">\
						<div class="project-title">\
							<div class="pull-left"> 付款项目 <span class="num">1</span></div>\
							<a href="javascript:;" class="project-del pull-right">\
								<i class="iconfont val-mid">&#xe63b;</i>删除</a>\
						</div>\
						<div class="project-top">\
							<table class="project-table">\
								<tbody>\
									<tr>\
										<td width="15%" class="text-right pad-right-0">项目编号</td>\
										<td width="35%" class="text-left">\
										<input type="hidden" name="projectNo" value="" />\
											<select id="projectInfoId" class="cate_selector form-control"  data-live-search="true" tabindex="-1" aria-hidden="true"\
												data-validation="options" style="width: 300px;">\
			                                    <option value="">全部</option>'
				+ projectInfo +
				'</select>\
            </td>\
            <td width="15%" class="text-right pad-right-0">项目名称</td>\
            <td width="35%" class="text-left">\
                <input type="text" name="projectName" data-validation="noEmptyReg" class="readonly" readonly value="" />\
            </td>\
        </tr>\
    </tbody>\
</table>\
</div>\
<div class="category">\
<table class="project-table">\
    <tbody>\
        <tr>\
        <input type="hidden" id="requestpayoutDtlId" name="requestpayoutDtlId" value="">\
            <input type="hidden" id="dtlid" name="dtlid" value="">\
            <td width="15%" class="text-right pad-right-0">类别</td>\
            <td width="20%" class="text-left">\
                <select class="cate_selector select2-hidden-accessible form-control" name="projectType" data-validation="options" data-live-search="true" tabindex="-1" aria-hidden="true">\
                    <option value="">请选择</option>'
				+ projectType +
				'</select>\
            </td>\
            <td width="8%" class="text-right pad-right-0">金额</td>\
            <td width="20%" class="text-left">\
                <input type="text" name="payAmount" data-validation="numberReg" value="" />\
                <span>元</span>\
            </td>\
            <td width="8%"></td>\
            <td width="20%"></td>\
        </tr>\
        <tr>\
            <td width="15%" class="text-right pad-right-0">付款单位</td>\
            <td width="20%" class="text-left">\
                <input type="text" name="payCompany" data-validation="noEmptyReg" value="" />\
            </td>\
            <td width="8%" class="text-right pad-right-0">付款银行</td>\
            <td width="20%" class="text-left">\
                <input type="text" name="payBank" data-validation="noEmptyReg" value="" />\
            </td>\
            <td width="8%" class="text-right pad-right-0">账号</td>\
            <td width="20%" class="text-left">\
                <input type="text" name="payAccount" data-validation="noEmptyReg" value="" />\
            </td>\
        </tr>\
        <tr>\
            <td width="15%" class="text-right pad-right-0 val-top">备注(请注明合同编号等信息)</td>\
            <td colspan="5" class="text-left">\
                <textarea name="comment" rows=""></textarea>\
            </td>\
        </tr>\
    </tbody>\
</table>\
</div>\
<div class="category-add">\
<div class="tjlb">\
    <a href="javascript:;" class="btn-sm border add_category color-333 fulan-btn-f5" style="color: #2E9BF1;">\
        <i class="iconfont font12">&#xe651;</i> \
        <span class="" onclick="addtables()">添加类别</span>\
    </a>\
</div>\
</div>\
</div>';

		$(".project .num").each(function(index,element){
			$(element).text(index+1)
		});
		$(".xmfk-nav .num").each(function(index,element){
			$(element).text(index+1)
		});
		$(".add_project").on("click",function(){
			$(".project-add").before(projectHtml);

			$('select[data-live-search="true"]').select2();
			$(".xmfk-nav").append('<li>\
							<a href="javascript:;">付款项目<span class="num"></span></a>\
						</li>');
			$(".project-h").each(function(index,ele){
				$(ele).attr("id","project"+(index+1));
			});
			$(".xmfk-nav a").each(function(index,ele){
				$(ele).attr("href","#project"+(index+1));
			});
			$(".project .num").each(function(index,element){
				$(element).text(index+1)
			});
			$(".xmfk-nav .num").each(function(index,element){
				$(element).text(index+1)
			});
		});


		var addCategory = function($this) {
			if ($this == null || typeof ($this) == 'undefined' || $this == '') {
				$(".category-add").before(getCateHtml(stName));
			} else {
				$this.closest(".category-add").before(getCateHtml(stName));
			}
			$('select[data-live-search="true"]').select2();
		}


		$("body").on("click", ".add_category", function() {
			addCategory($(this));
		});

		$("body")
				.on(
						"click",
						".category-del",
						function() {
							var $this = $(this);
							var requestpayoutDtlId = $(this).closest(
									".category").find(
									"[name='requestpayoutDtlId']").val();
							if (typeof (requestpayoutDtlId) != "undefined"
									&& requestpayoutDtlId != null
									&& requestpayoutDtlId != "") {
								layer
										.confirm(
												'是否删除？',
												{
													btn : [ '确定', '取消' ],//按钮
													btnAlign : "c"
												},
												function() {
													//根据明细id删除
													myAjax(
															"${ctx}/admin/requestpayout/delByRequestPayOutDtlId",
															{
																"requestpayoutDtlId" : requestpayoutDtlId
															},
															true,
															function(data) {
																if (data.success) {
																	alert("删除成功");
																	$this
																			.closest(
																					".category")
																			.remove();
																	if ($(".category").length == 0) {
																		addCategory(null);
																	}
																}
															},
															function(data) {
																alert(data.msg);
															});
												}, function() {
													layer.msg({
														time : 5000, //5s后自动关闭
													});
												});
							} else {
								$this.closest(".category").remove();
							}
						});
		$("body").on("click", ".project-del", function() {
			var num = $(this).parents(".project").find(".num").html() - 1;
			$(this).parents(".project").remove();
			$(".xmfk-nav li").eq(num).remove();
			$(".project-h").each(function(index, ele) {
				$(ele).attr("id", "project" + (index + 1));
			});
			$(".xmfk-nav a").each(function(index, ele) {
				$(ele).attr("href", "#project" + (index + 1));
			});
			$(".project .num").each(function(index, element) {
				$(element).text(index + 1)
			});
			$(".xmfk-nav .num").each(function(index, element) {
				$(element).text(index + 1)
			});
		});
		$("body").on("click", ".xmfk-nav li", function() {
			$(this).addClass("active").siblings("li").removeClass("active");
			$(".project-h").hide();
			$(".project-h").eq($(this).index()).show();
		});
		$(window).scroll(function() {
			if ($(window).scrollTop() > 130) {
				$(".xmfk-nav").css({
					"position" : "fixed",
					"top" : 0,
					"z-index" : 1
				});
			} else {
				$(".project-h").hide();
				$(".xmfk-nav").css({
					"position" : "relative",
					"top" : 0
				});
			}
		});
	});
</script>

<script type="text/javascript">
	//修改
	function chy(obj){
		var rr = $("input[type='radio']:checked").val();
		if(rr =="1"){
			$("#countInvoiceNum").show();
			$("#getDatetime").hide();
			$("#updateTable").show();
		}
		if(rr =="0"){
			$("#getDatetime").show();
			$("#countInvoiceNum").hide();
			$("#updateTable").hide();
		}
		if(rr =="2"){
			$("#getDatetime").hide();
			$("#countInvoiceNum").hide();
			$("#updateTable").hide();
		}
	}
	//新增
	function insertShow(obj){
		var rr = $("input[type='radio']:checked").val();
		if(rr =="1"){
			$("#count").show();
			$("#getDate").hide();
			$("#insertTable").show();
		}
		if(rr =="0"){
			$("#getDate").show();
			$("#count").hide();
			$("#insertTable").hide();
		}
		if(rr =="2"){
			$("#getDate").hide();
			$("#count").hide();
			$("#insertTable").hide();
		}
	}

	function addrows(){
		var table = $("#insertTable");
		var html = $("<tr class='invoiceTr' id='invoiceTr'>"+
				"<td><select name='invoiceTypeCode' class='form-control' data-validation='noEmptyReg' >" +
				"<option value='请选择'>请选择</option>" +
				"<option value='ZZPT' >纸质增值税普通发票</option>" +
				"<option value='ZZZY' >纸质增值税专用发票</option>" +
				"<option value='DZPT'>电子增值税普通发票</option></select></td>"+
				"<td><input type='text' data-validation='noEmptyReg' name='invoiceNum' id='invoiceNum' value='' class='form-control'/></td>"+
				"<td><input type='text' data-validation='noEmptyReg' name='invoiceAmount' id='invoiceAmount' value='' class='form-control'/></td>"+
				"<td><button type='button' class='btn btn-default btn-xs list-btn mar-right-5' onclick='deleteTrRow(this)'>删除</button></td>"+"</tr>");
		html.appendTo(table);

	}

	function  addrowss(obj){
	    var insert =$(obj).attr("name");
		var table = $("#"+insert);
		var html = $("<tr class='appendinvoiceTr' id='appendinvoiceTr'>"+
				"<td><select name='invoiceTypeCode' id='invoiceTypeCode' class='form-control' data-validation='noEmptyReg' >" +
				"<option value='请选择'>请选择</option>" +
				"<option value='ZZPT' >纸质增值税普通发票</option>" +
				"<option value='ZZZY' >纸质增值税专用发票</option>" +
				"<option value='DZPT'>电子增值税普通发票</option></select></td>"+
				"<td><input type='text' data-validation='noEmptyReg' name='invoiceNumm' id='invoiceNumm' value='' class='form-control'/></td>"+
				"<td><input type='text' data-validation='noEmptyReg' name='invoiceAmount' id='invoiceAmount' value='' class='form-control'/></td>"+
				"<td><button type='button' class='btn btn-default btn-xs list-btn mar-right-5' onclick='deleteTrRow(this)'>删除</button></td>"+"</tr>");
		html.appendTo(table);

	}




	function chys(obj,stName){
		let invoiceStatusName = $(obj).val();
		let invoicestatusId = $(obj).attr("id");//动态表格
		var count =$(obj).parent().parent().next().find("input").attr("id");//票数
		var date  =$(obj).parent().parent().next().next().find("input").attr("id");//日期
		var invoicestatusIdTable = $("#invoiceStatus4"+stName+"").attr("id");//展示框
		if(invoiceStatusName =="1"){
			$("#"+count).show();
			$("#"+invoicestatusIdTable).show();
			$("#"+date).hide();
		}
		if(invoiceStatusName =="0"){
			$("#"+invoicestatusIdTable).hide();
			$("#"+date).show();
			$("#"+count).hide();
		}

		if(invoiceStatusName =="2"){
			$("#"+invoicestatusIdTable).hide();
			$("#"+date).hide();
			$("#"+count).hide();
		}
	}


	function deleteTrRow(tr){
		//多一个parent就代表向前一个标签,
		//本删除范围为<td><tr>两个标签,即向前两个parent
		//如果多一个parent就会删除整个table
		$(tr).parent().parent().remove();
	}

	$(document).ready(function(){
		<c:forEach items="${requestPayOutDetail}" var="item" >
			<c:if test="${item.invoiceStatus==1}">
				$("")
				$("#countInvoiceNum").show();
				$("#getDatetime").show();
				$("#updateTable").hide();
			</c:if>
		</c:forEach>



		/*if (isinvoiceStatu==1){
			$("#isinvoiceStatu").attr("checked","checked");
			document.getElementById("count").style.display="";
			document.getElementById("getDate").style.display="none";
			document.getElementById("insertTable").style.display="";
		}
		if(isinvoiceStatu==2){
			$("#isinvoiceStatu").attr("checked","checked");
			document.getElementById("count").style.display="none";
			document.getElementById("getDate").style.display="none";
			document.getElementById("insertTable").style.display="none";
			return;
		}
		if(isinvoiceStatu==3){//新增默认进来的时候
			$("#isinvoiceStatu").attr("checked","checked");
			document.getElementById("count").style.display="";
			document.getElementById("getDate").style.display="none";
			document.getElementById("insertTable").style.display="";
			return;
		}*/

	});




</script>

