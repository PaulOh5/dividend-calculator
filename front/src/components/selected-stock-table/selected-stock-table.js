import { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'

import { SelectedStocksState } from '../../states/states';

import styles from './selected-stock-table.module.css';

export default function SelectedStockTable() {
    const [rowData, setRowData] = useState([]);
    const selectedStocks = useRecoilValue(SelectedStocksState);

    useEffect(() => {
        setRowData(selectedStocks);
    }, [selectedStocks]);

    const colDefs = [
        { headerName: 'Ticker', field: 'ticker', flex: 0.4 },
        { headerName: '이름', field: 'name', flex: 1 },
        { headerName: '현재가', field: 'price', flex: 0.7 },
        { headerName: '배당률', field: 'dividend_yield', flex: 0.7 },
        { headerName: '배당성장률', field: 'dividend_growth_1y', flex: 0.7 },
        { headerName: '연평균 배당성장률(5년)', field: 'dividend_growth_5y', flex: 0.7 }
    ]

    const onSelectionChanged = (event) => {
        const selectedRows = event.api.getSelectedRows();
        console.log(selectedRows);
    }

    return (
        <div className='ag-theme-quartz' style={{width: '100%', height: '100%'}}>
            <AgGridReact
                rowData={rowData}
                columnDefs={colDefs}
                rowSelection={'multiple'}
                rowMultiSelectWithClick={true}
                onSelectionChanged={onSelectionChanged}
            />
        </div>
    )
}
