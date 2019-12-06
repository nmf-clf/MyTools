export const requestJson = (data)=> {
    return{
        //解释说明::
        //A:所添加的每个规则的产品都是上个页面接口带出来的，所以产品(数量,名称)都是一致的,
        //B:限定条件开关,每个规则的不一定相同,判断限定条件模块是否显示
        //C:保额限定开关,判断保额模块是否显示
        "data":{
            "onsaleId":data.onsaleId, //在售Id
            "requestPackageRuleVoList":[ //规则数据数组
                { //1:规则1数据对象
                    "saleArea": "0001",//规则1适用机构名称
                    "productList":[ //规则1下的产品数据数组,每个规则的产品数据数组都是一致的
                        { //1.1:规则1-基础版
                            "planAbbreviation":data.banben, //上一个接口给的数据判断是基础版or钻石版,且再次入参用于页面展示
                            "categoryList":[ //险种分类(主险/附加险)
                                { //1.1.1:规则1-基础版-主险
                                    "category":data.category, //主险
                                    "productCode":data.productCode, //基础版的产品代码,说明A
                                    "productName":data.productName, //基础版的产品名称,说明A
                                    "conditionSwitch":data.conditionSwitch, //见说明B
                                    "formList":[ //限定条件表单元素数据数组
                                        { //1.1.1.1:规则1-基础版-主险-条件1
                                            "minAllowAge":data.minAllowAge, //最小投保年龄
                                            "minAllowAgeUnit":data.minAllowAgeUnit, //最小投保年龄单位
                                            "maxAllowAge":data.maxAllowAge, //最大投保年龄
                                            "maxAllowAgeUnit":data.minAllowAgeUnit, //最大投保年龄单位
                                            "GuaranteePeriod":data.GuaranteePeriod, //保障期限
                                            "BillingMode":data.BillingMode, //缴费方式
                                            "PremiumPaymentPeriod":data.PremiumPaymentPeriod, //缴费年限
                                            "PremiumLimit":data.PremiumLimit, //保额限定,
                                            "isFixed":data.isFixed, //保额类型是否固定,默认固定
                                            "InsuranceAmount":data.InsuranceAmount || '' //保额
                                        },
                                        { //1.1.1.2:规则1-基础版-主险-条件2
                                            "minAllowAge":data.minAllowAge, //最小投保年龄
                                            "minAllowAgeUnit":data.minAllowAgeUnit, //最小投保年龄单位
                                            "maxAllowAge":data.maxAllowAge, //最大投保年龄
                                            "maxAllowAgeUnit":data.minAllowAgeUnit, //最大投保年龄单位
                                            "GuaranteePeriod":data.GuaranteePeriod, //保障期限
                                            "BillingMode":data.BillingMode, //缴费方式
                                            "PremiumPaymentPeriod":data.PremiumPaymentPeriod, //缴费年限
                                            "PremiumLimit":data.PremiumLimit, //保额限定,
                                            "isFixed":data.isFixed, //保额类型是否固定,默认固定
                                            "InsuranceAmount":data.InsuranceAmount || '' //保额
                                        }
                                        //条件3----N 条件可能有0-N个
                                    ]
                                },
                                {   //1.1.2:规则1-基础版-附加险
                                    "category":data.category, //附加险
                                    "productCode":data.productCode, //基础版的产品代码,说明A
                                    "productName":data.productName, //基础版的产品名称,说明A
                                    "conditionSwitch":data.conditionSwitch, //见说明B
                                    "formList":[ //限定条件表单元素数据数组
                                        { //1.1.2.1:规则1-基础版-附加险-条件1
                                            "minAllowAge":data.minAllowAge, //最小投保年龄
                                            "minAllowAgeUnit":data.minAllowAgeUnit, //最小投保年龄单位
                                            "maxAllowAge":data.maxAllowAge, //最大投保年龄
                                            "maxAllowAgeUnit":data.minAllowAgeUnit, //最大投保年龄单位
                                            "GuaranteePeriod":data.GuaranteePeriod, //保障期限
                                            "BillingMode":data.BillingMode, //缴费方式
                                            "PremiumPaymentPeriod":data.PremiumPaymentPeriod, //缴费年限
                                            "PremiumLimit":data.PremiumLimit, //保额限定,
                                            "isFixed":data.isFixed, //保额类型是否固定,默认固定
                                            "InsuranceAmount":data.InsuranceAmount || '' //保额
                                        },
                                        { //1.1.2.2:规则1-基础版-附加险-条件2
                                            "minAllowAge":data.minAllowAge, //最小投保年龄
                                            "minAllowAgeUnit":data.minAllowAgeUnit, //最小投保年龄单位
                                            "maxAllowAge":data.maxAllowAge, //最大投保年龄
                                            "maxAllowAgeUnit":data.minAllowAgeUnit, //最大投保年龄单位
                                            "GuaranteePeriod":data.GuaranteePeriod, //保障期限
                                            "BillingMode":data.BillingMode, //缴费方式
                                            "PremiumPaymentPeriod":data.PremiumPaymentPeriod, //缴费年限
                                            "PremiumLimit":data.PremiumLimit, //保额限定,
                                            "isFixed":data.isFixed, //保额类型是否固定,默认固定
                                            "InsuranceAmount":data.InsuranceAmount || '' //保额
                                        }
                                        //条件3----N 条件可能有0-N个
                                    ]
                                }
                            ]
                            
                        },
                        { //1.2:规则1-钻石版
                            "版本":data.banben, //上一个接口给的数据判断是基础版or钻石版,且再次入参用于页面展示
                            "categoryList":[ //险种分类(主险/附加险)
                                {   //1.2.1:规则1-钻石版-主险
                                    "category":data.category, //主险
                                    "productCode":data.productCode, //基础版的产品代码,说明A
                                    "productName":data.productName, //基础版的产品名称,说明A
                                    "conditionSwitch":data.conditionSwitch, //见说明B
                                    "formList":[ //限定条件表单元素数据数组
                                        { //1.2.1.1规则1-钻石版-主险-条件1
                                            "minAllowAge":data.minAllowAge, //最小投保年龄
                                            "minAllowAgeUnit":data.minAllowAgeUnit, //最小投保年龄单位
                                            "maxAllowAge":data.maxAllowAge, //最大投保年龄
                                            "maxAllowAgeUnit":data.minAllowAgeUnit, //最大投保年龄单位
                                            "GuaranteePeriod":data.GuaranteePeriod, //保障期限
                                            "BillingMode":data.BillingMode, //缴费方式
                                            "PremiumPaymentPeriod":data.PremiumPaymentPeriod, //缴费年限
                                            "PremiumLimit":data.PremiumLimit, //保额限定,
                                            "isFixed":data.isFixed, //保额类型是否固定,默认固定
                                            "InsuranceAmount":data.InsuranceAmount || '' //保额
                                        },
                                        { //1.2.1.2:规则1-钻石版-主险-条件2
                                            "minAllowAge":data.minAllowAge, //最小投保年龄
                                            "minAllowAgeUnit":data.minAllowAgeUnit, //最小投保年龄单位
                                            "maxAllowAge":data.maxAllowAge, //最大投保年龄
                                            "maxAllowAgeUnit":data.minAllowAgeUnit, //最大投保年龄单位
                                            "GuaranteePeriod":data.GuaranteePeriod, //保障期限
                                            "BillingMode":data.BillingMode, //缴费方式
                                            "PremiumPaymentPeriod":data.PremiumPaymentPeriod, //缴费年限
                                            "PremiumLimit":data.PremiumLimit, //保额限定,
                                            "isFixed":data.isFixed, //保额类型是否固定,默认固定
                                            "InsuranceAmount":data.InsuranceAmount || '' //保额
                                        }
                                        //条件3----N 条件可能有0-N个
                                    ]
                                },
                                {   //1.2.2:规则1-钻石版-附加险
                                    "category":data.category, //附加险
                                    "productCode":data.productCode, //基础版的产品代码,说明A
                                    "productName":data.productName, //基础版的产品名称,说明A
                                    "conditionSwitch":data.conditionSwitch, //见说明B
                                    "formList":[ //限定条件表单元素数据数组
                                        { //1.2.2.1:规则1-钻石版-附加险-条件1
                                            "minAllowAge":data.minAllowAge, //最小投保年龄
                                            "minAllowAgeUnit":data.minAllowAgeUnit, //最小投保年龄单位
                                            "maxAllowAge":data.maxAllowAge, //最大投保年龄
                                            "maxAllowAgeUnit":data.minAllowAgeUnit, //最大投保年龄单位
                                            "GuaranteePeriod":data.GuaranteePeriod, //保障期限
                                            "BillingMode":data.BillingMode, //缴费方式
                                            "PremiumPaymentPeriod":data.PremiumPaymentPeriod, //缴费年限
                                            "PremiumLimit":data.PremiumLimit, //保额限定,
                                            "isFixed":data.isFixed, //保额类型是否固定,默认固定
                                            "InsuranceAmount":data.InsuranceAmount || '' //保额
                                        },
                                        { //1.2.2.2:规则1-钻石版-附加险-条件2
                                            "minAllowAge":data.minAllowAge, //最小投保年龄
                                            "minAllowAgeUnit":data.minAllowAgeUnit, //最小投保年龄单位
                                            "maxAllowAge":data.maxAllowAge, //最大投保年龄
                                            "maxAllowAgeUnit":data.minAllowAgeUnit, //最大投保年龄单位
                                            "GuaranteePeriod":data.GuaranteePeriod, //保障期限
                                            "BillingMode":data.BillingMode, //缴费方式
                                            "PremiumPaymentPeriod":data.PremiumPaymentPeriod, //缴费年限
                                            "PremiumLimit":data.PremiumLimit, //保额限定,
                                            "isFixed":data.isFixed, //保额类型是否固定,默认固定
                                            "InsuranceAmount":data.InsuranceAmount || '' //保额
                                        }
                                        //条件3----N 条件可能有0-N个
                                    ]
                                }
                            ]
                            
                        },
                        //每个版本对应一个计划和计划别名,每个版本下面有主险或者附加险,因此版本有1-N个
                    ]
                },
                { //2:规则2数据对象
                    "saleArea": "0001",//规则2适用机构名称
                    "productList":[ //规则2下的产品数据数组,每个规则的产品数据数组都是一致的
                        { //2.1:规则2-基础版
                            "版本":data.banben, //上一个接口给的数据判断是基础版or钻石版,且再次入参用于页面展示
                            "categoryList":[ //险种分类(主险/附加险)
                                { //2.1.1:规则2-基础版-主险
                                    "category":data.category, //主险
                                    "productCode":data.productCode, //基础版的产品代码,说明A
                                    "productName":data.productName, //基础版的产品名称,说明A
                                    "conditionSwitch":data.conditionSwitch, //见说明B
                                    "formList":[ //限定条件表单元素数据数组
                                        { //2.1.1.1:规则2-基础版-主险-条件1
                                            "minAllowAge":data.minAllowAge, //最小投保年龄
                                            "minAllowAgeUnit":data.minAllowAgeUnit, //最小投保年龄单位
                                            "maxAllowAge":data.maxAllowAge, //最大投保年龄
                                            "maxAllowAgeUnit":data.minAllowAgeUnit, //最大投保年龄单位
                                            "GuaranteePeriod":data.GuaranteePeriod, //保障期限
                                            "BillingMode":data.BillingMode, //缴费方式
                                            "PremiumPaymentPeriod":data.PremiumPaymentPeriod, //缴费年限
                                            "PremiumLimit":data.PremiumLimit, //保额限定,
                                            "isFixed":data.isFixed, //保额类型是否固定,默认固定
                                            "InsuranceAmount":data.InsuranceAmount || '' //保额
                                        },
                                        { //2.1.1.2:规则2-基础版-主险-条件2
                                            "minAllowAge":data.minAllowAge, //最小投保年龄
                                            "minAllowAgeUnit":data.minAllowAgeUnit, //最小投保年龄单位
                                            "maxAllowAge":data.maxAllowAge, //最大投保年龄
                                            "maxAllowAgeUnit":data.minAllowAgeUnit, //最大投保年龄单位
                                            "GuaranteePeriod":data.GuaranteePeriod, //保障期限
                                            "BillingMode":data.BillingMode, //缴费方式
                                            "PremiumPaymentPeriod":data.PremiumPaymentPeriod, //缴费年限
                                            "PremiumLimit":data.PremiumLimit, //保额限定,
                                            "isFixed":data.isFixed, //保额类型是否固定,默认固定
                                            "InsuranceAmount":data.InsuranceAmount || '' //保额
                                        }
                                        //条件3----N 条件可能有0-N个
                                    ]
                                },
                                {   //2.1.2:规则2-基础版-附加险
                                    "category":data.category, //附加险
                                    "productCode":data.productCode, //基础版的产品代码,说明A
                                    "productName":data.productName, //基础版的产品名称,说明A
                                    "conditionSwitch":data.conditionSwitch, //见说明B
                                    "formList":[ //限定条件表单元素数据数组
                                        { //2.1.2.1:规则2-基础版-附加险-条件1
                                            "minAllowAge":data.minAllowAge, //最小投保年龄
                                            "minAllowAgeUnit":data.minAllowAgeUnit, //最小投保年龄单位
                                            "maxAllowAge":data.maxAllowAge, //最大投保年龄
                                            "maxAllowAgeUnit":data.minAllowAgeUnit, //最大投保年龄单位
                                            "GuaranteePeriod":data.GuaranteePeriod, //保障期限
                                            "BillingMode":data.BillingMode, //缴费方式
                                            "PremiumPaymentPeriod":data.PremiumPaymentPeriod, //缴费年限
                                            "PremiumLimit":data.PremiumLimit, //保额限定,
                                            "isFixed":data.isFixed, //保额类型是否固定,默认固定
                                            "InsuranceAmount":data.InsuranceAmount || '' //保额
                                        },
                                        { //2.1.2.2:规则2-基础版-附加险-条件2
                                            "minAllowAge":data.minAllowAge, //最小投保年龄
                                            "minAllowAgeUnit":data.minAllowAgeUnit, //最小投保年龄单位
                                            "maxAllowAge":data.maxAllowAge, //最大投保年龄
                                            "maxAllowAgeUnit":data.minAllowAgeUnit, //最大投保年龄单位
                                            "GuaranteePeriod":data.GuaranteePeriod, //保障期限
                                            "BillingMode":data.BillingMode, //缴费方式
                                            "PremiumPaymentPeriod":data.PremiumPaymentPeriod, //缴费年限
                                            "PremiumLimit":data.PremiumLimit, //保额限定,
                                            "isFixed":data.isFixed, //保额类型是否固定,默认固定
                                            "InsuranceAmount":data.InsuranceAmount || '' //保额
                                        }
                                        //条件3----N 条件可能有0-N个
                                    ]
                                }
                            ]
                            
                        },
                        { //2.2:规则2-钻石版
                            "版本":data.banben, //上一个接口给的数据判断是基础版or钻石版,且再次入参用于页面展示
                            "categoryList":[ //险种分类(主险/附加险)
                                {   //2.2.1:规则2-钻石版-主险
                                    "category":data.category, //主险
                                    "productCode":data.productCode, //基础版的产品代码,说明A
                                    "productName":data.productName, //基础版的产品名称,说明A
                                    "conditionSwitch":data.conditionSwitch, //见说明B
                                    "formList":[ //限定条件表单元素数据数组
                                        { //2.2.1.1规则2-钻石版-主险-条件1
                                            "minAllowAge":data.minAllowAge, //最小投保年龄
                                            "minAllowAgeUnit":data.minAllowAgeUnit, //最小投保年龄单位
                                            "maxAllowAge":data.maxAllowAge, //最大投保年龄
                                            "maxAllowAgeUnit":data.minAllowAgeUnit, //最大投保年龄单位
                                            "GuaranteePeriod":data.GuaranteePeriod, //保障期限
                                            "BillingMode":data.BillingMode, //缴费方式
                                            "PremiumPaymentPeriod":data.PremiumPaymentPeriod, //缴费年限
                                            "PremiumLimit":data.PremiumLimit, //保额限定,
                                            "isFixed":data.isFixed, //保额类型是否固定,默认固定
                                            "InsuranceAmount":data.InsuranceAmount || '' //保额
                                        },
                                        { //2.2.1.2:规则2-钻石版-主险-条件2
                                            "minAllowAge":data.minAllowAge, //最小投保年龄
                                            "minAllowAgeUnit":data.minAllowAgeUnit, //最小投保年龄单位
                                            "maxAllowAge":data.maxAllowAge, //最大投保年龄
                                            "maxAllowAgeUnit":data.minAllowAgeUnit, //最大投保年龄单位
                                            "GuaranteePeriod":data.GuaranteePeriod, //保障期限
                                            "BillingMode":data.BillingMode, //缴费方式
                                            "PremiumPaymentPeriod":data.PremiumPaymentPeriod, //缴费年限
                                            "PremiumLimit":data.PremiumLimit, //保额限定,
                                            "isFixed":data.isFixed, //保额类型是否固定,默认固定
                                            "InsuranceAmount":data.InsuranceAmount || '' //保额
                                        }
                                        //条件3----N 条件可能有0-N个
                                    ]
                                },
                                {   //2.2.2:规则2-钻石版-附加险
                                    "category":data.category, //附加险
                                    "productCode":data.productCode, //基础版的产品代码,说明A
                                    "productName":data.productName, //基础版的产品名称,说明A
                                    "conditionSwitch":data.conditionSwitch, //见说明B
                                    "formList":[ //限定条件表单元素数据数组
                                        { //2.2.2.1:规则2-钻石版-附加险-条件1
                                            "minAllowAge":data.minAllowAge, //最小投保年龄
                                            "minAllowAgeUnit":data.minAllowAgeUnit, //最小投保年龄单位
                                            "maxAllowAge":data.maxAllowAge, //最大投保年龄
                                            "maxAllowAgeUnit":data.minAllowAgeUnit, //最大投保年龄单位
                                            "GuaranteePeriod":data.GuaranteePeriod, //保障期限
                                            "BillingMode":data.BillingMode, //缴费方式
                                            "PremiumPaymentPeriod":data.PremiumPaymentPeriod, //缴费年限
                                            "PremiumLimit":data.PremiumLimit, //保额限定,
                                            "isFixed":data.isFixed, //保额类型是否固定,默认固定
                                            "InsuranceAmount":data.InsuranceAmount || '' //保额
                                        },
                                        { //2.2.2.2:规则2-钻石版-附加险-条件2
                                            "minAllowAge":data.minAllowAge, //最小投保年龄
                                            "minAllowAgeUnit":data.minAllowAgeUnit, //最小投保年龄单位
                                            "maxAllowAge":data.maxAllowAge, //最大投保年龄
                                            "maxAllowAgeUnit":data.minAllowAgeUnit, //最大投保年龄单位
                                            "GuaranteePeriod":data.GuaranteePeriod, //保障期限
                                            "BillingMode":data.BillingMode, //缴费方式
                                            "PremiumPaymentPeriod":data.PremiumPaymentPeriod, //缴费年限
                                            "PremiumLimit":data.PremiumLimit, //保额限定,
                                            "isFixed":data.isFixed, //保额类型是否固定,默认固定
                                            "InsuranceAmount":data.InsuranceAmount || '' //保额
                                        }
                                        //条件3----N 条件可能有0-N个
                                    ]
                                }
                            ]
                            
                        },
                        //每个版本对应一个计划和计划别名,每个版本下面有主险或者附加险,因此版本有1-N个
                    ]
                }
                //规则3 ----  规则N
            ]
        }
    }
}