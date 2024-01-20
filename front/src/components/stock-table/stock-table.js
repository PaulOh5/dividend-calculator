import { useState, useEffect, useCallback } from 'react';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'

import styles from './stock-table.module.css';

export default function StockTable(props) {
    const [rowData, setRowData] = useState();
    const [isLoaded, setIsLoaded] = useState(false);
    const [stocksTable, setStocksTable] = useState(null);

    const handleSelection = (params) => {
        const draggedRow = {...params.node.data, rate: 0};
        props.selectedStocksTable.applyTransaction({update: [draggedRow]});
        stocksTable.applyTransaction({remove: [draggedRow]});
    }

    const handleDeleteSelection = (params) => {
        const {rate, ...draggedRow}= params.node.data;
        props.selectedStocksTable.applyTransaction({remove: [draggedRow]});
        stocksTable.applyTransaction({update: [draggedRow]});
    }

    useEffect(() => {
        if (props.selectedStocksTable && stocksTable) {
            const targetDropZoneParams = props.selectedStocksTable.getRowDropZoneParams({onDragStop: handleSelection});
            const sourceDropZoneParams = stocksTable.getRowDropZoneParams({onDragStop: handleDeleteSelection});
            stocksTable.removeRowDropZone(targetDropZoneParams);
            props.selectedStocksTable.removeRowDropZone(sourceDropZoneParams);
            stocksTable.addRowDropZone(targetDropZoneParams);
            props.selectedStocksTable.addRowDropZone(sourceDropZoneParams);
        }
    }, [props.selectedStocksTable, stocksTable]);

    useEffect(() => {
        return () => {
            if (stocksTable !== null) {
                stocksTable.destroy();
            }
        }
    }, [])

    const onGridReady = useCallback((params) => {
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
            data.stocks.map(stock => {
                for (const [key, value] of Object.entries(stock)) {
                    if (value === null) {
                        stock[key] = 'N/A';
                    }
                    else if (key === 'dividend_yield' || key === 'dividend_growth_1y' || key === 'dividend_growth_5y') {
                        stock[key] = `${Math.round(value * 10000)/100}%`;
                    }
                }
                return stock;
            });
            setRowData(data.stocks);
        });

        setStocksTable(params.api);
    }, []);
    
    const colDefs = [
        { headerName: 'Ticker', field: 'ticker', width: 100, rowDrag: true },
        { headerName: '이름', field: 'name', flex: 1 },
        { headerName: '가격($)', field: 'price', flex: 0.6 },
        { headerName: '배당률', field: 'dividend_yield', flex: 0.6 },
        { headerName: '배당성장률', field: 'dividend_growth_1y', flex: 0.6 },
        { headerName: '연평균 배당성장률(5년)', field: 'dividend_growth_5y', width: 180 }
    ]

    return (
        <div className='ag-theme-quartz' style={{overflow: 'auto', width: '100%', height: '100%'}}>
            <AgGridReact
                getRowId={params => params.data.id}
                rowData={rowData}
                columnDefs={colDefs}
                suppressRowClickSelection={true}
                suppressCellFocus={true}
                onGridReady={onGridReady}
                overlayLoadingTemplate={
                    '<div style="height:100px; width:100px; background: url(https://ag-grid.com/images/ag-grid-loading-spinner.svg) center / contain no-repeat; margin: 0 auto;" aria-label="loading"></div>'
                  }
                rowDragManaged={true}
                suppressMoveWhenRowDragging={true}
            />
        </div>
    )
}
