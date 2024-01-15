import { useState, useEffect, useCallback } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'

import styles from './stock-table.module.css';

export default function StockTable() {
    const [rowData, setRowData] = useState();
    const [isLoaded, setIsLoaded] = useState(false);

    const onGridReady = useCallback(() => {
        setIsLoaded(true);
        const url = 'http://127.0.0.1:8000/stocks';
        fetch(url, {
            mode: 'cors',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            setRowData(data.stocks);
        });
    }, []);
    
    const colDefs = [
        { headerName: 'Ticker', field: 'ticker', flex: 0.4, checkboxSelection: true, headerCheckboxSelection: true},
        { headerName: '이름', field: 'name', flex: 1 },
        { headerName: '현재가', field: 'price', flex: 0.6 },
        { headerName: '배당률', field: 'dividend_yield', flex: 0.6 },
        { headerName: '배당성장률', field: 'dividend_growth_1y', flex: 0.6 },
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
                onGridReady={onGridReady}
                overlayLoadingTemplate={
                    '<div style="height:100px; width:100px; background: url(https://ag-grid.com/images/ag-grid-loading-spinner.svg) center / contain no-repeat; margin: 0 auto;" aria-label="loading"></div>'
                  }
            />
        </div>
    )
}
