import { useState, useEffect } from 'react';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'

import styles from './selected-stock-table.module.css';

export default function SelectedStockTable(props) {

    const colDefs = [
        { headerName: 'Ticker', field: 'ticker', width: 100, rowDrag: true },
        { headerName: '이름', field: 'name', flex: 1 },
        { headerName: '배당률', field: 'dividend_yield', flex: 1 },
        { 
            headerName: '적립 비율', 
            field: 'rate', 
            flex: 1, 
            editable: true, 
            cellEditor: 'agNumberCellEditor', 
            cellEditorParams: {
                params: {
                    maxValue: 100,
                    minValue: 0,
                }
            },
            valueFormatter: (params) => {
                return params.value + '%';
            }
        }
    ]

    const onGridReady = (params) => {
        props.setSelectedStocksTable(params.api);
    }

    return (
        <div className='ag-theme-quartz' style={{width: '100%', height: '100%'}}>
            <AgGridReact
                getRowId={params => params.data.id}
                rowData={[]}
                columnDefs={colDefs}
                rowDragManaged={true}
                suppressMoveWhenRowDragging={true}
                onGridReady={onGridReady}
            />
        </div>
    )
}
