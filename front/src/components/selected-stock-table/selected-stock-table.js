import { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'

import styles from './selected-stock-table.module.css';

export default function SelectedStockTable() {
    const [rowData, setRowData] = useState([]);
    
    useEffect(() => {
        const dummyData = [
            {
                ticker: 'AAPL',
                name: 'Apple',
                price: 100,
                dividend_yield: 1.5,
                dividend_growth_1y: 1.1,
                dividend_growth_5y: 1.2
            },
            {
                ticker: 'MSFT',
                name: 'Microsoft',
                price: 200,
                dividend_yield: 1.5,
                dividend_growth_1y: 1.1,
                dividend_growth_5y: 1.2
            },
            {
                ticker: 'AMZN',
                name: 'Amazon',
                price: 300,
                dividend_yield: 1.5,
                dividend_growth_1y: 1.1,
                dividend_growth_5y: 1.2
            }
        ];
        setRowData(dummyData);
    }, []);

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
