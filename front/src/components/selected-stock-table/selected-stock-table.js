import { useState, useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'

import { SelectedStocksState } from '../../states/states';

import styles from './selected-stock-table.module.css';

export default function SelectedStockTable(props) {
    const [rowData, setRowData] = useState([]);
    const selectedStocks = useRecoilValue(SelectedStocksState);

    useEffect(() => {
        setRowData(selectedStocks);
    }, [selectedStocks]);

    const colDefs = [
        { headerName: 'Ticker', field: 'ticker', width: 100, rowDrag: true },
        { headerName: '이름', field: 'name', flex: 1 },
        { headerName: '배당률', field: 'dividend_yield', flex: 1 },
        { headerName: '적립 비율', field: 'rate', flex: 1, editable: true },
    ]

    const onSelectionChanged = (event) => {
        const selectedRows = event.api.getSelectedRows();
        console.log(selectedRows);
    }

    const onGridReady = (params) => {
        props.setSelectedStocksTable(params.api);
    }

    return (
        <div className='ag-theme-quartz' style={{width: '100%', height: '100%'}}>
            <AgGridReact
                rowData={rowData}
                columnDefs={colDefs}
                rowSelection={'multiple'}
                rowMultiSelectWithClick={true}
                onSelectionChanged={onSelectionChanged}
                rowDragManaged={true}
                suppressMoveWhenRowDragging={true}
                onGridReady={onGridReady}
            />
        </div>
    )
}
