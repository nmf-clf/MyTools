import React from 'react';
import { Table, Input, Button, Popconfirm, Form } from 'antd';

const planTable = () => {
    return [
        {
            title: 'name',
            dataIndex: 'name',
            width: '30%',
            editable: true,
        },
        {
            title: 'age',
            dataIndex: 'age',
        },
        {
            title: 'address',
            dataIndex: 'address',
        },
        
    ];
}

export  default { planTable };
