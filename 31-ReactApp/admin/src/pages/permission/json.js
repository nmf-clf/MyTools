export const requestJson = (data)=> {
    return{
        //解释说明::
        //A:所添加的每个规则的产品都是上个页面接口带出来的，所以产品(数量,名称)都是一致的,
        //B:限定条件开关,每个规则的不一定相同,判断限定条件模块是否显示
        //C:保额限定开关,判断保额模块是否显示
        "data":{
            "onsaleId": 'testId' || data.onsaleId, //在售Id
            "requestPackageRuleVoList":[ //规则数据数组
                { //1:规则1数据对象
                    "saleArea": "220000",//规则1适用机构名称
                    "packageName": '组合嘿嘿嘿' || '',
                    "productList":[ //规则1下的产品数据数组,每个规则的产品数据数组都是一致的
                        { //1.1:规则1-基础版
                            "planAbbreviation": "基础版" || data.banben, //上一个接口给的数据判断是基础版or钻石版,且再次入参用于页面展示
                            "categoryList":[ //险种分类(主险/附加险)
                                { //1.1.1:规则1-基础版-主险
                                    "category": "主险" || data.category, //主险
                                    "productCode": "rule1-jichu-zhu-code" || data.productCode, //基础版的产品代码,说明A
                                    "productName": "规则1-基础-主险名称" || data.productName, //基础版的产品名称,说明A
                                    //"conditionSwitch": true //见说明B
                                    // "formList":[ //限定条件表单元素数据数组
                                    //     { //1.1.1.1:规则1-基础版-主险-条件1
                                    //         "minAllowAge": 11 || data.minAllowAge, //最小投保年龄
                                    //         "minAllowAgeUnit": "D" || data.minAllowAgeUnit, //最小投保年龄单位
                                    //         "maxAllowAge": 22 || data.maxAllowAge, //最大投保年龄
                                    //         "maxAllowAgeUnit": "D" || data.minAllowAgeUnit, //最大投保年龄单位
                                    //         "GuaranteePeriod": "1" || data.GuaranteePeriod, //保障期限
                                    //         "BillingMode": "1" || data.BillingMode, //缴费方式
                                    //         "PremiumPaymentPeriod": "1" || data.PremiumPaymentPeriod, //缴费年限
                                    //         "PremiumLimitSwitch": false, //保额限定,
                                    //         "isFixed": "1", //保额类型是否固定,默认固定
                                    //         "InsuranceAmount": 1122 || data.InsuranceAmount || '' //保额
                                    //     },
                                    //     { //1.1.1.2:规则1-基础版-主险-条件2
                                    //         "minAllowAge": 33 || data.minAllowAge, //最小投保年龄
                                    //         "minAllowAgeUnit": "A" || data.minAllowAgeUnit, //最小投保年龄单位
                                    //         "maxAllowAge": 44 || data.maxAllowAge, //最大投保年龄
                                    //         "maxAllowAgeUnit": "A" || data.minAllowAgeUnit, //最大投保年龄单位
                                    //         "GuaranteePeriod": "2" || data.GuaranteePeriod, //保障期限
                                    //         "BillingMode": "2" || data.BillingMode, //缴费方式
                                    //         "PremiumPaymentPeriod": "2" || data.PremiumPaymentPeriod, //缴费年限
                                    //         "PremiumLimitSwitch": false, //保额限定,
                                    //         "isFixed": "1", //保额类型是否固定,默认固定
                                    //         "InsuranceAmount": 3344 || data.InsuranceAmount || '' //保额
                                    //     }
                                    //     //条件3----N 条件可能有0-N个
                                    //
                                },
                                {   //1.1.2:规则1-基础版-附加险
                                    "category": "附加险" || data.category, //附加险
                                    "productCode": "rule1-jichu-fujia-code" || data.productCode, //基础版的产品代码,说明A
                                    "productName": "规则1-基础-附加险名称" || data.productName, //基础版的产品名称,说明A
                                    //"conditionSwitch":false//, //见说明B
                                    // "formList":[ //限定条件表单元素数据数组
                                    //     { //1.1.2.1:规则1-基础版-附加险-条件1
                                    //         "minAllowAge": 55 || data.minAllowAge, //最小投保年龄
                                    //         "minAllowAgeUnit": "D" || data.minAllowAgeUnit, //最小投保年龄单位
                                    //         "maxAllowAge": 66 || data.maxAllowAge, //最大投保年龄
                                    //         "maxAllowAgeUnit": "A" || data.minAllowAgeUnit, //最大投保年龄单位
                                    //         "GuaranteePeriod": "1" || data.GuaranteePeriod, //保障期限
                                    //         "BillingMode": "1" || data.BillingMode, //缴费方式
                                    //         "PremiumPaymentPeriod":1 || data.PremiumPaymentPeriod, //缴费年限
                                    //         "PremiumLimitSwitch": false, //保额限定,
                                    //         "isFixed": "1" || data.isFixed, //保额类型是否固定,默认固定
                                    //         "InsuranceAmount": 5566 || data.InsuranceAmount || '' //保额
                                    //     },
                                    //     { //1.1.2.2:规则1-基础版-附加险-条件2
                                    //         "minAllowAge": 77 || data.minAllowAge, //最小投保年龄
                                    //         "minAllowAgeUnit": "D" || data.minAllowAgeUnit, //最小投保年龄单位
                                    //         "maxAllowAge": 88 || data.maxAllowAge, //最大投保年龄
                                    //         "maxAllowAgeUnit": "A" || data.minAllowAgeUnit, //最大投保年龄单位
                                    //         "GuaranteePeriod": "2" || data.GuaranteePeriod, //保障期限
                                    //         "BillingMode": "2" || data.BillingMode, //缴费方式
                                    //         "PremiumPaymentPeriod": "2" || data.PremiumPaymentPeriod, //缴费年限
                                    //         "PremiumLimitSwitch": false, //保额限定,
                                    //         "isFixed": "1" || data.isFixed, //保额类型是否固定,默认固定
                                    //         "InsuranceAmount": 7788 || data.InsuranceAmount || '' //保额
                                    //     }
                                    //     //条件3----N 条件可能有0-N个
                                    // ]
                                }
                            ]
                            
                        },
                        { //1.2:规则1-钻石版
                            "planAbbreviation": "钻石版" || data.banben, //上一个接口给的数据判断是基础版or钻石版,且再次入参用于页面展示
                            "categoryList":[ //险种分类(主险/附加险)
                                {   //1.2.1:规则1-钻石版-主险
                                    "category": "主险" || data.category, //主险
                                    "productCode": "rule1-zuanshi-zhu-code" || data.productCode, //基础版的产品代码,说明A
                                    "productName": "规则1-钻石-主险名" || data.productName, //基础版的产品名称,说明A
                                    //"conditionSwitch": false//, //见说明B
                                    // "formList":[ //限定条件表单元素数据数组
                                    //     { //1.2.1.1规则1-钻石版-主险-条件1
                                    //         "minAllowAge": 1 || data.minAllowAge, //最小投保年龄
                                    //         "minAllowAgeUnit": "D" || data.minAllowAgeUnit, //最小投保年龄单位
                                    //         "maxAllowAge": 2 || data.maxAllowAge, //最大投保年龄
                                    //         "maxAllowAgeUnit": "D" || data.minAllowAgeUnit, //最大投保年龄单位
                                    //         "GuaranteePeriod": "1" || data.GuaranteePeriod, //保障期限
                                    //         "BillingMode": "1" || data.BillingMode, //缴费方式
                                    //         "PremiumPaymentPeriod": "1" || data.PremiumPaymentPeriod, //缴费年限
                                    //         "PremiumLimitSwitch": false, //保额限定,
                                    //         "isFixed": "1" || data.isFixed, //保额类型是否固定,默认固定
                                    //         "InsuranceAmount": 12 ||data.InsuranceAmount || '' //保额
                                    //     },
                                    //     { //1.2.1.2:规则1-钻石版-主险-条件2
                                    //         "minAllowAge": 3 || data.minAllowAge, //最小投保年龄
                                    //         "minAllowAgeUnit": "D" || data.minAllowAgeUnit, //最小投保年龄单位
                                    //         "maxAllowAge": 4 || data.maxAllowAge, //最大投保年龄
                                    //         "maxAllowAgeUnit": "D" || data.minAllowAgeUnit, //最大投保年龄单位
                                    //         "GuaranteePeriod": "2" || data.GuaranteePeriod, //保障期限
                                    //         "BillingMode": "2" || data.BillingMode, //缴费方式
                                    //         "PremiumPaymentPeriod": "2" || data.PremiumPaymentPeriod, //缴费年限
                                    //         "PremiumLimitSwitch": false, //保额限定,
                                    //         "isFixed": "1" || data.isFixed, //保额类型是否固定,默认固定
                                    //         "InsuranceAmount": 34 ||data.InsuranceAmount || '' //保额
                                    //     }
                                    //     //条件3----N 条件可能有0-N个
                                    // ]
                                },
                                {   //1.2.2:规则1-钻石版-附加险
                                    "category": "附加险" || data.category, //附加险
                                    "productCode": "rule1-zuanshi-fujia-code" || data.productCode, //基础版的产品代码,说明A
                                    "productName": "规则1-钻石-附加险名" || data.productName, //基础版的产品名称,说明A
                                    //"conditionSwitch": false //, //见说明B
                                    // "formList":[ //限定条件表单元素数据数组
                                    //     { //1.2.2.1:规则1-钻石版-附加险-条件1
                                    //         "minAllowAge": 5 || data.minAllowAge, //最小投保年龄
                                    //         "minAllowAgeUnit": "D" || data.minAllowAgeUnit, //最小投保年龄单位
                                    //         "maxAllowAge": 6 || data.maxAllowAge, //最大投保年龄
                                    //         "maxAllowAgeUnit": "D" || data.minAllowAgeUnit, //最大投保年龄单位
                                    //         "GuaranteePeriod": "1" || data.GuaranteePeriod, //保障期限
                                    //         "BillingMode": "1" || data.BillingMode, //缴费方式
                                    //         "PremiumPaymentPeriod": "1" || data.PremiumPaymentPeriod, //缴费年限
                                    //         "PremiumLimitSwitch": false, //保额限定,
                                    //         "isFixed": "1" || data.isFixed, //保额类型是否固定,默认固定
                                    //         "InsuranceAmount": 56 ||data.InsuranceAmount || '' //保额
                                    //     },
                                    //     { //1.2.2.2:规则1-钻石版-附加险-条件2
                                    //         "minAllowAge": 7 || data.minAllowAge, //最小投保年龄
                                    //         "minAllowAgeUnit": "D" || data.minAllowAgeUnit, //最小投保年龄单位
                                    //         "maxAllowAge": 8 || data.maxAllowAge, //最大投保年龄
                                    //         "maxAllowAgeUnit": "D" || data.minAllowAgeUnit, //最大投保年龄单位
                                    //         "GuaranteePeriod": "1" || data.GuaranteePeriod, //保障期限
                                    //         "BillingMode": "1" || data.BillingMode, //缴费方式
                                    //         "PremiumPaymentPeriod": "1" || data.PremiumPaymentPeriod, //缴费年限
                                    //         "PremiumLimitSwitch": false, //保额限定,
                                    //         "isFixed": "1" || data.isFixed, //保额类型是否固定,默认固定
                                    //         "InsuranceAmount": 78 ||data.InsuranceAmount || '' //保额
                                    //     }
                                    //     //条件3----N 条件可能有0-N个
                                    // ]
                                }
                            ]
                            
                        },
                        //每个版本对应一个计划和计划别名,每个版本下面有主险或者附加险,因此版本有1-N个
                    ]
                }
                // { //1:规则2数据对象
                //     "saleArea": "210000",//规则2适用机构名称
                //     "packageName": '组合嘿嘿嘿' || '',
                //     "productList":[ //规则2下的产品数据数组,每个规则的产品数据数组都是一致的
                //         { //1.1:规则2-基础版
                //             "planAbbreviation": "基础版" || data.banben, //上一个接口给的数据判断是基础版or钻石版,且再次入参用于页面展示
                //             "categoryList":[ //险种分类(主险/附加险)
                //                 { //1.1.1:规则2-基础版-主险
                //                     "category": "主险" || data.category, //主险
                //                     "productCode": "rule2-jichu-zhu-code" || data.productCode, //基础版的产品代码,说明A
                //                     "productName": "规则2-基础-主险名称" || data.productName, //基础版的产品名称,说明A
                //                     "conditionSwitch": false, //见说明B
                //                     "formList":[ //限定条件表单元素数据数组
                //                         { //1.1.1.1:规则2-基础版-主险-条件1
                //                             "minAllowAge": 11 || data.minAllowAge, //最小投保年龄
                //                             "minAllowAgeUnit": "D" || data.minAllowAgeUnit, //最小投保年龄单位
                //                             "maxAllowAge": 22 || data.maxAllowAge, //最大投保年龄
                //                             "maxAllowAgeUnit": "D" || data.minAllowAgeUnit, //最大投保年龄单位
                //                             "GuaranteePeriod": "1" || data.GuaranteePeriod, //保障期限
                //                             "BillingMode": "1" || data.BillingMode, //缴费方式
                //                             "PremiumPaymentPeriod": "1" || data.PremiumPaymentPeriod, //缴费年限
                //                             "PremiumLimitSwitch": false, //保额限定,
                //                             "isFixed": "1", //保额类型是否固定,默认固定
                //                             "InsuranceAmount": 1122 || data.InsuranceAmount || '' //保额
                //                         },
                //                         { //1.1.1.2:规则2-基础版-主险-条件2
                //                             "minAllowAge": 33 || data.minAllowAge, //最小投保年龄
                //                             "minAllowAgeUnit": "A" || data.minAllowAgeUnit, //最小投保年龄单位
                //                             "maxAllowAge": 44 || data.maxAllowAge, //最大投保年龄
                //                             "maxAllowAgeUnit": "A" || data.minAllowAgeUnit, //最大投保年龄单位
                //                             "GuaranteePeriod": "2" || data.GuaranteePeriod, //保障期限
                //                             "BillingMode": "2" || data.BillingMode, //缴费方式
                //                             "PremiumPaymentPeriod": "2" || data.PremiumPaymentPeriod, //缴费年限
                //                             "PremiumLimitSwitch": false, //保额限定,
                //                             "isFixed":1 || data.isFixed, //保额类型是否固定,默认固定
                //                             "InsuranceAmount": 3344 || data.InsuranceAmount || '' //保额
                //                         }
                //                         //条件3----N 条件可能有0-N个
                //                     ]
                //                 },
                //                 {   //1.1.2:规则2-基础版-附加险
                //                     "category": "附加险" || data.category, //附加险
                //                     "productCode": "rule2-jichu-fujia-code" || data.productCode, //基础版的产品代码,说明A
                //                     "productName": "规则2-基础-附加险名称" || data.productName, //基础版的产品名称,说明A
                //                     "conditionSwitch":false, //见说明B
                //                     "formList":[ //限定条件表单元素数据数组
                //                         { //1.1.2.1:规则2-基础版-附加险-条件1
                //                             "minAllowAge": 55 || data.minAllowAge, //最小投保年龄
                //                             "minAllowAgeUnit": "D" || data.minAllowAgeUnit, //最小投保年龄单位
                //                             "maxAllowAge": 66 || data.maxAllowAge, //最大投保年龄
                //                             "maxAllowAgeUnit": "A" || data.minAllowAgeUnit, //最大投保年龄单位
                //                             "GuaranteePeriod": "1" || data.GuaranteePeriod, //保障期限
                //                             "BillingMode": "1" || data.BillingMode, //缴费方式
                //                             "PremiumPaymentPeriod":1 || data.PremiumPaymentPeriod, //缴费年限
                //                             "PremiumLimitSwitch": false, //保额限定,
                //                             "isFixed": "1" || data.isFixed, //保额类型是否固定,默认固定
                //                             "InsuranceAmount": 5566 || data.InsuranceAmount || '' //保额
                //                         },
                //                         { //1.1.2.2:规则2-基础版-附加险-条件2
                //                             "minAllowAge": 77 || data.minAllowAge, //最小投保年龄
                //                             "minAllowAgeUnit": "D" || data.minAllowAgeUnit, //最小投保年龄单位
                //                             "maxAllowAge": 88 || data.maxAllowAge, //最大投保年龄
                //                             "maxAllowAgeUnit": "A" || data.minAllowAgeUnit, //最大投保年龄单位
                //                             "GuaranteePeriod": "2" || data.GuaranteePeriod, //保障期限
                //                             "BillingMode": "2" || data.BillingMode, //缴费方式
                //                             "PremiumPaymentPeriod": "2" || data.PremiumPaymentPeriod, //缴费年限
                //                             "PremiumLimitSwitch": false, //保额限定,
                //                             "isFixed": "1" || data.isFixed, //保额类型是否固定,默认固定
                //                             "InsuranceAmount": 7788 || data.InsuranceAmount || '' //保额
                //                         }
                //                         //条件3----N 条件可能有0-N个
                //                     ]
                //                 }
                //             ]
                            
                //         },
                //         { //1.2:规则2-钻石版
                //             "planAbbreviation": "钻石版" || data.banben, //上一个接口给的数据判断是基础版or钻石版,且再次入参用于页面展示
                //             "categoryList":[ //险种分类(主险/附加险)
                //                 {   //1.2.1:规则2-钻石版-主险
                //                     "category": "主险" || data.category, //主险
                //                     "productCode": "rule2-zuanshi-zhu-code" || data.productCode, //基础版的产品代码,说明A
                //                     "productName": "规则2-钻石-主险名" || data.productName, //基础版的产品名称,说明A
                //                     "conditionSwitch": false, //见说明B
                //                     "formList":[ //限定条件表单元素数据数组
                //                         { //1.2.1.1规则2-钻石版-主险-条件1
                //                             "minAllowAge": 1 || data.minAllowAge, //最小投保年龄
                //                             "minAllowAgeUnit": "D" || data.minAllowAgeUnit, //最小投保年龄单位
                //                             "maxAllowAge": 2 || data.maxAllowAge, //最大投保年龄
                //                             "maxAllowAgeUnit": "D" || data.minAllowAgeUnit, //最大投保年龄单位
                //                             "GuaranteePeriod": "1" || data.GuaranteePeriod, //保障期限
                //                             "BillingMode": "1" || data.BillingMode, //缴费方式
                //                             "PremiumPaymentPeriod": "1" || data.PremiumPaymentPeriod, //缴费年限
                //                             "PremiumLimitSwitch": false, //保额限定,
                //                             "isFixed": "1" || data.isFixed, //保额类型是否固定,默认固定
                //                             "InsuranceAmount": 12 ||data.InsuranceAmount || '' //保额
                //                         },
                //                         { //1.2.1.2:规则2-钻石版-主险-条件2
                //                             "minAllowAge": 3 || data.minAllowAge, //最小投保年龄
                //                             "minAllowAgeUnit": "D" || data.minAllowAgeUnit, //最小投保年龄单位
                //                             "maxAllowAge": 4 || data.maxAllowAge, //最大投保年龄
                //                             "maxAllowAgeUnit": "D" || data.minAllowAgeUnit, //最大投保年龄单位
                //                             "GuaranteePeriod": "2" || data.GuaranteePeriod, //保障期限
                //                             "BillingMode": "2" || data.BillingMode, //缴费方式
                //                             "PremiumPaymentPeriod": "2" || data.PremiumPaymentPeriod, //缴费年限
                //                             "PremiumLimitSwitch": false, //保额限定,
                //                             "isFixed": "1" || data.isFixed, //保额类型是否固定,默认固定
                //                             "InsuranceAmount": 34 ||data.InsuranceAmount || '' //保额
                //                         }
                //                         //条件3----N 条件可能有0-N个
                //                     ]
                //                 },
                //                 {   //1.2.2:规则2-钻石版-附加险
                //                     "category": "附加险" || data.category, //附加险
                //                     "productCode": "rule2-zuanshi-fujia-code" || data.productCode, //基础版的产品代码,说明A
                //                     "productName": "规则2-钻石-附加险名" || data.productName, //基础版的产品名称,说明A
                //                     "conditionSwitch": false , //见说明B
                //                     "formList":[ //限定条件表单元素数据数组
                //                         { //1.2.2.1:规则2-钻石版-附加险-条件1
                //                             "minAllowAge": 5 || data.minAllowAge, //最小投保年龄
                //                             "minAllowAgeUnit": "D" || data.minAllowAgeUnit, //最小投保年龄单位
                //                             "maxAllowAge": 6 || data.maxAllowAge, //最大投保年龄
                //                             "maxAllowAgeUnit": "D" || data.minAllowAgeUnit, //最大投保年龄单位
                //                             "GuaranteePeriod": "1" || data.GuaranteePeriod, //保障期限
                //                             "BillingMode": "1" || data.BillingMode, //缴费方式
                //                             "PremiumPaymentPeriod": "1" || data.PremiumPaymentPeriod, //缴费年限
                //                             "PremiumLimitSwitch": false, //保额限定,
                //                             "isFixed": "1" || data.isFixed, //保额类型是否固定,默认固定
                //                             "InsuranceAmount": 56 ||data.InsuranceAmount || '' //保额
                //                         },
                //                         { //1.2.2.2:规则2-钻石版-附加险-条件2
                //                             "minAllowAge": 7 || data.minAllowAge, //最小投保年龄
                //                             "minAllowAgeUnit": "D" || data.minAllowAgeUnit, //最小投保年龄单位
                //                             "maxAllowAge": 8 || data.maxAllowAge, //最大投保年龄
                //                             "maxAllowAgeUnit": "D" || data.minAllowAgeUnit, //最大投保年龄单位
                //                             "GuaranteePeriod": "1" || data.GuaranteePeriod, //保障期限
                //                             "BillingMode": "1" || data.BillingMode, //缴费方式
                //                             "PremiumPaymentPeriod": "1" || data.PremiumPaymentPeriod, //缴费年限
                //                             "PremiumLimitSwitch": false, //保额限定,
                //                             "isFixed": "1" || data.isFixed, //保额类型是否固定,默认固定
                //                             "InsuranceAmount": 78 ||data.InsuranceAmount || '' //保额
                //                         }
                //                         //条件3----N 条件可能有0-N个
                //                     ]
                //                 }
                //             ]
                            
                //         },
                //         //每个版本对应一个计划和计划别名,每个版本下面有主险或者附加险,因此版本有1-N个
                //     ]
                // }
            ]
        }
    }
}


// xs  -- extra samll    最小屏    

// sm -- small            小屏

// md -- middle         中屏

// lg   -- large            大屏