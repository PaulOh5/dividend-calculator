import { useState, useEffect, useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { SelectedStocks } from '../../states';
import { percentFormatter } from '../../utils/formatter';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'

import styles from './selected-stock-table.module.css';

export default function SelectedStockTable(props) {
    const [rowData, setRowData] = useState([]);
    const [selectedStocks, setSelectedStocks] = useRecoilState(SelectedStocks);

    const colDefs = [
        { headerName: 'Ticker', field: 'ticker', width: 100, rowDrag: true },
        { headerName: '이름', field: 'name', flex: 1 },
        { headerName: '배당률', field: 'dividend_yield', flex: 1, valueFormatter: percentFormatter },
        { 
            headerName: '적립 비율', 
            field: 'rate', 
            flex: 1, 
            editable: true, 
            cellEditor: 'agNumberCellEditor', 
            cellEditorParams: {
                max: 100,
                min: 0,
            },
            valueSetter: (params) => {
                if (params.newValue === null) {
                    params.data.rate = params.oldValue;
                    return false;
                }
                params.data.rate = params.newValue / 100;
                return true;
            },
            valueFormatter: percentFormatter
        }
    ]

    const onGridReady = useCallback((params) => {
        props.setSelectedStocksTable(params.api);
        setRowData([...selectedStocks]);
    }, []);

    const handleCellValueChanged = (params) => {
        const newData = selectedStocks.map(stock => {
            if (stock.id === params.data.id) {
                return {...stock, rate: params.data.rate};
            } else {
                return stock;
            }
        });
        setSelectedStocks(newData);
    }

    useEffect(() => {
        console.log(selectedStocks);
    }, [selectedStocks]);

    return (
        <div className='ag-theme-quartz' style={{width: '100%', height: '100%'}}>
            <AgGridReact
                getRowId={params => params.data.id}
                rowData={rowData}
                columnDefs={colDefs}
                rowDragManaged={true}
                suppressMoveWhenRowDragging={true}
                onGridReady={onGridReady}
                onCellValueChanged={handleCellValueChanged}
            />
        </div>
    )
}
