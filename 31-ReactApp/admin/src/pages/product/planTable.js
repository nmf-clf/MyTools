import React,{ Component } from 'react';
import TableColumns from './tableColumns';
import RenderTable from './renderTable';

class PlanTable extends Component{
    constructor(props){
        super(props);
        this.state = {}
    }
    getData() {
        const data2 = this.renderTable.getData();
        return data2;
    }
    render(){
        let columns = TableColumns.planTable(); 
        console.log('columns::',columns)
        return(
            <RenderTable 
                ref={(ref => this.renderTable = ref)}
                columns={columns}
            />
        )
    }
}

export default PlanTable;