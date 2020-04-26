
/******************* 入口模块 ********************/
//3.1.1 用户登录接口
export const ENTRANCE_LOGINCODE = 'user_login';

//3.1.2 忘记密码接口
export const ENTRANCE_FORGETPWD = 'user_forgetPass';

//3.1.3 获取验证码
export const ENTRANCE_SENDCODE = 'user_checkCode';

/******************* 个人中心模块  ********************/
//获取个人信息接口
export const PERSONAL_EMPLOYEE = 'employee_info';

//3.2.2 修改用户信息接口
export const PERSONAL_MODIFY = 'employee_modify';

//3.2.3 消息列表接口
export const PERSONAL_MSGLIST = 'msg_list';

//3.2.5 标记消息已读接口
export const PERSONAL_READMSG = 'msg_read';

//3.2.6 修改密码
export const PERSONAL_UPDATEPWD = 'user_editPass';

//3.2.7 退出登录
export const PERSONAL_LOGOUT = 'user_logout';

/******************* 3.3 假期模块 ********************/
//3.3.1 假期暂存、修改、提交接口
export const HOLIDAY_SUBMIT = 'vacation_addModifyTijiao';

//3.3.2 我的假期列表（审批列表）接口
export const HOLIDAY_LIST = 'vacation_myVacationList';

//3.3.3 删除接口
export const HOLIDAY_DELETE = 'vacation_delete';

//3.3.4 审批接口
export const HOLIDAY_APPROVAL = 'vacation_shenpi';

//我的假期审批列表接口
export const HOLIDAYAPPROVAL_LIST = 'vacation_spVacationList';

//报销审批列表接口
export const FINANCEAPPROVAL_LIST = 'reimbursement_approvalList';


//报销审批详情接口
export const FINANCEAPPROVAL_DETAIL = 'reimbursement_approvalDetail';

//报销审批同意/驳回接口
export const FINANCEAPPROVAL_APPROVAL = 'reimbursement_approval';

//付款审批列表接口
export const PAYOUTAPPROVAL_LIST ='requestpayout_approvalList';

//付款审批详情接口
export const PAYOUTAPPROVAL_DETAIL ='requestpayout_approvalDetail';

//付款审批同意/驳回接口
export const PAYOUTAPPROVAL_APPROVAL = 'requestpayout_approval';

/******************* 3.4 周报模块 ********************/
//3.4.1 添加日报接口
export const WEEKLY_ADD = 'weekly_add';
//驳回待提交时日报添加项目
export const WEEKLY_ADDDETAIL = 'weekly_addDetail'

//3.4.2 我的日报列表接口（按月查询）
export const WEEKLY_LIST = 'weekly_myAllList';

//3.4.3 我的周报详情接口
export const WEEKLY_DETAIL = 'weekly_myDetail';

//1.1.2 修改周报接口
export const WEEKLY_UPDATE = 'weekly_edit';

//报审批列表接口 PC端是按周审批，APP按周报或按天审批的，两边操作不一样，还能按项目审批
export const WEEKLY_APPROVALLIST = 'weekly_approvalList';

//1.1.4 周报审批详情接口
export const WEEKLY_APPROVALDETAIL = 'weekly_approvalDetail';

//1.1.5 审批、驳回接口
export const WEEKLY_APPROVAL = 'weekly_approval';

/*******************基础数据模块 ********************/
//获取基础数据接口
export const METADATA_DATALIST = 'metadata_dataList';



//========19年5月份版本新增

// 手机打卡接口
export const ATTENDANCE_CLOCK = 'attendance_clock';

// 个人考勤明细接口
export const ATTNEDANCE_GETATTENDANCE_LIST = 'attendance_getAttendanceList';

//考勤地址列表接口
export const ATTENDANCE_GETSITELIST = 'attendance_getSiteList';

//增加、修改考勤地址接口
export const ATTENDANCE_ADDSITE = 'attendance_addSite';

//删除考勤地址接口
export const ATTENDANCE_DELSITE  = 'attendance_delSite';

//我的报销列表
export const REIMBURSEMENT_MYREIMLIST = 'reimbursement_myReimList';

//新增报销接口
export const REIMBURSEMENT_ADDREIM = 'reimbursement_addReim';

//修改报销接口
export const REIMBURSEMENT_UPDATEREIM = 'reimbursement_updateReim';

//删除报销接口
export const REIMBURSEMENT_DELREIM= 'reimbursement_delReim';

//提交报销接口
export const REIMBURSEMENT_SUBMITREIM = 'reimbursement_submitReim';

//报销详情
export const REIMBURSEMENT_DETAILREIM = 'reimbursement_detailReim';


//========加班接口添加
//我的加班列表接口
export const OVERTIME_MYOVERTIMELIST = 'overtime_myOvertimeList';

//获取考勤时间接口
export const OVERTIME_GETATTENDANCETIME = 'overtime_getAttendanceTime';

//新增加班接口
export const OVERTIME_ADDOVERTIME = 'overtime_addOvertime';

//加班提交接口
export const OVERTIME_SUBMITOVERTIME = 'overtime_submitOvertime';

//修改加班接口
export const OVERTIME_UPDATEOVERTIME = 'overtime_updateOvertime';

//加班详情接口
export const OVERTIME_DETAILOVERTIME = 'overtime_detailOvertime';

//删除加班接口
export const OVERTIME_DELOVERTIME = 'overtime_delOvertime';

//加班审批列表接口
export const OVERTIME_SPOVERTIMELIST = 'overtime_spOvertimeList';

//加班审批同意/驳回接口
export const OVERTIME_SHENPI = 'overtime_shenpi';

//=========公告接口添加 2020/2/16
//查询公告列表接口
export const  INFORMER_MYINFORMERLIST= 'informer_informerList';
//获取公告详情接口
export const  INFORMER_DETAILINFORMER= 'informer_detailInformer';
//公告详情点已阅改变接收状态接口
export const  INFORMER_CHANGEREADSTATUS= 'informer_changeReadStatus';
//首页公告
export const  INFORMER_NOTICELIST= 'informer_noticeList';

//=========智能中心接口添加 2020/2/23
//远成办公模块-查询远程办公数据接口
export const INFORMER_REMOTECHARTSTATIS =  'informer_remoteChartStatis';
